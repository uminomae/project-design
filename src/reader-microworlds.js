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

// ============================================================
// 4) ファノ平面のホーム三つ組（§4）
//    7点・7線。どの点を選んでも、その点が入る線（ホーム三つ組）はちょうど3本。
//    e₇（中心）も特別扱いでないことを、触って確かめられる。
// ============================================================
function mountFanoHome(host) {
    const P = PAL();
    const view = makeCanvas(host, 0.69);
    const row = controls(host);
    const st = status(host);

    // 正本 MD の静的 SVG（viewBox 680×470 相当）と同じ配置
    const PTS = [
        [340, 70], [245, 235], [150, 400], [435, 235], [530, 400], [340, 400], [340, 290],
    ]; // e1..e7（index 0..6）
    const LINES = [
        { m: [0, 1, 2] },                  // e1-e2-e3（左辺）
        { m: [0, 3, 4] },                  // e1-e4-e5（右辺）
        { m: [2, 5, 4] },                  // e3-e6-e5（下辺）
        { m: [1, 3, 5], circle: true },    // e2-e4-e6（内接円）
        { m: [0, 6, 5] },                  // e1-e7-e6（中線）
        { m: [2, 6, 3] },                  // e3-e7-e4（中線）
        { m: [1, 6, 4] },                  // e2-e7-e5（中線）
    ];
    const SUB = ['e₁', 'e₂', 'e₃', 'e₄', 'e₅', 'e₆', 'e₇'];
    let sel = -1; // 選択中の点（-1 = なし）

    button(row, '次の点へ', () => { sel = (sel + 1) % 7; draw(); });
    button(row, '選択解除', () => { sel = -1; draw(); });

    function xy(i) {
        const s = view.W / 680;
        return [PTS[i][0] * s, PTS[i][1] * s];
    }
    function homesOf(i) {
        return LINES.filter(L => L.m.includes(i));
    }
    function strokeLine(ctx, L, color, width) {
        ctx.strokeStyle = color; ctx.lineWidth = width;
        const s = view.W / 680;
        if (L.circle) {
            ctx.beginPath(); ctx.arc(340 * s, 290 * s, 110 * s, 0, Math.PI * 2); ctx.stroke();
        } else {
            const ends = [L.m[0], L.m[L.m.length - 1]];
            const [x1, y1] = xy(ends[0]), [x2, y2] = xy(ends[1]);
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
    }
    function draw() {
        const { ctx, W, H } = view;
        ctx.clearRect(0, 0, W, H);
        const homes = sel >= 0 ? homesOf(sel) : [];
        const hi = [P.navy, P.gold, P.coral];
        // 非選択の線は薄く、選択点のホーム3線は色つきで
        LINES.forEach(L => { if (!homes.includes(L)) strokeLine(ctx, L, sel >= 0 ? P.faint : P.line, 1.2); });
        homes.forEach((L, k) => strokeLine(ctx, L, hi[k], 2.8));
        // 点
        const s = W / 680;
        const r = Math.max(10, 15 * s);
        for (let i = 0; i < 7; i++) {
            const [x, y] = xy(i);
            const isSel = i === sel;
            const inHome = homes.some(L => L.m.includes(i));
            ctx.beginPath(); ctx.arc(x, y, isSel ? r * 1.25 : r, 0, Math.PI * 2);
            ctx.fillStyle = isSel ? P.navy : '#fff';
            ctx.globalAlpha = isSel ? 1 : (sel >= 0 && !inHome ? 0.45 : 1);
            ctx.fill();
            ctx.strokeStyle = isSel ? P.navy : P.mid; ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = isSel ? '#fff' : P.ink;
            ctx.font = '13px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(SUB[i], x, y + 1);
            ctx.globalAlpha = 1;
        }
        if (sel < 0) {
            st.innerHTML = '点に触れる（タップ）か「次の点へ」で、一人を選んでください。その人が入る<b>3つの三つ組</b>が光ります。';
        } else {
            const partners = homesOf(sel).map(L => '(' + L.m.filter(i => i !== sel).sort((a, b) => a - b).map(i => SUB[i]).join(',') + ')').join('・');
            st.innerHTML = '<b>' + SUB[sel] + '</b> のホーム三つ組は ' + partners + ' — <b>ちょうど3つ</b>。'
                + (sel === 6 ? ' 中心の e₇ も、他の点と同じ扱いです。' : ' どの点を選んでも、必ず3つです。');
        }
    }
    function pick(ev) {
        const rect = view.canvas.getBoundingClientRect();
        const px = ev.clientX - rect.left, py = ev.clientY - rect.top;
        const s = view.W / 680;
        const hitR = Math.max(18, 22 * s);
        for (let i = 0; i < 7; i++) {
            const [x, y] = xy(i);
            if ((px - x) ** 2 + (py - y) ** 2 <= hitR * hitR) return i;
        }
        return -1;
    }
    view.canvas.addEventListener('pointermove', ev => {
        const i = pick(ev);
        view.canvas.style.cursor = i >= 0 ? 'pointer' : 'default';
        if (i >= 0 && i !== sel) { sel = i; draw(); }
    });
    view.canvas.addEventListener('pointerdown', ev => {
        const i = pick(ev);
        if (i !== sel) { sel = i; draw(); }
    });
    view.canvas.setAttribute('aria-label', 'ファノ平面。どの点もちょうど3本の線に入っている。点を選ぶとその3本が強調される。');
    view.onResize = draw;
    draw();
}

// ---- ディスパッチ ----
const MOUNTS = {
    'complex-rotation': mountComplexRotation,
    'quaternion-order': mountQuaternionOrder,
    'zero-divisor': mountZeroDivisor,
    'fano-home': mountFanoHome,
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
