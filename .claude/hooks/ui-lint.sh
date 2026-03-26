#!/usr/bin/env bash
set -euo pipefail

# PostToolUse hook: index.html / style.css 変更時にデザインルール違反を検出
# 参照: docs/DESIGN-RULES.md

payload_file="$(mktemp)"
cat >"${payload_file}"
trap 'rm -f "${payload_file}"' EXIT

python3 - "${payload_file}" <<'PY'
import json, sys, pathlib, re

payload_path = sys.argv[1]
with open(payload_path, encoding="utf-8") as fh:
    payload = json.load(fh)

if payload.get("hook_event_name") != "PostToolUse":
    raise SystemExit(0)

tool_input = payload.get("tool_input") or payload.get("input") or {}
file_path = tool_input.get("file_path", "") or tool_input.get("path", "")
if not file_path:
    raise SystemExit(0)

fname = pathlib.Path(file_path).name
if fname not in ("index.html", "style.css"):
    raise SystemExit(0)

errors = []

# --- index.html checks ---
if fname == "index.html":
    p = pathlib.Path(file_path)
    if not p.is_file():
        raise SystemExit(0)
    html = p.read_text(encoding="utf-8")

    # Remove noscript blocks from checks
    html_no_noscript = re.sub(r"<noscript>.*?</noscript>", "", html, flags=re.DOTALL)

    # Check: h1, h2 must have glow-heading
    for tag in ("h1", "h2"):
        pattern = rf"<{tag}\b[^>]*>"
        for m in re.finditer(pattern, html_no_noscript):
            opening = m.group(0)
            if "glow-heading" not in opening:
                line = html_no_noscript[:m.start()].count("\n") + 1
                errors.append(f"L~{line}: <{tag}> missing .glow-heading class")

    # Check: section-label and hero-label must have glow-heading
    for cls in ("section-label", "hero-label"):
        pattern = rf'class="[^"]*{cls}[^"]*"'
        for m in re.finditer(pattern, html_no_noscript):
            if "glow-heading" not in m.group(0):
                line = html_no_noscript[:m.start()].count("\n") + 1
                errors.append(f"L~{line}: .{cls} missing .glow-heading class")

    # Check: text blocks must have glow-text
    for cls in ("overview-text", "hero-notice", "being-desc", "future-text"):
        pattern = rf'class="[^"]*{cls}[^"]*"'
        for m in re.finditer(pattern, html_no_noscript):
            if "glow-text" not in m.group(0):
                line = html_no_noscript[:m.start()].count("\n") + 1
                errors.append(f"L~{line}: .{cls} missing .glow-text class")

    # Check: .card must have glow-card
    for m in re.finditer(r'class="[^"]*\bcard\b[^"]*"', html_no_noscript):
        classes = m.group(0)
        if "glow-card" not in classes and "repo-card" not in classes:
            line = html_no_noscript[:m.start()].count("\n") + 1
            errors.append(f"L~{line}: .card missing .glow-card class")

    # Check: .repo-card must have glow-link
    for m in re.finditer(r'class="[^"]*repo-card\b[^"]*"', html_no_noscript):
        if "glow-link" not in m.group(0):
            line = html_no_noscript[:m.start()].count("\n") + 1
            errors.append(f"L~{line}: .repo-card missing .glow-link class")

    # Check: viewport meta exists
    if '<meta name="viewport"' not in html:
        errors.append("L1: missing viewport meta tag")

    # Check: no zoom blocking (WCAG 1.4.4)
    viewport_match = re.search(r'<meta\s+name="viewport"\s+content="([^"]*)"', html)
    if viewport_match:
        vp = viewport_match.group(1)
        if "user-scalable=no" in vp or "user-scalable=0" in vp:
            errors.append("L1: viewport has user-scalable=no (WCAG 1.4.4)")
        max_scale = re.search(r"maximum-scale=([0-9.]+)", vp)
        if max_scale and float(max_scale.group(1)) < 2:
            errors.append("L1: viewport maximum-scale < 2 (WCAG 1.4.4)")

# --- style.css checks ---
if fname == "style.css":
    p = pathlib.Path(file_path)
    if not p.is_file():
        raise SystemExit(0)
    css = p.read_text(encoding="utf-8")

    # Check: no text-shadow outside glow classes
    in_exempt_block = False
    brace_depth = 0
    selector_buf = ""
    glow_selectors = (".glow-heading", ".glow-text", ".glow-card", ".glow-link")
    exempt_selectors = (".menu-toggle", ".site-menu", ".lang-toggle", ".pill")
    all_exempt = glow_selectors + exempt_selectors

    for i, line in enumerate(css.splitlines(), 1):
        stripped = line.strip()

        # Skip comments and empty lines
        if not stripped or stripped.startswith("/*") or stripped.startswith("*"):
            continue

        # Track selectors (accumulate until we hit {)
        if "{" not in stripped and "}" not in stripped:
            selector_buf += " " + stripped
            continue

        if "{" in stripped:
            # Include text before { as part of selector
            selector_buf += " " + stripped.split("{")[0]
            brace_depth += 1
            if any(g in selector_buf for g in all_exempt) or ":root" in selector_buf:
                in_exempt_block = True
            selector_buf = ""

        # Check text-shadow on this line
        if "text-shadow" in stripped and not in_exempt_block:
            errors.append(f"L{i}: text-shadow outside glow class: {stripped[:60]}")

        if "}" in stripped:
            brace_depth -= 1
            if brace_depth <= 0:
                in_exempt_block = False
                brace_depth = 0
            selector_buf = ""

    # Check: no orientation lock (WCAG 1.3.4)
    if re.search(r'orientation\s*:\s*(portrait|landscape)', css):
        for i, line in enumerate(css.splitlines(), 1):
            if re.search(r'orientation\s*:\s*(portrait|landscape)', line):
                errors.append(f"L{i}: CSS orientation lock detected (WCAG 1.3.4)")

    # Check: no hardcoded colors outside :root (allow #fff and #000)
    in_root = False
    brace_depth = 0
    selector_buf2 = ""
    for i, line in enumerate(css.splitlines(), 1):
        stripped = line.strip()
        if not stripped or stripped.startswith("/*") or stripped.startswith("*"):
            continue

        if "{" in stripped:
            selector_buf2 += " " + stripped.split("{")[0]
            brace_depth += 1
            if ":root" in selector_buf2:
                in_root = True
            selector_buf2 = ""
        if "}" in stripped:
            brace_depth -= 1
            if brace_depth <= 0:
                in_root = False
                brace_depth = 0

        if not in_root and re.search(r':\s*#[0-9a-fA-F]{4,8}\b', stripped):
            errors.append(f"L{i}: hardcoded color outside :root: {stripped[:60]}")

if errors:
    msg = "\n".join(errors[:15])
    print(
        f"WARN: UI lint ({fname}) — docs/DESIGN-RULES.md violations:\n{msg}",
        file=sys.stderr,
    )
    raise SystemExit(0)
PY
