export function createI18n({ langButtons, translations, onLanguageChange }) {
    function getCurrentLang() {
        return document.documentElement.lang || 'ja';
    }

    function translate(key, lang = getCurrentLang()) {
        return translations[lang]?.[key] ?? translations.ja?.[key] ?? '';
    }

    function applyTranslations(root = document, lang = getCurrentLang()) {
        for (const element of root.querySelectorAll('[data-i18n-key]')) {
            element.innerHTML = translate(element.dataset.i18nKey, lang);
        }

        for (const element of root.querySelectorAll('[data-i18n-aria-label-key]')) {
            element.setAttribute('aria-label', translate(element.dataset.i18nAriaLabelKey, lang));
        }
    }

    async function switchLang(lang) {
        document.documentElement.lang = lang;

        for (const button of langButtons) {
            button.classList.toggle('active', button.dataset.langButton === lang);
        }

        applyTranslations(document, lang);

        if (onLanguageChange) {
            await onLanguageChange(lang);
        }
    }

    return {
        applyTranslations,
        getCurrentLang,
        switchLang,
        translate,
    };
}
