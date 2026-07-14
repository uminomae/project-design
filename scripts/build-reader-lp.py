#!/usr/bin/env python3
"""READER (knowledge/ の MD 正本) から公開 LP HTML を生成する。

ページ一覧は PAGES を参照（正本 MD × テンプレート × 出力 HTML の組）。
使い方: python3 scripts/build-reader-lp.py

READER を更新したら本スクリプトを再実行して LP を追随させる。

デザイン必須制約（docs/DESIGN-RULES.md §0a）:
- 全公開ページは index.html の VI を継承する（シェーダー背景 + グロークラス体系 + 確立パレット）
- テンプレート（scripts/reader-*-template.html）や後処理を変更するときも上記を満たすこと
- 独自テーマ・埋め込み standalone CSS の新造は禁止（却下実例: DESIGN-RULES §8b 2026-07-03）
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# (正本 MD, テンプレート, 出力 HTML)。ページ追加時はここに1行足し、reader/README.md の表も更新する
PAGES = [
    (
        ROOT / "knowledge/research/two-axis-closure/READER-division-algebra-consciousness-organization.md",
        ROOT / "scripts/reader-lp-template.html",
        ROOT / "reader/three-and-seven.html",
    ),
    (
        ROOT / "knowledge/research/energy-flow-psyche/READER-energy-flow-psyche.md",
        ROOT / "scripts/reader-energy-flow-template.html",
        ROOT / "reader/energy-flow.html",
    ),
]


def build(SRC: Path, TPL: Path, OUT: Path) -> None:
    md = SRC.read_text(encoding="utf-8")

    # front matter を剥がす
    m = re.match(r"^---\n.*?\n---\n", md, re.S)
    body_md = md[m.end():] if m else md

    # 最終更新日は正本の git 履歴から取る
    updated = subprocess.run(
        ["git", "log", "-1", "--format=%ad", "--date=format:%Y-%m-%d", "--", str(SRC)],
        cwd=ROOT, capture_output=True, text=True, check=True,
    ).stdout.strip() or "unknown"

    # GFM → HTML（インライン SVG は raw HTML としてそのまま通る）
    html = subprocess.run(
        ["pandoc", "-f", "gfm", "-t", "html", "--wrap=none"],
        input=body_md, capture_output=True, text=True, check=True,
    ).stdout

    # 先頭 H1 はテンプレートの hero と重複するため除去
    html = re.sub(r"<h1[^>]*>.*?</h1>\s*", "", html, count=1)

    # DESIGN-RULES §0a: グロークラス体系を生成 HTML に適用する
    # 見出しは .glow-heading（本文の glow は article 側の .glow-text が担う）
    html = re.sub(r"<h([23])( |>)", lambda m: f'<h{m.group(1)} class="glow-heading"' + (" " if m.group(2) == " " else ">"), html)
    # 図版（インライン SVG）と表は .glow-card の白ガラスパネルに載せる
    # SVG 直後の <figcaption> は同じ figure に含める（正本 MD 側で </svg> の次行に置く）
    html = re.sub(
        r"(<svg\b.*?</svg>)(\s*<figcaption>.*?</figcaption>)?",
        lambda m: '<figure class="glow-card reader-figure">' + m.group(1) + (m.group(2) or "") + "</figure>",
        html, flags=re.S,
    )
    html = re.sub(r"(<table\b.*?</table>)", r'<div class="glow-card reader-table">\1</div>', html, flags=re.S)
    # 引用・コールアウト（lede/📖/仮説ボックス）はガラスパネルに載せる（シェーダー上の可読性）
    html = html.replace("<blockquote>", '<blockquote class="glow-card reader-callout">')

    # 目次: 本文の h1（部）/ h2（章）から生成し、正本 MD の <!--TOC--> 位置に挿す
    toc_items = []
    for level, hid, text in re.findall(r'<h([12])[^>]*\bid="([^"]+)"[^>]*>(.*?)</h\1>', html, flags=re.S):
        label = re.sub(r"<[^>]+>", "", text).strip()
        cls = ' class="reader-toc-part"' if level == "1" else ""
        toc_items.append(f'<li{cls}><a href="#{hid}">{label}</a></li>')
    toc_html = (
        '<nav class="reader-toc glow-card" aria-label="目次">'
        '<p class="reader-toc-title">目次</p>'
        "<ol>" + "".join(toc_items) + "</ol></nav>"
    )
    if "<!--TOC-->" not in html:
        sys.exit(f"ERROR: <!--TOC--> marker not found in generated body ({SRC.name})")
    html = html.replace("<!--TOC-->", toc_html, 1)

    page = TPL.read_text(encoding="utf-8")
    page = page.replace("<!--BODY-->", html).replace("<!--UPDATED-->", updated)

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(page, encoding="utf-8")

    # UTF-8 置換文字（U+FFFD）検査
    if "�" in page:
        sys.exit(f"ERROR: U+FFFD found in output ({OUT.name})")
    print(f"OK: {OUT.relative_to(ROOT)} ({len(page):,} bytes, updated {updated})")


def main() -> None:
    for src, tpl, out in PAGES:
        build(src, tpl, out)


if __name__ == "__main__":
    main()
