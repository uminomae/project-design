// Reader Micro-worlds — 触って挙動を直感できる対話的環境（Litt「Micro-worlds」/ CN-011 §2 / pd#128）。
// DESIGN-RULES §0a 準拠: 独自テーマを新造せず、tokens.css の CSS 変数と glow 体系の上にのみ載せる。
// 依存ライブラリなし（vanilla）。各ウィジェットは <div data-microworld="..."> にマウントされる。
// 数理核（Cayley–Dickson 乗算・八元数の合成則・16元数の零因子）は node で機械検証済み（RR-011/§4）。

// ---- palette: tokens.css の確立色のみを使う（新色ハードコード禁止 §0a-4）----
const cssVar = (name, fallback) => {
    try {
        const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        return v || fallback;
    } catch {
        return fallback;
    }
};
const PAL = () => ({
    ink: cssVar('--ink', '#0f172a'),
    mid: cssVar('--mid', '#334155'),
    mute: cssVar('--mute', '#94a3b8'),
    navy: cssVar('--navy', '#2e3a6e'),
    gold: cssVar('--gold', '#8a7040'),
    coral: cssVar('--coral', '#b04050'),
    line: 'rgba(0,0,0,0.10)',
    faint: 'rgba(0,0,0,0.045)',
});

// ---- canvas: devicePixelRatio 対応の 2D 文脈を作る ----
// ResizeObserver で「折りたたみ <details> を開いた」「ウィンドウ幅が変わった」の両方を一律に拾い、
// api.onResize（各ウィジェットが draw を代入）を呼んで再描画する。
function makeCanvas(host, aspect = 0.62) {
    const canvas = document.createElement('canvas');
    canvas.className = 'mw-canvas';
    canvas.setAttribute('role', 'img');
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    const api = { canvas, ctx, resize, onResize: null, get W() { return W; }, get H() { return H; } };
    // サイズが実際に変わった時だけ canvas.width を再代入する（再代入は canvas をクリアするため）。
    // 変化なしなら no-op（既存の描画を保持）。戻り値 true = リサイズ＝クリアしたので要再描画。
    function resize() {
        const raw = host.clientWidth || canvas.parentElement?.clientWidth || 0;
        if (raw < 1) return false;                 // 非表示（閉じた details 等）。表示され次第 Observer/toggle が再呼び出し
        const cssW = Math.max(240, raw);
        const cssH = Math.round(cssW * aspect);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const bw = Math.round(cssW * dpr), bh = Math.round(cssH * dpr);
        W = cssW; H = cssH;
        if (canvas.width === bw && canvas.height === bh) return false;  // 変化なし＝クリアしない
        canvas.style.width = cssW + 'px';
        canvas.style.height = cssH + 'px';
        canvas.width = bw; canvas.height = bh;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return true;
    }
    resize();
    if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => { if (resize() && api.onResize) api.onResize(); });
        ro.observe(host);
    }
    // 折りたたみ <details> 内でマウントされた場合、開いた瞬間に確実に再描画する（ResizeObserver の保険）
    const det = host.closest('details');
    if (det) det.addEventListener('toggle', () => { if (resize() && api.onResize) api.onResize(); });
    return api;
}

// ---- 小物 UI ----
function el(tag, cls, txt) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
}
function controls(host) {
    const row = el('div', 'mw-controls');
    host.appendChild(row);
    return row;
}
function button(row, label, onClick) {
    const b = el('button', 'mw-btn', label);
    b.type = 'button';
    b.addEventListener('click', onClick);
    row.appendChild(b);
    return b;
}
function slider(row, { label, min, max, value, step = 1, onInput }) {
    const wrap = el('label', 'mw-slider');
    wrap.appendChild(el('span', 'mw-slider-label', label));
    const input = document.createElement('input');
    input.type = 'range';
    input.min = min; input.max = max; input.step = step; input.value = value;
    input.addEventListener('input', () => onInput(parseFloat(input.value)));
    wrap.appendChild(input);
    row.appendChild(wrap);
    return input;
}
function status(host) {
    const s = el('p', 'mw-status');
    s.setAttribute('aria-live', 'polite');
    host.appendChild(s);
    return s;
}

// ============================================================
// 1) 複素数の掛け算＝平面回転（§2「回る数」）
//    掛けても大きさは変わらず、向きだけ回る（|z·y| = |z|·|y|）。×i で 90°ずつ。
// ============================================================
function mountComplexRotation(host) {
    const P = PAL();
    const view = makeCanvas(host, 0.66);
    const row = controls(host);
    const st = status(host);
    let theta = 90;      // 掛ける回転角（度）
    const inAng = 33;    // 入力点の初期角（度）

    const slInput = slider(row, {
        label: '掛ける回転', min: 0, max: 360, value: theta,
        onInput: v => { theta = v; draw(); },
    });
    button(row, '× i（90°）', () => { theta = (theta + 90) % 360; slInput.value = theta; draw(); });
    button(row, 'リセット', () => { theta = 0; slInput.value = theta; draw(); });

    function draw() {
        const { ctx, W, H } = view;
        ctx.clearRect(0, 0, W, H);
        const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.36;
        // 軸
        ctx.strokeStyle = P.line; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cx - R * 1.25, cy); ctx.lineTo(cx + R * 1.25, cy);
        ctx.moveTo(cx, cy - R * 1.25); ctx.lineTo(cx, cy + R * 1.25); ctx.stroke();
        // 単位円
        ctx.strokeStyle = P.faint; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
        // ラベル 1, i
        ctx.fillStyle = P.mute; ctx.font = '13px sans-serif';
        ctx.textAlign = 'left'; ctx.fillText('1', cx + R * 1.28, cy + 4);
        ctx.textAlign = 'center'; ctx.fillText('i', cx, cy - R * 1.30);
        const rad = a => a * Math.PI / 180;
        const pt = a => [cx + R * Math.cos(rad(a)), cy - R * Math.sin(rad(a))];
        const outAng = inAng + theta;
        // 回転の弧
        ctx.strokeStyle = P.gold; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, R * 0.55, -rad(outAng), -rad(inAng), theta < 0); ctx.stroke();
        // 入力ベクトル（navy）
        drawVec(ctx, cx, cy, pt(inAng), P.navy, '入力');
        // 出力ベクトル（coral）
        drawVec(ctx, cx, cy, pt(outAng), P.coral, '掛けた後');
        st.innerHTML = '掛ける回転 <b>' + Math.round(theta) + '°</b> ／ 大きさは <b>1 のまま</b>（回るだけ、増えも減りもしない）。'
            + (theta % 90 === 0 && theta !== 0 ? ' ＝ 「× i」を ' + (theta / 90) + ' 回。' : '');
    }
    function drawVec(ctx, cx, cy, [x, y], color, label) {
        ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(label, x + (x > cx ? 6 : -6) * 0, y + (y > cy ? 16 : -10));
    }
    view.canvas.setAttribute('aria-label', '複素数の掛け算＝回転。掛けても大きさは変わらず向きだけ回る。');
    view.onResize = draw;
    draw();
}

// ============================================================
// 2) 四元数の非可換回転（§2「手元で試せます」）
//    同じ2つの90°回転でも、順序を変えると行き先が変わる（i·j = k, j·i = −k）。
//    2つの立方体を左右で「前→右」「右→前」に回し、最終の向きが違うことを見せる。
// ============================================================
function mat3mul(a, b) {
    const r = new Array(9);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++)
        r[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
    return r;
}
const ID3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
function rotX(deg) { const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t); return [1, 0, 0, 0, c, -s, 0, s, c]; }
function rotY(deg) { const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t); return [c, 0, s, 0, 1, 0, -s, 0, c]; }
function apply3(m, v) { return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]]; }

function mountQuaternionOrder(host) {
    const P = PAL();
    const view = makeCanvas(host, 0.52);
    const row = controls(host);
    const st = status(host);
    // 立方体: 6面（頂点インデックス・法線・色・ラベル）
    const V = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    const faces = [
        { idx: [4, 5, 6, 7], n: [0, 0, 1], c: P.navy, t: '前' },
        { idx: [1, 0, 3, 2], n: [0, 0, -1], c: P.mute, t: '後' },
        { idx: [3, 2, 6, 7], n: [0, 1, 0], c: P.gold, t: '上' },
        { idx: [0, 1, 5, 4], n: [0, -1, 0], c: P.mid, t: '下' },
        { idx: [1, 2, 6, 5], n: [1, 0, 0], c: P.coral, t: '右' },
        { idx: [0, 4, 7, 3], n: [-1, 0, 0], c: P.ink, t: '左' },
    ];
    const Vview = mat3mul(rotX(-22), rotY(28)); // 3面が見える固定視点
    // 各立方体: 完了済み向き M0、実行中ステップ列
    function makeCube(steps, title) { return { M0: ID3.slice(), steps, i: 0, p: 0, title, done: false }; }
    let left, right, playing = false, raf = 0;
    reset();

    button(row, '▶ 同時に回す', () => { if (!playing) { reset(); play(); } });
    button(row, 'リセット', () => { cancelAnimationFrame(raf); playing = false; reset(); draw(); setStatus(); });

    function reset() {
        left = makeCube([{ f: rotX, d: 90, name: '前へ90°' }, { f: rotY, d: 90, name: '右へ90°' }], '① 前 → 右');
        right = makeCube([{ f: rotY, d: 90, name: '右へ90°' }, { f: rotX, d: 90, name: '前へ90°' }], '② 右 → 前');
    }
    function curMat(cube) {
        if (cube.i >= cube.steps.length) return cube.M0;
        const s = cube.steps[cube.i];
        return mat3mul(s.f(s.d * cube.p), cube.M0);
    }
    function play() {
        playing = true;
        let last = performance.now();
        const speed = 90 / 900; // 度/ms → 1 ステップ約 1 秒
        function tick(now) {
            const dt = now - last; last = now;
            [left, right].forEach(cube => {
                if (cube.done) return;
                cube.p += (dt * speed) / cube.steps[cube.i].d;
                if (cube.p >= 1) {
                    const s = cube.steps[cube.i];
                    cube.M0 = mat3mul(s.f(s.d), cube.M0);
                    cube.i++; cube.p = 0;
                    if (cube.i >= cube.steps.length) cube.done = true;
                }
            });
            draw(); setStatus();
            if (!left.done || !right.done) raf = requestAnimationFrame(tick);
            else { playing = false; setStatus(true); }
        }
        raf = requestAnimationFrame(tick);
    }
    function drawCube(ctx, ox, oy, scale, M) {
        const MM = mat3mul(Vview, M);
        const proj = v => { const p = apply3(MM, v); return [ox + p[0] * scale, oy - p[1] * scale, p[2]]; };
        const pv = V.map(proj);
        const vis = faces.map(f => {
            const nv = apply3(MM, f.n);
            const depth = f.idx.reduce((s, k) => s + pv[k][2], 0) / 4;
            return { f, front: nv[2] > 0, depth };
        }).sort((a, b) => a.depth - b.depth);
        vis.forEach(({ f, front }) => {
            if (!front) return;
            ctx.beginPath();
            f.idx.forEach((k, n) => { const [x, y] = pv[k]; n ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
            ctx.closePath();
            ctx.fillStyle = f.c; ctx.globalAlpha = 0.92; ctx.fill(); ctx.globalAlpha = 1;
            ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 1.2; ctx.stroke();
            // ラベル（面中心）
            const cxp = f.idx.reduce((s, k) => s + pv[k][0], 0) / 4;
            const cyp = f.idx.reduce((s, k) => s + pv[k][1], 0) / 4;
            ctx.fillStyle = '#fff'; ctx.font = '600 15px sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(f.t, cxp, cyp);
        });
    }
    function draw() {
        const { ctx, W, H } = view;
        ctx.clearRect(0, 0, W, H);
        const scale = Math.min(W / 2, H) * 0.24;
        const y = H * 0.46;
        drawCube(ctx, W * 0.27, y, scale, curMat(left));
        drawCube(ctx, W * 0.73, y, scale, curMat(right));
        ctx.strokeStyle = P.faint; ctx.beginPath(); ctx.moveTo(W / 2, 8); ctx.lineTo(W / 2, H - 8); ctx.stroke();
        ctx.fillStyle = P.mid; ctx.font = '600 13px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
        ctx.fillText(left.title, W * 0.27, H - 8);
        ctx.fillText(right.title, W * 0.73, H - 8);
    }
    function setStatus(finished) {
        if (finished) {
            st.innerHTML = '同じ2つの回転を、順序だけ変えました。<b>手前に来る面が違います</b>——順序が効く。'
                + 'これが <code>i·j = k</code> と <code>j·i = −k</code> の身体版です。';
        } else if (playing) {
            st.textContent = '回転中…（左は 前→右、右は 右→前）';
        } else {
            st.innerHTML = '「▶ 同時に回す」を押すと、左右が同じ2回転を<b>逆の順序</b>で行います。';
        }
    }
    view.canvas.setAttribute('aria-label', '2つの立方体を同じ2つの90°回転で、順序を変えて回す。最終の向きが違う。');
    view.onResize = draw;
    draw(); setStatus();
}

// ============================================================
// 3) 720°で閉じる（二重被覆・§5 ④）— 3つの描き方を切り替えて見る
//    ① 裏の針（担い手は半分の速さ θ/2 で回る）② 糸でつながれた球（ディラック）③ ベルト。
//    360°で物は戻るが担い手は真後ろ（−1）、720°で担い手も戻る（+1）。符号 = cos(角/2)、±1 の2値。
// ============================================================
function mountDoubleCover(host) {
    const P = PAL();
    let ang = 0, mode = 'hands', playing = false, raf = 0;
    // DOM 構築順: モードボタン → canvas → スライダー → status
    const mrow = controls(host);
    const view = makeCanvas(host, 0.74);
    const row = controls(host);
    const st = status(host);
    const modeLabels = { hands: '裏の針', ball: '糸でつながれた球', belt: 'ベルト' };
    const mbtns = {};
    Object.entries(modeLabels).forEach(([k, label]) => { mbtns[k] = button(mrow, label, () => { mode = k; markMode(); draw(); }); });
    const sl = slider(row, { label: '回す角度', min: 0, max: 720, value: 0, onInput: v => { stop(); ang = v; draw(); } });
    button(row, '▶ ゆっくり回す', () => { if (!playing) start(); else stop(); });
    button(row, 'リセット', () => { stop(); ang = 0; sl.value = 0; draw(); });
    function markMode() { Object.entries(mbtns).forEach(([k, b]) => b.classList.toggle('is-on', k === mode)); }
    function start() { playing = true; let last = performance.now(); (function t(now) { const dt = now - last; last = now; ang = Math.min(720, ang + dt * 0.14); sl.value = ang; draw(); if (ang < 720 && playing) raf = requestAnimationFrame(t); else playing = false; })(performance.now()); }
    function stop() { playing = false; cancelAnimationFrame(raf); }

    function arrow(ctx, cx, cy, aDeg, len, color, lw) {
        const a = aDeg * Math.PI / 180, x = cx + len * Math.sin(a), y = cy - len * Math.cos(a);
        ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw || 3;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
        const hl = len * 0.18;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - hl * Math.sin(a - 0.42), y + hl * Math.cos(a - 0.42));
        ctx.lineTo(x - hl * Math.sin(a + 0.42), y + hl * Math.cos(a + 0.42));
        ctx.closePath(); ctx.fill();
        return [x, y];
    }

    // ① 裏の針: 物は θ、担い手は θ/2 で回る。360°で担い手は真後ろ＝−1、720°で戻って＝+1。
    function drawHands(ctx, W, H) {
        const cx = W / 2, cy = H * 0.56, R = Math.min(W * 0.44, H * 0.44);
        ctx.strokeStyle = P.mute; ctx.globalAlpha = 0.45; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); ctx.globalAlpha = 1;
        ctx.setLineDash([5, 5]); ctx.strokeStyle = P.mute; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - R); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = P.mute; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('スタート', cx, cy - R - 8);
        arrow(ctx, cx, cy, ang / 2, R * 0.62, P.coral, 3.5);   // 担い手（半分の速さ）
        arrow(ctx, cx, cy, ang, R * 0.94, P.navy, 4);          // 物（見える向き）
        ctx.fillStyle = P.ink; ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, 7); ctx.fill();
        ctx.textAlign = 'left'; ctx.font = '600 12px sans-serif';
        ctx.fillStyle = P.navy; ctx.fillText('● 物（見える向き）', 10, 18);
        ctx.fillStyle = P.coral; ctx.fillText('● 担い手（半分の速さ）', 10, 36);
        if (Math.abs(ang - 360) < 40) { ctx.fillStyle = P.coral; ctx.font = '600 13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('担い手は真後ろ ＝ −1', cx, cy + R + 22); }
    }

    // ② 糸でつながれた球（ディラック）: 中央の球を回すと周囲の固定枠との糸がねじれる。
    function drawBall(ctx, W, H) {
        const bc = [W / 2, H * 0.46], r = Math.min(W, H) * 0.12, rad = ang * Math.PI / 180;
        const anchors = [[W * 0.13, H * 0.14], [W * 0.87, H * 0.14], [W * 0.87, H * 0.84], [W * 0.13, H * 0.84]];
        anchors.forEach((an, i) => {
            const bi = (i * 90 + 45) * Math.PI / 180 + rad;
            const ex = bc[0] + r * Math.sin(bi), ey = bc[1] - r * Math.cos(bi);
            const mx = (an[0] + ex) / 2, my = (an[1] + ey) / 2, dx = ex - an[0], dy = ey - an[1], L = Math.hypot(dx, dy) || 1;
            const bow = (ang / 720) * Math.min(W, H) * 0.24;
            const px = mx + (-dy / L) * bow, py = my + (dx / L) * bow;
            ctx.strokeStyle = P.coral; ctx.globalAlpha = 0.8; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(an[0], an[1]); ctx.quadraticCurveTo(px, py, ex, ey); ctx.stroke(); ctx.globalAlpha = 1;
            ctx.fillStyle = P.mute; ctx.beginPath(); ctx.arc(an[0], an[1], 3.5, 0, 7); ctx.fill();
        });
        ctx.fillStyle = P.navy; ctx.beginPath(); ctx.arc(bc[0], bc[1], r, 0, 7); ctx.fill();
        ctx.fillStyle = P.gold; ctx.beginPath(); ctx.arc(bc[0] + r * Math.sin(rad), bc[1] - r * Math.cos(rad), 4.5, 0, 7); ctx.fill();
        ctx.fillStyle = P.mute; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('中央の球を回す（まわりの枠は固定）', W / 2, H * 0.97);
    }

    // ③ ベルト: 回るカードと固定端を1本の帯でつなぐ。回すほど帯がねじれる（面の色で表裏）。
    function drawBelt(ctx, W, H) {
        const bx = W / 2, cs = Math.min(W, H) * 0.11, rad = ang * Math.PI / 180;
        ctx.save(); ctx.translate(bx, H * 0.16); ctx.rotate(rad);
        ctx.fillStyle = P.navy; ctx.globalAlpha = 0.9; ctx.fillRect(-cs, -cs * 0.6, cs * 2, cs * 1.2); ctx.globalAlpha = 1;
        ctx.strokeStyle = P.gold; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(0, cs * 0.4); ctx.lineTo(0, -cs * 0.4); ctx.lineTo(-cs * 0.22, -cs * 0.12);
        ctx.moveTo(0, -cs * 0.4); ctx.lineTo(cs * 0.22, -cs * 0.12); ctx.stroke();
        ctx.restore();
        const y0 = H * 0.3, y1 = H * 0.94, hw = cs * 1.0, N = 64;
        for (let i = 0; i < N; i++) {
            const u0 = i / N, u1 = (i + 1) / N, p0 = rad * u0, p1 = rad * u1;
            const yy0 = y0 + (y1 - y0) * u0, yy1 = y0 + (y1 - y0) * u1;
            ctx.beginPath();
            ctx.moveTo(bx + hw * Math.cos(p0), yy0);
            ctx.lineTo(bx + hw * Math.cos(p1), yy1);
            ctx.lineTo(bx - hw * Math.cos(p1), yy1);
            ctx.lineTo(bx - hw * Math.cos(p0), yy0);
            ctx.closePath();
            ctx.fillStyle = Math.cos((p0 + p1) / 2) >= 0 ? P.navy : P.coral;
            ctx.globalAlpha = 0.82; ctx.fill(); ctx.globalAlpha = 1;
        }
        ctx.fillStyle = P.mute; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('固定端（動かさない）', bx, y1 + 12);
    }

    const notes = {
        hands: '担い手は物の半分の速さで回ります。だから物が一周しても担い手は半周（真後ろ＝−1）、二周でようやく戻ります（+1）。',
        ball: '一周では糸が絡んで、そのままではほどけません。二周させると、球を回さず糸だけを動かしてほどけます（機械検証済みの ±1）。',
        belt: '一周ぶんの帯のねじれは、そのままでは取れません。二周ぶんにすると、帯をカードの上に通して解けます（ディラックのベルトトリック）。',
    };

    function draw() {
        const { ctx, W, H } = view;
        ctx.clearRect(0, 0, W, H);
        if (mode === 'hands') drawHands(ctx, W, H);
        else if (mode === 'ball') drawBall(ctx, W, H);
        else drawBelt(ctx, W, H);
        const at360 = Math.abs(ang - 360) < 2, at720 = Math.abs(ang - 720) < 2;
        let head;
        if (at720) head = '<b>720°（二周）：担い手も戻った ＝ +1。本当に閉じました。</b>';
        else if (at360) head = '<b>360°（一周）：物は戻ったのに、担い手は真後ろ ＝ −1。</b>閉じたようで、閉じていません。';
        else head = '回転 <b>' + Math.round(ang) + '°</b>（物は ' + (ang / 360).toFixed(2) + ' 周）／担い手は <b>' + Math.round(ang / 2) + '°</b>。';
        st.innerHTML = head + ' <span class="mw-note">' + notes[mode] + '</span>';
    }
    view.canvas.setAttribute('aria-label', '担い手は半分の速さで回るため、360°では真後ろ(−1)、720°で戻る(+1)二重被覆。裏の針・糸の球・ベルトの3通りで見る。');
    view.onResize = draw;
    markMode();
    draw();
}

// ============================================================
// 4) 零因子（§4「つむじと零因子」）
//    ℂ・ℍ・𝕆 では |x·y| = |x|·|y|（非ゼロ×非ゼロは絶対にゼロにならない＝割れる）。
//    𝕊(16元数)では、二つとも非ゼロなのに積がゼロになる（割り戻せない）。
//    零因子ペア (e1+e10)(e5+e14)=0 は node で機械検証済み（自規約）。
// ============================================================
const _conj = x => x.map((v, i) => (i === 0 ? v : -v));
function cdMul(x, y) {
    const n = x.length;
    if (n === 1) return [x[0] * y[0]];
    const h = n / 2;
    const a = x.slice(0, h), b = x.slice(h), c = y.slice(0, h), d = y.slice(h);
    const add = (p, q) => p.map((v, i) => v + q[i]);
    const sub = (p, q) => p.map((v, i) => v - q[i]);
    return sub(cdMul(a, c), cdMul(_conj(d), b)).concat(add(cdMul(d, a), cdMul(b, _conj(c))));
}
const _norm = x => Math.sqrt(x.reduce((s, v) => s + v * v, 0));
function basisSum(dim, ...ks) { const v = Array(dim).fill(0); ks.forEach(k => (v[k] = 1)); return v; }

function mountZeroDivisor(host) {
    const P = PAL();
    const worlds = {
        'ℂ (2)': { dim: 2, x: basisSum(2, 1), y0: basisSum(2, 0), y1: basisSum(2, 1) },
        'ℍ (4)': { dim: 4, x: basisSum(4, 1, 2), y0: basisSum(4, 0, 3), y1: basisSum(4, 2, 3) },
        '𝕆 (8)': { dim: 8, x: basisSum(8, 1, 4), y0: basisSum(8, 2, 5), y1: basisSum(8, 3, 6) },
        '𝕊 (16)': { dim: 16, x: basisSum(16, 1, 10), y0: basisSum(16, 2, 7), y1: basisSum(16, 5, 14) },
    };
    let key = 'ℍ (4)', t = 0;
    // DOM 構築順: world ボタン → canvas → スライダー → status
    const wrow = controls(host);
    const view = makeCanvas(host, 0.5);
    const row = controls(host);
    const st = status(host);
    const wbtns = {};
    Object.keys(worlds).forEach(k => { wbtns[k] = button(wrow, k, () => { key = k; t = 0; sl.value = 0; markWorld(); draw(); }); });
    const sl = slider(row, { label: '二人の向きを近づける', min: 0, max: 100, value: 0, onInput: v => { t = v / 100; draw(); } });
    button(row, 'リセット', () => { t = 0; sl.value = 0; draw(); });
    function markWorld() { Object.entries(wbtns).forEach(([k, b]) => b.classList.toggle('is-on', k === key)); }

    function ratioAt(w, tt) {
        const y = w.y0.map((v, i) => (1 - tt) * v + tt * w.y1[i]);
        const ny = _norm(y);
        if (ny < 1e-9) return 0;
        return _norm(cdMul(w.x, y)) / (_norm(w.x) * ny);
    }
    function draw() {
        const w = worlds[key];
        const { ctx, W, H } = view;
        ctx.clearRect(0, 0, W, H);
        const r = ratioAt(w, t);
        // メーター（|x·y| ÷ |x||y|）
        const mx = W * 0.12, mw = W * 0.76, my = H * 0.30, mh = 20;
        ctx.fillStyle = P.faint; ctx.fillRect(mx, my, mw, mh);
        ctx.fillStyle = r < 0.02 ? P.coral : P.navy;
        ctx.fillRect(mx, my, mw * Math.max(0, Math.min(1, r)), mh);
        ctx.strokeStyle = P.line; ctx.strokeRect(mx, my, mw, mh);
        ctx.fillStyle = P.mid; ctx.font = '12px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText('|x·y| ÷ (|x|·|y|)', mx, my - 8);
        ctx.textAlign = 'right'; ctx.fillText(r.toFixed(2), mx + mw, my - 8);
        // 二人のドット
        const py = H * 0.7, ax = W * 0.3, bx = W * 0.7, rr = 13;
        ctx.fillStyle = P.navy; ctx.beginPath(); ctx.arc(ax, py, rr, 0, 7); ctx.fill();
        ctx.fillStyle = P.gold; ctx.beginPath(); ctx.arc(bx, py, rr, 0, 7); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = '600 13px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('x', ax, py); ctx.fillText('y', bx, py); ctx.textBaseline = 'alphabetic';
        ctx.strokeStyle = r < 0.02 ? P.coral : P.mute; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ax + rr, py); ctx.lineTo(bx - rr, py); ctx.stroke();
        ctx.fillStyle = P.mid; ctx.font = '12px sans-serif';
        ctx.fillText('x・y とも非ゼロ（|x|=' + _norm(w.x).toFixed(2) + '、|y|>0）', W * 0.5, py + 32);

        const composition = w.dim <= 8;
        if (composition) {
            st.innerHTML = '<b>' + key + '</b>：向きをどう近づけても、比は <b>1.00 のまま</b>。'
                + '非ゼロ×非ゼロは<b>絶対にゼロになりません</b>——だから割り戻せます（割れる世界）。';
        } else if (r < 0.02) {
            st.innerHTML = '<b>' + key + '</b>：二人とも非ゼロなのに、積が <b>ゼロ</b>になりました。'
                + '結果のゼロからは元を割り戻せません——<b>零因子</b>（割れない世界）。';
        } else {
            st.innerHTML = '<b>' + key + '</b>：向きを近づけると比が下がっていきます。'
                + 'スライダーを右端まで動かすと…（8 を超えた数の世界だけで起きます）';
        }
    }
    markWorld();
    view.canvas.setAttribute('aria-label', 'ℂ・ℍ・𝕆 では非ゼロの積はゼロにならないが、16元数では零因子が現れる。');
    view.onResize = draw;
    draw();
}

// ---- ディスパッチ ----
const MOUNTS = {
    'complex-rotation': mountComplexRotation,
    'quaternion-order': mountQuaternionOrder,
    'double-cover': mountDoubleCover,
    'zero-divisor': mountZeroDivisor,
};
function init() {
    document.querySelectorAll('[data-microworld]').forEach(host => {
        const kind = host.getAttribute('data-microworld');
        const mount = MOUNTS[kind];
        if (!mount) return;
        try {
            host.classList.add('mw-ready');
            mount(host);
        } catch (err) {
            console.warn('micro-world mount failed:', kind, err);
        }
    });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
