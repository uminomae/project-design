export function bindAppEvents({ i18n, menuController, modalRouter }) {
    function handleDocumentClick(event) {
        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        if (target.closest('[data-menu-toggle]')) {
            menuController.toggle();
            return;
        }

        const langButton = target.closest('[data-lang-button]');
        if (langButton) {
            void i18n.switchLang(langButton.dataset.langButton);
            return;
        }

        const openTrigger = target.closest('[data-modal-open]');
        if (openTrigger?.dataset.modalOpen === 'about') {
            void modalRouter.openAbout();
            return;
        }
        if (openTrigger?.dataset.modalOpen === 'howto') {
            void modalRouter.openHowto();
            return;
        }

        const closeTrigger = target.closest('[data-modal-close]');
        if (closeTrigger?.dataset.modalClose === 'about') {
            modalRouter.closeAbout();
            return;
        }

        if (closeTrigger?.dataset.modalClose === 'knowledge') {
            modalRouter.closeKnowledge();
            return;
        }

        if (closeTrigger?.dataset.modalClose === 'howto') {
            modalRouter.closeHowto();
            return;
        }

        const copyBtn = target.closest('.howto-copy');
        if (copyBtn) {
            const targetId = copyBtn.getAttribute('data-copy-target');
            const codeEl = document.getElementById(targetId);
            if (codeEl) {
                navigator.clipboard.writeText(codeEl.textContent.trim()).then(() => {
                    const label = copyBtn.querySelector('[data-i18n-key="howto.copy"]');
                    if (label) {
                        const orig = label.textContent;
                        label.textContent = 'OK!';
                        setTimeout(() => { label.textContent = orig; }, 1500);
                    }
                });
            }
            return;
        }

        const knowledgeLink = target.closest('[data-knowledge]');
        if (knowledgeLink) {
            event.preventDefault();
            menuController.close();
            void modalRouter.openKnowledge(knowledgeLink.dataset.knowledge);
            return;
        }

        if (menuController.isOpen() && !target.closest('#site-menu')) {
            menuController.close();
        }
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            modalRouter.handleEscape();
        }
    }

    function handlePopState() {
        void modalRouter.handlePopState();
    }

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('popstate', handlePopState);

    return () => {
        document.removeEventListener('click', handleDocumentClick);
        document.removeEventListener('keydown', handleKeydown);
        window.removeEventListener('popstate', handlePopState);
    };
}
