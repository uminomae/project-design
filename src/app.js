import './shaders/main.js';

const aboutCache = {};

const menu = document.getElementById('site-menu');
const menuToggle = document.querySelector('[data-menu-toggle]');
const aboutModal = document.getElementById('about-modal');
const aboutBody = document.getElementById('about-body');
const langButtons = Array.from(document.querySelectorAll('[data-lang-button]'));

function closeMenu() {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
}

function renderMarkdown(md) {
    return md
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^---$/gm, '<hr>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/\n{2,}/g, '</p><p>')
        .replace(/^(?!<h[12]|<hr|<p)/, '<p>')
        .replace(/$/, '</p>')
        .replace(/<p><(h[12]|hr)>/g, '<$1>')
        .replace(/<\/(h[12])><\/p>/g, '</$1>')
        .replace(/<hr><\/p>/g, '<hr>')
        .replace(/<p>\s*<\/p>/g, '');
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
}

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

    if (menu.classList.contains('open') && !target.closest('#site-menu')) {
        closeMenu();
    }
}

function handlePopState() {
    const hasAbout = new URLSearchParams(window.location.search).has('about');

    if (hasAbout) {
        if (!aboutModal.classList.contains('open')) {
            openAbout({ pushHistory: false });
        }
        return;
    }

    closeAbout({ updateHistory: false });
}

async function init() {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAbout();
        }
    });
    window.addEventListener('popstate', handlePopState);

    await switchLang(getCurrentLang());

    if (new URLSearchParams(window.location.search).has('about')) {
        history.replaceState({ modal: 'about' }, '', window.location.href);
        await openAbout({ pushHistory: false });
    }

    if (new URLSearchParams(window.location.search).has('dev')) {
        await import('./dev-panel.js');
    }
}

init();
