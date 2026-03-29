function setBodyLocked(locked) {
    document.body.style.overflow = locked ? 'hidden' : '';
}

export function createModalController(rootElement) {
    function isOpen() {
        return rootElement.classList.contains('open');
    }

    function open() {
        rootElement.classList.add('open');
        rootElement.setAttribute('aria-hidden', 'false');
        setBodyLocked(true);
    }

    function close() {
        rootElement.classList.remove('open');
        rootElement.setAttribute('aria-hidden', 'true');
        setBodyLocked(false);
    }

    return {
        close,
        isOpen,
        open,
    };
}
