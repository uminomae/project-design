import { loadRandomShader } from './bootstrap/shaders.js';
import { KNOWLEDGE_ENTRIES, MENU_ITEMS, SHADER_PATHS, TRANSLATIONS } from './content/site-data.mjs';
import { renderMarkdown } from './lib/render-markdown.js';
import { getSearchParams, updateSearchParams } from './lib/query-state.js';
import { createI18n } from './ui/i18n.js';
import { createMenuController, renderSiteMenu } from './ui/menu.js';
import { createModalController } from './ui/modal.js';

await loadRandomShader(SHADER_PATHS, import.meta.url);

const aboutCache = new Map();
const knowledgeCache = new Map();

const menuElement = document.getElementById('site-menu');
const menuToggle = document.querySelector('[data-menu-toggle]');
const aboutModalElement = document.getElementById('about-modal');
const aboutBody = document.getElementById('about-body');
const knowledgeModalElement = document.getElementById('knowledge-modal');
const knowledgeBody = document.getElementById('knowledge-body');
const knowledgePdfLink = document.getElementById('knowledge-pdf-link');
const langButtons = Array.from(document.querySelectorAll('[data-lang-button]'));

const menuController = createMenuController({
    menuElement,
    toggleButton: menuToggle,
});

const aboutModal = createModalController(aboutModalElement);
const knowledgeModal = createModalController(knowledgeModalElement);

let activeKnowledgeKey = null;

const i18n = createI18n({
    langButtons,
    translations: TRANSLATIONS,
    onLanguageChange: async (lang) => {
        if (aboutModal.isOpen()) {
            await loadAboutContent(lang);
        }

        if (knowledgeModal.isOpen() && activeKnowledgeKey) {
            await loadKnowledgeContent(activeKnowledgeKey, lang);
        }
    },
});

renderSiteMenu({
    menuElement,
    items: MENU_ITEMS,
    knowledgeEntries: KNOWLEDGE_ENTRIES,
    translate: i18n.translate,
    lang: i18n.getCurrentLang(),
});
i18n.applyTranslations(menuElement, i18n.getCurrentLang());

function renderAbout(markdown) {
    aboutBody.innerHTML = renderMarkdown(markdown);
}

async function fetchTextWithFallback(path, fallbackPath) {
    try {
        const response = await fetch(path);
        const text = response.ok ? await response.text() : '';
        if (text || !fallbackPath) {
            return text;
        }

        const fallbackResponse = await fetch(fallbackPath);
        return fallbackResponse.ok ? await fallbackResponse.text() : '';
    } catch {
        return '';
    }
}

async function loadAboutContent(lang) {
    const cached = aboutCache.get(lang);
    if (cached !== undefined) {
        renderAbout(cached);
        return;
    }

    const markdown = await fetchTextWithFallback(`content/about-${lang}.md`);
    aboutCache.set(lang, markdown);
    renderAbout(markdown);
}

function updateKnowledgePdfLink(entry, lang) {
    if (entry.pdfUrl) {
        knowledgePdfLink.href = entry.pdfUrl;
        knowledgePdfLink.setAttribute('aria-disabled', 'false');
        knowledgePdfLink.textContent = i18n.translate('knowledge.pdf.open', lang);
        return;
    }

    knowledgePdfLink.href = '#';
    knowledgePdfLink.setAttribute('aria-disabled', 'true');
    knowledgePdfLink.textContent = i18n.translate('knowledge.pdf.pending', lang);
}

async function loadKnowledgeContent(key, lang) {
    const entry = KNOWLEDGE_ENTRIES[key];
    if (!entry) {
        return;
    }

    const cacheKey = `${key}:${lang}`;
    let markdown = knowledgeCache.get(cacheKey);

    if (markdown === undefined) {
        const mdPath = entry.mdPath.replace('{lang}', lang);
        const fallbackPath = lang === 'ja'
            ? undefined
            : entry.mdPath.replace('{lang}', 'ja');
        markdown = await fetchTextWithFallback(mdPath, fallbackPath);
        knowledgeCache.set(cacheKey, markdown);
    }

    knowledgeBody.innerHTML = renderMarkdown(markdown);
    updateKnowledgePdfLink(entry, lang);
}

async function openAbout({ pushHistory = true } = {}) {
    await loadAboutContent(i18n.getCurrentLang());
    knowledgeModal.close();
    activeKnowledgeKey = null;
    aboutModal.open();

    if (pushHistory && !getSearchParams().has('about')) {
        updateSearchParams(
            { about: '', knowledge: null },
            { state: { modal: 'about' } },
        );
    }
}

function closeAbout({ updateHistory = true } = {}) {
    if (!aboutModal.isOpen()) {
        return;
    }

    aboutModal.close();

    if (!updateHistory) {
        return;
    }

    if (getSearchParams().has('about')) {
        if (history.state?.modal === 'about') {
            history.back();
            return;
        }

        updateSearchParams({ about: null }, { replace: true });
    }
}

async function openKnowledge(key, { pushHistory = true } = {}) {
    if (!KNOWLEDGE_ENTRIES[key]) {
        return;
    }

    activeKnowledgeKey = key;
    await loadKnowledgeContent(key, i18n.getCurrentLang());
    aboutModal.close();
    knowledgeModal.open();

    if (pushHistory && getSearchParams().get('knowledge') !== key) {
        updateSearchParams(
            { knowledge: key, about: null },
            { state: { modal: 'knowledge', key } },
        );
    }
}

function closeKnowledge({ updateHistory = true } = {}) {
    if (!knowledgeModal.isOpen()) {
        return;
    }

    knowledgeModal.close();
    activeKnowledgeKey = null;

    if (!updateHistory) {
        return;
    }

    if (getSearchParams().has('knowledge')) {
        if (history.state?.modal === 'knowledge') {
            history.back();
            return;
        }

        updateSearchParams({ knowledge: null }, { replace: true });
    }
}

function handleDocumentClick(event) {
    const target = event.target;

    if (target.closest('[data-menu-toggle]')) {
        menuController.toggle();
        return;
    }

    const langButton = target.closest('[data-lang-button]');
    if (langButton) {
        i18n.switchLang(langButton.dataset.langButton);
        return;
    }

    const openTrigger = target.closest('[data-modal-open]');
    if (openTrigger?.dataset.modalOpen === 'about') {
        openAbout();
        return;
    }

    const closeTrigger = target.closest('[data-modal-close]');
    if (closeTrigger?.dataset.modalClose === 'about') {
        closeAbout();
        return;
    }

    if (closeTrigger?.dataset.modalClose === 'knowledge') {
        closeKnowledge();
        return;
    }

    const knowledgeLink = target.closest('[data-knowledge]');
    if (knowledgeLink) {
        event.preventDefault();
        menuController.close();
        openKnowledge(knowledgeLink.dataset.knowledge);
        return;
    }

    if (menuController.isOpen() && !target.closest('#site-menu')) {
        menuController.close();
    }
}

function handlePopState() {
    const params = getSearchParams();

    if (params.has('about')) {
        if (!aboutModal.isOpen()) {
            openAbout({ pushHistory: false });
        }
    } else {
        closeAbout({ updateHistory: false });
    }

    const knowledgeKey = params.get('knowledge');
    if (knowledgeKey && KNOWLEDGE_ENTRIES[knowledgeKey]) {
        if (!knowledgeModal.isOpen() || activeKnowledgeKey !== knowledgeKey) {
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

    await i18n.switchLang(i18n.getCurrentLang());

    const params = getSearchParams();

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
