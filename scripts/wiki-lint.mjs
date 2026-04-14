#!/usr/bin/env node
/**
 * wiki-lint.mjs
 *
 * wiki/ の健全性チェック:
 *   - WL-4 孤立ページ検出 → wiki/health/orphan-report.md
 *   - wiki 内ページ自体の freshness → wiki/health/freshness-report.md の checked 日更新
 *
 * 既存レポートの手書きセクションを保護するため、マーカー
 *   <!-- auto:start --> ... <!-- auto:end -->
 * で囲まれた範囲のみ書き換える。マーカーがない場合はファイル末尾に追記する。
 *
 * Usage: node scripts/wiki-lint.mjs [--quiet]
 * Exit 0: 常に 0 (hook がセッションを止めないように)
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, basename, relative, dirname, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname.replace(/\/$/, ""));
const WIKI = join(ROOT, "wiki");
const HEALTH = join(WIKI, "health");
const ORPHAN_REPORT = join(HEALTH, "orphan-report.md");
const FRESHNESS_REPORT = join(HEALTH, "freshness-report.md");

const QUIET = process.argv.includes("--quiet");
const log = (...args) => { if (!QUIET) console.error(...args); };

// ---- helpers ----

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseFrontMatter(text) {
  if (!text.startsWith("---\n")) return { front: {}, body: text, raw: "" };
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) return { front: {}, body: text, raw: "" };
  const raw = text.slice(4, end);
  const body = text.slice(end + 5);
  const front = {};
  for (const line of raw.split("\n")) {
    const m = /^([a-zA-Z_][\w-]*):\s*(.*)$/.exec(line);
    if (m) front[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return { front, body, raw };
}

function parseAliases(frontRaw) {
  // aliases: ["a", "b", ...]  — minimal parser
  const m = /^aliases:\s*\[(.*)\]\s*$/m.exec(frontRaw);
  if (!m) return [];
  return m[1]
    .split(",")
    .map((s) => s.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

// [[target]] / [[target|alias]] / [[target#section]] / [[path/target]]
const WIKILINK_RE = /\[\[([^\]]+)\]\]/g;

function extractLinks(text) {
  const links = [];
  let m;
  while ((m = WIKILINK_RE.exec(text)) !== null) {
    let raw = m[1];
    // handle escaped pipe \|  and regular |
    const escPipe = raw.indexOf("\\|");
    const pipe = raw.indexOf("|");
    const cut = escPipe >= 0 && (pipe < 0 || escPipe < pipe) ? escPipe : pipe;
    if (cut >= 0) raw = raw.slice(0, cut);
    // strip section
    const hash = raw.indexOf("#");
    if (hash >= 0) raw = raw.slice(0, hash);
    // strip path (use basename as canonical key)
    const slash = raw.lastIndexOf("/");
    const target = slash >= 0 ? raw.slice(slash + 1) : raw;
    links.push(target.trim());
  }
  return links;
}

function replaceAutoBlock(text, block, beforeIfMissing = "\n## 判定") {
  const startTag = "<!-- auto:start -->";
  const endTag = "<!-- auto:end -->";
  const si = text.indexOf(startTag);
  const ei = text.indexOf(endTag);
  if (si >= 0 && ei > si) {
    return text.slice(0, si + startTag.length) + "\n" + block + "\n" + text.slice(ei);
  }
  // Insert before beforeIfMissing marker, else append
  const idx = text.indexOf(beforeIfMissing);
  const auto = `${startTag}\n${block}\n${endTag}\n`;
  if (idx >= 0) {
    return text.slice(0, idx) + auto + "\n" + text.slice(idx);
  }
  return text.replace(/\s*$/, "\n\n") + auto;
}

function updateCheckedDate(text, newDate) {
  return text.replace(/^(checked:\s*)["']?[\d-]+["']?/m, `$1"${newDate}"`);
}

// ---- main ----

function main() {
  if (!existsSync(WIKI)) {
    log("wiki/ not found, skip");
    return 0;
  }

  // allFiles: pages subject to orphan check (exclude health/)
  // linkTargets: all pages that can be linked to (include health/)
  const linkTargets = walk(WIKI);
  const allFiles = linkTargets.filter((f) => !f.includes("/health/"));

  // Resolve key: stem -> canonical stem (via aliases)
  // byStem maps any usable link key to the canonical file stem.
  const byStem = new Map();
  const canonicalStems = new Set();
  for (const f of linkTargets) {
    const stem = basename(f, ".md");
    canonicalStems.add(stem);
    if (!byStem.has(stem)) byStem.set(stem, stem);
    const text = readFileSync(f, "utf8");
    const { raw } = parseFrontMatter(text);
    for (const alias of parseAliases(raw)) {
      if (!byStem.has(alias)) byStem.set(alias, stem);
    }
    // also title field as alias
    const { front } = parseFrontMatter(text);
    if (front.title && !byStem.has(front.title)) byStem.set(front.title, stem);
  }

  // Build backlink map: canonical stem -> Set of referring canonical stems
  const backrefs = new Map();
  for (const stem of canonicalStems) backrefs.set(stem, new Set());

  let totalLinks = 0;
  let broken = 0;

  const brokenSamples = [];
  for (const f of allFiles) {
    const text = readFileSync(f, "utf8");
    const { body } = parseFrontMatter(text);
    const srcStem = basename(f, ".md");
    const links = extractLinks(body);
    for (const target of links) {
      totalLinks++;
      const canonical = byStem.get(target);
      if (canonical) {
        if (canonical !== srcStem) backrefs.get(canonical).add(srcStem);
      } else {
        broken++;
        if (brokenSamples.length < 20) brokenSamples.push({ from: srcStem, target });
      }
    }
  }

  // Orphans: pages with 0 backrefs, excluding meta pages
  const EXCLUDE = new Set(["index", "about", "about-project-design", "log", "wikilink"]);
  const orphans = [];
  for (const [stem, refs] of backrefs) {
    if (EXCLUDE.has(stem)) continue;
    if (refs.size === 0) orphans.push(stem);
  }
  orphans.sort();

  // Directory breakdown
  const dirCounts = new Map();
  const dirOrphans = new Map();
  for (const f of allFiles) {
    const rel = relative(WIKI, f);
    const slash = rel.indexOf("/");
    const dir = slash >= 0 ? rel.slice(0, slash) : "(root)";
    dirCounts.set(dir, (dirCounts.get(dir) || 0) + 1);
    const stem = basename(f, ".md");
    if (orphans.includes(stem)) {
      dirOrphans.set(dir, (dirOrphans.get(dir) || 0) + 1);
    }
  }

  // Top hubs
  const hubs = [...backrefs.entries()]
    .map(([stem, refs]) => ({ stem, count: refs.size }))
    .filter((h) => !EXCLUDE.has(h.stem))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // ---- render orphan auto block ----
  const date = today();
  const lines = [];
  lines.push(`_auto-generated by scripts/wiki-lint.mjs at ${date}_`);
  lines.push("");
  lines.push("## サマリ");
  lines.push("");
  lines.push("| 指標 | 値 |");
  lines.push("|---|---|");
  lines.push(`| 総ページ数 | ${allFiles.length} |`);
  lines.push(`| 総 wikilink 数 | ${totalLinks} |`);
  lines.push(`| Orphan（除外: ${[...EXCLUDE].join(", ")}） | **${orphans.length}** |`);
  lines.push(`| Broken wikilink | ${broken} |`);
  lines.push("");
  lines.push("## ディレクトリ別");
  lines.push("");
  lines.push("| ディレクトリ | ページ数 | Orphan |");
  lines.push("|---|---|---|");
  for (const [dir, count] of [...dirCounts.entries()].sort()) {
    lines.push(`| ${dir} | ${count} | ${dirOrphans.get(dir) || 0} |`);
  }
  lines.push("");
  lines.push("## Top 10 hubs（被リンク数）");
  lines.push("");
  lines.push("| ページ | 被リンク数 |");
  lines.push("|---|---|");
  for (const h of hubs) lines.push(`| ${h.stem} | ${h.count} |`);
  lines.push("");
  if (orphans.length > 0) {
    lines.push("## Orphan 一覧");
    lines.push("");
    for (const o of orphans) lines.push(`- ${o}`);
    lines.push("");
  }
  if (brokenSamples.length > 0) {
    lines.push("## Broken wikilink サンプル (最大 20 件)");
    lines.push("");
    for (const b of brokenSamples) lines.push(`- \`${b.target}\` ← ${b.from}`);
    lines.push("");
  }
  const autoBlock = lines.join("\n");

  // ---- update orphan-report.md ----
  if (existsSync(ORPHAN_REPORT)) {
    let text = readFileSync(ORPHAN_REPORT, "utf8");
    text = updateCheckedDate(text, date);
    // WARN only if true orphans exist; broken wikilinks are reported but not fail-level
    // (wikilink.md contains 文法説明用例 which are intentionally broken).
    const status = orphans.length > 0 ? "WARN" : "PASS";
    text = text.replace(/^(status:\s*).*$/m, `$1${status}`);
    text = replaceAutoBlock(text, autoBlock);
    writeFileSync(ORPHAN_REPORT, text);
    log(`orphan-report updated: ${orphans.length} orphans, ${broken} broken, ${totalLinks} links`);
  }

  // ---- freshness-report: update checked date only ----
  if (existsSync(FRESHNESS_REPORT)) {
    let text = readFileSync(FRESHNESS_REPORT, "utf8");
    text = updateCheckedDate(text, date);
    writeFileSync(FRESHNESS_REPORT, text);
    log(`freshness-report checked date updated to ${date}`);
  }

  return 0;
}

try {
  process.exit(main());
} catch (err) {
  log(`wiki-lint error: ${err.message}`);
  process.exit(0); // never block the hook
}
