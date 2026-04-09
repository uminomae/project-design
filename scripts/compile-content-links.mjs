#!/usr/bin/env node
/**
 * compile-content-links.mjs
 *
 * wiki/ のページ名から用語マップを自動生成し、
 * content/*.md 内の用語初出を wiki リンクに置換して
 * content/compiled/*.md に出力する。
 *
 * Usage: node scripts/compile-content-links.mjs [--file content/about-ja.md]
 *   --file を省略すると content/ 直下の全 .md を処理
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, basename, relative } from "node:path";
import { existsSync } from "node:fs";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const WIKI_BASE = "/project-design/wiki";
const CONTENT_DIR = join(ROOT, "content");
const COMPILED_DIR = join(ROOT, "content", "compiled");

const WIKI_DIRS = [
  { dir: join(ROOT, "wiki", "concepts"), category: "concepts" },
  { dir: join(ROOT, "wiki", "entities"), category: "entities" },
];

/** wiki ページ名から {term, url} のマップを生成 */
async function buildTermMap() {
  const terms = [];

  for (const { dir, category } of WIKI_DIRS) {
    if (!existsSync(dir)) continue;
    const files = await readdir(dir);

    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const stem = file.replace(/\.md$/, "");

      // wikilink.md 等のメタページは除外
      if (stem === "wikilink" || stem === "index") continue;

      terms.push({
        term: stem,
        url: `${WIKI_BASE}/${category}/${encodeURIComponent(stem)}`,
      });
    }
  }

  // 長い用語から先にマッチさせる（「創造の5段階モデル」が「創造の5段階」より先）
  terms.sort((a, b) => b.term.length - a.term.length);
  return terms;
}

/**
 * markdown テキスト中の用語初出を wiki リンクに置換する。
 * - front matter (---) 内は対象外
 * - 既存リンク [...](url) 内は対象外
 * - 見出し行 (# ...) 内は対象外
 * - 各用語は最初の1回だけ置換
 */
function injectLinks(markdown, termMap) {
  const lines = markdown.split("\n");
  let inFrontMatter = false;
  let frontMatterCount = 0;
  const linked = new Set();

  const result = lines.map((line) => {
    // front matter の検出・除去（compiled 版には不要）
    if (line.trim() === "---") {
      frontMatterCount++;
      if (frontMatterCount === 1) inFrontMatter = true;
      if (frontMatterCount === 2) inFrontMatter = false;
      return null;
    }
    if (inFrontMatter) return null;

    // 見出し行はスキップ
    if (/^#{1,6}\s/.test(line)) return line;

    // 既存リンク部分を一時退避
    const linkPlaceholders = [];
    let safeLine = line.replace(/\[[^\]]*\]\([^)]*\)/g, (match) => {
      const idx = linkPlaceholders.length;
      linkPlaceholders.push(match);
      return `\x00LINK${idx}\x00`;
    });

    // data-modal-open 等の HTML 属性付きリンクも退避
    safeLine = safeLine.replace(/<a\b[^>]*>.*?<\/a>/g, (match) => {
      const idx = linkPlaceholders.length;
      linkPlaceholders.push(match);
      return `\x00LINK${idx}\x00`;
    });

    for (const { term, url } of termMap) {
      if (linked.has(term)) continue;

      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped);
      const match = safeLine.match(regex);

      if (match) {
        const link = `[${term}](${url})`;
        // 置換後のリンクを即座に退避し、後続の短い用語がリンク内にマッチするのを防ぐ
        const placeholderIdx = linkPlaceholders.length;
        linkPlaceholders.push(link);
        safeLine = safeLine.replace(regex, `\x00LINK${placeholderIdx}\x00`);
        linked.add(term);
      }
    }

    // プレースホルダーを復元
    safeLine = safeLine.replace(/\x00LINK(\d+)\x00/g, (_, idx) => {
      return linkPlaceholders[Number(idx)];
    });

    return safeLine;
  });

  return result.filter((line) => line !== null).join("\n");
}

async function compileFile(filePath, termMap) {
  const markdown = await readFile(filePath, "utf-8");
  const compiled = injectLinks(markdown, termMap);
  const outPath = join(COMPILED_DIR, basename(filePath));
  await writeFile(outPath, compiled, "utf-8");
  const name = relative(ROOT, filePath);
  const outName = relative(ROOT, outPath);
  console.error(`compiled: ${name} -> ${outName}`);
}

async function main() {
  await mkdir(COMPILED_DIR, { recursive: true });
  const termMap = await buildTermMap();

  if (termMap.length === 0) {
    console.error("No wiki pages found, nothing to link.");
    return;
  }
  console.error(`Wiki term map: ${termMap.length} terms`);

  // --file オプション
  const fileIdx = process.argv.indexOf("--file");
  if (fileIdx !== -1 && process.argv[fileIdx + 1]) {
    const target = join(ROOT, process.argv[fileIdx + 1]);
    await compileFile(target, termMap);
    return;
  }

  // content/ 直下の全 .md
  const files = await readdir(CONTENT_DIR);
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    await compileFile(join(CONTENT_DIR, file), termMap);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
