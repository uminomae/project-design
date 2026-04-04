export function bindAppEvents({ i18n, menuController, modalRouter, slideViewer }) {
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
        if (openTrigger) {
            event.preventDefault();
            menuController.close();
            const modal = openTrigger.dataset.modalOpen;
            if (modal === 'about') { void modalRouter.openAbout(); }
            else if (modal === 'howto') { void modalRouter.openHowto(); }
            else if (modal === 'slides') { void modalRouter.openSlides(); }
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

        if (closeTrigger?.dataset.modalClose === 'slides') {
            modalRouter.closeSlides();
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

        const slidesPrev = target.closest('#slides-prev');
        if (slidesPrev && slideViewer) {
            void slideViewer.prev();
            return;
        }

        const slidesNext = target.closest('#slides-next');
        if (slidesNext && slideViewer) {
            void slideViewer.next();
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
            return;
        }

        if (modalRouter.isSlidesOpen() && slideViewer) {
            if (event.key === 'ArrowLeft') {
                void slideViewer.prev();
                return;
            }

            if (event.key === 'ArrowRight') {
                void slideViewer.next();
                return;
            }
        }
    }

    function handlePopState() {
        void modalRouter.handlePopState();
    }

    const scrollHint = document.getElementById('scroll-hint');

    function handleScroll() {
        if (!scrollHint) {
            return;
        }

        if (window.scrollY > window.innerHeight * 0.15) {
            scrollHint.classList.remove('visible');
        } else {
            scrollHint.classList.add('visible');
        }
    }

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        document.removeEventListener('click', handleDocumentClick);
        document.removeEventListener('keydown', handleKeydown);
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('scroll', handleScroll);
    };
}
