#!/usr/bin/env python3
"""READER (knowledge/ の MD 正本) から公開 LP HTML を生成する。

正本: knowledge/research/two-axis-closure/READER-division-algebra-consciousness-organization.md
出力: reader/three-and-seven.html
使い方: python3 scripts/build-reader-lp.py

READER を更新したら本スクリプトを再実行して LP を追随させる。
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "knowledge/research/two-axis-closure/READER-division-algebra-consciousness-organization.md"
TPL = ROOT / "scripts/reader-lp-template.html"
OUT = ROOT / "reader/three-and-seven.html"


def main() -> None:
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

    page = TPL.read_text(encoding="utf-8")
    page = page.replace("<!--BODY-->", html).replace("<!--UPDATED-->", updated)

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(page, encoding="utf-8")

    # UTF-8 置換文字（U+FFFD）検査
    if "�" in page:
        sys.exit("ERROR: U+FFFD found in output")
    print(f"OK: {OUT.relative_to(ROOT)} ({len(page):,} bytes, updated {updated})")


if __name__ == "__main__":
    main()
