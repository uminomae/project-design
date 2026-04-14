#!/usr/bin/env node
/**
 * wiki-stale-check.mjs
 *
 * knowledge/ 編集時に、その正本ファイルを参照している wiki/ ページを特定して
 * stale 通知を出す。#72
 *
 * Usage:
 *   node scripts/wiki-stale-check.mjs --knowledge <path>
 *   node scripts/wiki-stale-check.mjs --all   # 全 knowledge を対象に stale を走査
 *
 * knowledge path は pd repo 相対 (例: knowledge/meta/project-overview.md)。
 * 対応 repo: project-design (local) のみ。
 * cross-repo の knowledge 変更は別 repo の hook で扱うべき。
 *
 * Exit 0: 常に 0 (hook がセッションを止めないように)
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, basename, relative, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname.replace(/\/$/, ""));
const WIKI = join(ROOT, "wiki");

const args = process.argv.slice(2);
const knowledgeIdx = args.indexOf("--knowledge");
const targetKnowledge = knowledgeIdx >= 0 ? args[knowledgeIdx + 1] : null;
const scanAll = args.includes("--all");

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

/**
 * Parse front matter `source:` block.
 * Returns array of { repo, path } objects.
 * Minimal YAML parser (handles the specific shape used in this repo).
 */
function parseSources(text) {
  if (!text.startsWith("---\n")) return [];
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) return [];
  const fm = text.slice(4, end);
  const lines = fm.split("\n");
  const sources = [];
  let inSource = false;
  let current = null;
  for (const line of lines) {
    if (/^source:\s*$/.test(line)) {
      inSource = true;
      continue;
    }
    if (inSource) {
      // next top-level key ends the block
      if (/^[a-zA-Z_][\w-]*:/.test(line) && !/^\s+/.test(line)) {
        if (current) sources.push(current);
        current = null;
        inSource = false;
        continue;
      }
      const dashMatch = /^\s*-\s*repo:\s*(.+)$/.exec(line);
      if (dashMatch) {
        if (current) sources.push(current);
        current = { repo: dashMatch[1].replace(/^["']|["']$/g, "").trim(), path: "" };
        continue;
      }
      const pathMatch = /^\s*path:\s*(.+)$/.exec(line);
      if (pathMatch && current) {
        current.path = pathMatch[1].replace(/^["']|["']$/g, "").trim();
        continue;
      }
    }
  }
  if (current) sources.push(current);
  return sources;
}

function parseCompiledDate(text) {
  const m = /^compiled:\s*["']?([\d-]+)["']?/m.exec(text);
  return m ? m[1] : null;
}

function parseTitle(text) {
  const m = /^title:\s*["']?([^"'\n]+)["']?/m.exec(text);
  return m ? m[1].trim() : null;
}

// ---- build wiki source index ----

function buildWikiIndex() {
  const files = walk(WIKI).filter((f) => !f.includes("/health/"));
  const index = []; // { wikiPath, title, compiled, sources: [{repo, path}] }
  for (const f of files) {
    const text = readFileSync(f, "utf8");
    const sources = parseSources(text);
    if (sources.length === 0) continue;
    index.push({
      wikiPath: relative(WIKI, f),
      title: parseTitle(text) || basename(f, ".md"),
      compiled: parseCompiledDate(text),
      sources,
    });
  }
  return index;
}

// ---- main ----

function main() {
  if (!existsSync(WIKI)) return 0;
  const index = buildWikiIndex();

  if (targetKnowledge) {
    // normalize: strip leading ./
    const norm = targetKnowledge.replace(/^\.\//, "");
    const matched = [];
    for (const entry of index) {
      for (const src of entry.sources) {
        if (src.repo === "project-design" && src.path === norm) {
          matched.push(entry);
          break;
        }
      }
    }
    if (matched.length === 0) {
      console.error(`wiki-stale-check: no wiki page references ${norm}`);
      return 0;
    }
    console.error(`wiki-stale-check: knowledge ${norm} 編集 → 以下の wiki ページが stale の可能性:`);
    for (const m of matched) {
      console.error(`  - ${m.title} (${m.wikiPath}, compiled: ${m.compiled || "unknown"})`);
    }
    console.error(`  ${matched.length} page(s). 必要なら /wiki-compile を実行して再生成すること。`);
    return 0;
  }

  if (scanAll) {
    // Cross-check all pd-local sources; report pages whose source is missing
    // (light WL-5 for pd-local only)
    const missing = [];
    for (const entry of index) {
      for (const src of entry.sources) {
        if (src.repo !== "project-design") continue;
        const abs = join(ROOT, src.path);
        if (!existsSync(abs)) missing.push({ entry, src });
      }
    }
    if (missing.length === 0) {
      console.error("wiki-stale-check --all: 全 pd-local source パス実在 OK");
    } else {
      console.error(`wiki-stale-check --all: ${missing.length} 件の source path 不在`);
      for (const m of missing) {
        console.error(`  - ${m.entry.wikiPath} → missing: ${m.src.path}`);
      }
    }
    return 0;
  }

  console.error("Usage: wiki-stale-check.mjs --knowledge <path> | --all");
  return 0;
}

try {
  process.exit(main());
} catch (err) {
  console.error(`wiki-stale-check error: ${err.message}`);
  process.exit(0);
}
