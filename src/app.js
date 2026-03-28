import './shaders/main.js';

const aboutCache = {};
const knowledgeCache = {};

const menu = document.getElementById('site-menu');
const menuToggle = document.querySelector('[data-menu-toggle]');
const aboutModal = document.getElementById('about-modal');
const aboutBody = document.getElementById('about-body');
const knowledgeModal = document.getElementById('knowledge-modal');
const knowledgeBody = document.getElementById('knowledge-body');
const knowledgePdfLink = document.getElementById('knowledge-pdf-link');
const langButtons = Array.from(document.querySelectorAll('[data-lang-button]'));

const KNOWLEDGE_ENTRIES = {
    'design-thinking': {
        md: 'content/knowledge/design-thinking-{lang}.md',
        pdf: 'https://raw.githubusercontent.com/uminomae/pjdhiro/main/assets/project-design/knowledge/ja/pdf/design-thinking.pdf',
        title: { ja: 'デザイン思考とは', en: 'What is Design Thinking?' },
    },
};

let activeKnowledgeKey = null;

function closeMenu() {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
}

function renderMarkdown(md) {
    let html = md
        .replace(/^---$/gm, '<hr>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Tables
    html = html.replace(/(?:^|\n)((?:\|.+\|\n)+)/g, (match, tableBlock) => {
        const rows = tableBlock.trim().split('\n');
        if (rows.length < 2) return match;

        const parseRow = (row) =>
            row.split('|').slice(1, -1).map(cell => cell.trim());

        const headerCells = parseRow(rows[0]);
        // Skip separator row (row[1])
        const bodyRows = rows.slice(2);

        let table = '<table><thead><tr>';
        for (const cell of headerCells) {
            table += `<th>${cell}</th>`;
        }
        table += '</tr></thead><tbody>';
        for (const row of bodyRows) {
            const cells = parseRow(row);
            table += '<tr>';
            for (const cell of cells) {
                table += `<td>${cell}</td>`;
            }
            table += '</tr>';
        }
        table += '</tbody></table>';
        return table;
    });

    // Ordered lists
    html = html.replace(/(?:^|\n)((?:\d+\. .+\n?)+)/g, (match, listBlock) => {
        const items = listBlock.trim().split('\n');
        let list = '<ol>';
        for (const item of items) {
            list += `<li>${item.replace(/^\d+\.\s*/, '')}</li>`;
        }
        list += '</ol>';
        return list;
    });

    // Unordered lists
    html = html.replace(/(?:^|\n)((?:- .+\n?)+)/g, (match, listBlock) => {
        const items = listBlock.trim().split('\n');
        let list = '<ul>';
        for (const item of items) {
            list += `<li>${item.replace(/^-\s*/, '')}</li>`;
        }
        list += '</ul>';
        return list;
    });

    // Paragraphs: lines not starting with HTML tags
    html = html
        .split('\n')
        .map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            if (/^<(h[1-3]|hr|table|thead|tbody|tr|th|td|ol|ul|li|\/|p)/.test(trimmed)) return trimmed;
            return `<p>${trimmed}</p>`;
        })
        .join('\n')
        .replace(/<p>\s*<\/p>/g, '');

    return html;
}

function renderAbout(md) {
    aboutBody.innerHTML = renderMarkdown(md);
}

async function loadAboutContent(lang) {
    const cached = aboutCache[lang];
    if (cached !== undefined) {
        renderAbout(cached);
        return;
    }

    try {
        const response = await fetch(`content/about-${lang}.md`);
        const markdown = response.ok ? await response.text() : '';
        aboutCache[lang] = markdown;
        renderAbout(markdown);
    } catch {
        aboutCache[lang] = '';
        renderAbout('');
    }
}

function getCurrentLang() {
    return document.documentElement.lang || 'ja';
}

async function switchLang(lang) {
    document.documentElement.lang = lang;

    for (const button of langButtons) {
        button.classList.toggle('active', button.dataset.langButton === lang);
    }

    const key = `data-${lang}`;
    for (const element of document.querySelectorAll('[data-ja][data-en]')) {
        const value = element.getAttribute(key);
        if (value !== null) {
            element.innerHTML = value;
        }
    }

    if (aboutModal.classList.contains('open')) {
        await loadAboutContent(lang);
    }

    if (knowledgeModal.classList.contains('open') && activeKnowledgeKey) {
        await loadKnowledgeContent(activeKnowledgeKey, lang);
    }
}

// --- About modal ---

async function openAbout({ pushHistory = true } = {}) {
    await loadAboutContent(getCurrentLang());
    aboutModal.classList.add('open');
    aboutModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (pushHistory && !new URLSearchParams(window.location.search).has('about')) {
        const url = new URL(window.location.href);
        url.searchParams.set('about', '');
        history.pushState({ modal: 'about' }, '', url.toString());
    }
}

function closeAbout({ updateHistory = true } = {}) {
    if (!aboutModal.classList.contains('open')) {
        return;
    }

    aboutModal.classList.remove('open');
    aboutModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (!updateHistory) {
        return;
    }

    if (new URLSearchParams(window.location.search).has('about')) {
        if (history.state && history.state.modal === 'about') {
            history.back();
            return;
        }

        const url = new URL(window.location.href);
        url.searchParams.delete('about');
        history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    }
}

// --- Knowledge modal ---

async function loadKnowledgeContent(key, lang) {
    const entry = KNOWLEDGE_ENTRIES[key];
    if (!entry) return;

    const cacheKey = `${key}-${lang}`;
    let markdown = knowledgeCache[cacheKey];

    if (markdown === undefined) {
        try {
            const mdPath = entry.md.replace('{lang}', lang);
            const response = await fetch(mdPath);
            markdown = response.ok ? await response.text() : '';
            // Fallback to ja if lang file not found
            if (!markdown && lang !== 'ja') {
                const fallback = await fetch(entry.md.replace('{lang}', 'ja'));
                markdown = fallback.ok ? await fallback.text() : '';
            }
        } catch {
            markdown = '';
        }
        knowledgeCache[cacheKey] = markdown;
    }

    knowledgeBody.innerHTML = renderMarkdown(markdown);

    // PDF link
    if (entry.pdf) {
        knowledgePdfLink.href = entry.pdf;
        knowledgePdfLink.setAttribute('aria-disabled', 'false');
        const pdfLabel = lang === 'en' ? 'Open PDF' : 'PDFで読む';
        knowledgePdfLink.textContent = pdfLabel;
    } else {
        knowledgePdfLink.href = '#';
        knowledgePdfLink.setAttribute('aria-disabled', 'true');
        const pendingLabel = lang === 'en' ? 'PDF pending' : 'PDF準備中';
        knowledgePdfLink.textContent = pendingLabel;
    }
}

async function openKnowledge(key, { pushHistory = true } = {}) {
    activeKnowledgeKey = key;
    await loadKnowledgeContent(key, getCurrentLang());
    knowledgeModal.classList.add('open');
    knowledgeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (pushHistory) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('knowledge') !== key) {
            const url = new URL(window.location.href);
            url.searchParams.set('knowledge', key);
            history.pushState({ modal: 'knowledge', key }, '', url.toString());
        }
    }
}

function closeKnowledge({ updateHistory = true } = {}) {
    if (!knowledgeModal.classList.contains('open')) {
        return;
    }

    knowledgeModal.classList.remove('open');
    knowledgeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeKnowledgeKey = null;

    if (!updateHistory) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.has('knowledge')) {
        if (history.state && history.state.modal === 'knowledge') {
            history.back();
            return;
        }

        const url = new URL(window.location.href);
        url.searchParams.delete('knowledge');
        history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    }
}

// --- Event handling ---

function handleDocumentClick(event) {
    const target = event.target;

    if (target.closest('[data-menu-toggle]')) {
        toggleMenu();
        return;
    }

    const langButton = target.closest('[data-lang-button]');
    if (langButton) {
        switchLang(langButton.dataset.langButton);
        return;
    }

    if (target.closest('[data-about-open]')) {
        openAbout();
        return;
    }

    if (target.closest('[data-about-close]')) {
        closeAbout();
        return;
    }

    if (target.closest('[data-knowledge-close]')) {
        closeKnowledge();
        return;
    }

    const knowledgeLink = target.closest('[data-knowledge]');
    if (knowledgeLink) {
        event.preventDefault();
        closeMenu();
        openKnowledge(knowledgeLink.dataset.knowledge);
        return;
    }

    if (menu.classList.contains('open') && !target.closest('#site-menu')) {
        closeMenu();
    }
}

function handlePopState() {
    const params = new URLSearchParams(window.location.search);

    // About
    const hasAbout = params.has('about');
    if (hasAbout) {
        if (!aboutModal.classList.contains('open')) {
            openAbout({ pushHistory: false });
        }
    } else {
        closeAbout({ updateHistory: false });
    }

    // Knowledge
    const knowledgeKey = params.get('knowledge');
    if (knowledgeKey && KNOWLEDGE_ENTRIES[knowledgeKey]) {
        if (!knowledgeModal.classList.contains('open') || activeKnowledgeKey !== knowledgeKey) {
            openKnowledge(knowledgeKey, { pushHistory: false });
        }
    } else {
        closeKnowledge({ updateHistory: false });
    }
}

async function init() {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeKnowledge();
            closeAbout();
        }
    });
    window.addEventListener('popstate', handlePopState);

    await switchLang(getCurrentLang());

    const params = new URLSearchParams(window.location.search);

    if (params.has('about')) {
        history.replaceState({ modal: 'about' }, '', window.location.href);
        await openAbout({ pushHistory: false });
    }

    const knowledgeKey = params.get('knowledge');
    if (knowledgeKey && KNOWLEDGE_ENTRIES[knowledgeKey]) {
        history.replaceState({ modal: 'knowledge', key: knowledgeKey }, '', window.location.href);
        await openKnowledge(knowledgeKey, { pushHistory: false });
    }

    if (params.has('dev')) {
        await import('./dev-panel.js');
    }
}

init();
