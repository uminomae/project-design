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
import html as htmllib
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# (正本 MD, テンプレート, 出力 HTML, style)。ページ追加時はここに1行足し、reader/README.md の表も更新する
# style:
#   "glow" … three-and-seven 型（透過記事＋要素ごとの glow-card、<!--TOC--> にインライン目次）
#   "flow" … energy-flow 型（cs wave-vortex 参考の一枚ガラスカラム＋garage 型の章 details.sec、
#            目次は src/reader-flow.js がクライアント側で生成。pjdhiro 指示 2026-07-14）
PAGES = [
    (
        ROOT / "knowledge/research/two-axis-closure/READER-division-algebra-consciousness-organization.md",
        ROOT / "scripts/reader-lp-template.html",
        ROOT / "reader/three-and-seven.html",
        "glow",
    ),
    (
        ROOT / "knowledge/research/energy-flow-psyche/READER-energy-flow-psyche.md",
        ROOT / "scripts/reader-energy-flow-template.html",
        ROOT / "reader/energy-flow.html",
        "flow",
    ),
    (
        ROOT / "knowledge/research/stages-screener/READER-stages-screener.md",
        ROOT / "scripts/reader-stages-screener-template.html",
        ROOT / "reader/stages-screener.html",
        "flow",
    ),
]

# スクリーナーのデータ（正本 JSON）。出力 HTML 名 → JSON。正本 MD の <!--SCREENER--> に
# no-JS 用の静的リスト＋埋め込み JSON を差し込み、src/reader-screener.js が対話 UI に置き換える
SCREENER_DATA = {
    "stages-screener.html": ROOT / "knowledge/research/stages-screener/screener-data.json",
}


def fold_sections(html: str) -> str:
    """h2 章を garage 型の <details class="sec"> に畳む（flow style 用）。

    h2 の id を details 側へ移す（既存アンカー #2-... は details に着地し、
    reader-flow.js が開いてスクロールする）。h2 より前のリード部はそのまま残す。
    """
    parts = re.split(r'(<h2 id="[^"]+">.*?</h2>)', html, flags=re.S)
    out = [parts[0]]
    for i in range(1, len(parts), 2):
        h2 = parts[i]
        body = parts[i + 1] if i + 1 < len(parts) else ""
        hid = re.search(r'id="([^"]+)"', h2).group(1)
        label = re.sub(r"<[^>]+>", "", h2).strip()
        # 正本 MD で h2 直後に <!--OPEN--> を置いた章は、最初から開いておく
        opened = body.lstrip().startswith("<!--OPEN-->")
        if opened:
            body = body.replace("<!--OPEN-->", "", 1)
        out.append(
            f'<details class="sec" id="{hid}"{" open" if opened else ""}><summary>{label}</summary>'
            f'<div class="secbody">{body}</div></details>'
        )
    return "".join(out)


def screener_markup(data_path: Path) -> str:
    """スクリーナーの静的マークアップ（no-JS・SEO/LLM 用）と埋め込み JSON を作る。"""
    data = json.loads(data_path.read_text(encoding="utf-8"))
    bands = {b["id"]: b for b in data["bands"]}
    esc = htmllib.escape
    items = []
    for i, q in enumerate(data["questions"], 1):
        opts = "".join(f"<li>{esc(o['text'])}</li>" for o in q["options"])
        key = "".join(f"<li>{esc(bands[o['band']]['label'])}：{esc(o['text'])}</li>" for o in q["options"])
        items.append(
            f'<li><p class="screener-question">Q{i}. {esc(q["text"])}</p><ul>{opts}</ul>'
            f'<details><summary>各選択肢の帯</summary><ul>{key}</ul></details></li>'
        )
    # JSON は </script> を閉じさせないよう < をエスケープする
    payload = json.dumps(data, ensure_ascii=False).replace("<", "\\u003c")
    return (
        '<section class="screener glow-card" data-screener="screener-data" aria-label="スクリーナー">'
        '<p class="screener-small">JavaScript が動かない環境では、問いと選択肢の一覧だけを表示しています。</p>'
        f'<ol class="screener-static">{"".join(items)}</ol></section>'
        f'<script type="application/json" id="screener-data">{payload}</script>'
    )


def build(SRC: Path, TPL: Path, OUT: Path, STYLE: str) -> None:
    md = SRC.read_text(encoding="utf-8")

    # front matter を剥がす
    m = re.match(r"^---\n.*?\n---\n", md, re.S)
    body_md = md[m.end():] if m else md

    # 最終更新日は正本の git 履歴から取る。ただし未コミットの編集があるときは今日の日付
    # （MD 編集と再ビルドを同一コミットに入れる通常運用では、コミット前のビルド時点で
    #  git log が 1 コミット前の日付を返し、表示が古いまま公開される）
    dirty = subprocess.run(
        ["git", "status", "--porcelain", "--", str(SRC)],
        cwd=ROOT, capture_output=True, text=True, check=True,
    ).stdout.strip()
    if dirty:
        updated = date.today().isoformat()
    else:
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

    if OUT.name in SCREENER_DATA:
        if "<!--SCREENER-->" not in html:
            sys.exit(f"ERROR: <!--SCREENER--> marker not found in generated body ({SRC.name})")
        # glow 後処理（表の glow-card 化など）が静的リストに及ばないよう、最後に差し込む
        screener_html = screener_markup(SCREENER_DATA[OUT.name])
    else:
        screener_html = None

    if STYLE == "glow":
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
    elif STYLE == "flow":
        # flow 型（DESIGN-RULES §13）: 一枚ガラスカラム上なので glow クラスは付けない。
        # 表は garage 型の横スクロール枠、引用はコールアウト、MD の畳みは .acc カードに
        html = re.sub(r"(<table\b.*?</table>)", r'<div class="tablewrap">\1</div>', html, flags=re.S)
        html = html.replace("<blockquote>", '<blockquote class="reader-callout">')
        html = html.replace("<details>", '<details class="acc">')
        # h2 章を garage 型の details.sec に畳む（目次は src/reader-flow.js が生成）
        html = fold_sections(html)
        if "<!--TOC-->" in html:
            sys.exit(f"ERROR: flow style page must not contain <!--TOC--> marker ({SRC.name})")
    else:
        sys.exit(f"ERROR: unknown style {STYLE!r} for {SRC.name}")

    if screener_html is not None:
        html = html.replace("<!--SCREENER-->", screener_html, 1)

    page = TPL.read_text(encoding="utf-8")
    page = page.replace("<!--BODY-->", html).replace("<!--UPDATED-->", updated)

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(page, encoding="utf-8")

    # UTF-8 置換文字（U+FFFD）検査
    if "�" in page:
        sys.exit(f"ERROR: U+FFFD found in output ({OUT.name})")
    print(f"OK: {OUT.relative_to(ROOT)} ({len(page):,} bytes, updated {updated})")

    update_sitemap_lastmod(OUT, updated)


def update_sitemap_lastmod(out: Path, updated: str) -> None:
    """sitemap.xml の該当 <url> の <lastmod> をビルド日付に追随させる（pd#122）。"""
    if updated == "unknown":
        return
    sm = ROOT / "sitemap.xml"
    xml = sm.read_text(encoding="utf-8")
    loc = f"https://uminomae.github.io/project-design/reader/{out.name}"
    pattern = re.compile(
        r"(<loc>" + re.escape(loc) + r"</loc>\s*<lastmod>)[^<]+(</lastmod>)"
    )
    new_xml, n = pattern.subn(lambda m: m.group(1) + updated + m.group(2), xml)
    if n and new_xml != xml:
        sm.write_text(new_xml, encoding="utf-8")
        print(f"OK: sitemap.xml lastmod -> {updated} ({out.name})")


def main() -> None:
    for src, tpl, out, style in PAGES:
        build(src, tpl, out, style)


if __name__ == "__main__":
    main()
