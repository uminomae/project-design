import { renderMarkdown } from '../lib/render-markdown.js';

function renderAbout(aboutBody, markdown) {
    aboutBody.innerHTML = renderMarkdown(markdown);

    for (const child of aboutBody.children) {
        child.classList.add('reveal-item');
    }
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

export function createContentLoader({
    aboutBody,
    knowledgeBody,
    knowledgeEntries,
    knowledgePdfLink,
    translate,
}) {
    const aboutCache = new Map();
    const knowledgeCache = new Map();
    let activeRequestId = 0;

    function beginRequest() {
        activeRequestId += 1;
        return activeRequestId;
    }

    function isLatestRequest(requestId) {
        return requestId === activeRequestId;
    }

    function hasKnowledgeEntry(key) {
        return Boolean(knowledgeEntries[key]);
    }

    function updateKnowledgePdfLink(entry, lang) {
        if (entry.pdfUrl) {
            knowledgePdfLink.href = entry.pdfUrl;
            knowledgePdfLink.setAttribute('aria-disabled', 'false');
            knowledgePdfLink.textContent = translate('knowledge.pdf.open', lang);
            return;
        }

        knowledgePdfLink.href = '#';
        knowledgePdfLink.setAttribute('aria-disabled', 'true');
        knowledgePdfLink.textContent = translate('knowledge.pdf.pending', lang);
    }

    async function loadAboutContent(lang) {
        const requestId = beginRequest();
        const cached = aboutCache.get(lang);

        if (cached !== undefined) {
            if (!isLatestRequest(requestId)) return false;
            renderAbout(aboutBody, cached);
            return true;
        }

        const markdown = await fetchTextWithFallback(`content/about-${lang}.md`);
        aboutCache.set(lang, markdown);
        if (!isLatestRequest(requestId)) return false;
        renderAbout(aboutBody, markdown);
        return true;
    }

    async function loadKnowledgeContent(key, lang) {
        const requestId = beginRequest();
        const entry = knowledgeEntries[key];

        if (!entry) {
            return false;
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

        if (!isLatestRequest(requestId)) return false;
        knowledgeBody.innerHTML = renderMarkdown(markdown);
        updateKnowledgePdfLink(entry, lang);
        return true;
    }

    return {
        hasKnowledgeEntry,
        loadAboutContent,
        loadKnowledgeContent,
    };
}
