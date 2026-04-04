const PDFJS_CDN = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.9.155/build/pdf.min.mjs';
const PDFJS_WORKER_CDN = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.9.155/build/pdf.worker.min.mjs';

let pdfjsLib = null;

async function loadPdfJs() {
    if (pdfjsLib) {
        return pdfjsLib;
    }

    const mod = await import(PDFJS_CDN);
    mod.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
    pdfjsLib = mod;

    return pdfjsLib;
}

export function createSlideViewer({ container, pageIndicator }) {
    let pdfDoc = null;
    let currentPage = 1;
    let totalPages = 0;
    let rendering = false;

    const canvas = container.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    async function renderPage(pageNum) {
        if (rendering || !pdfDoc) {
            return;
        }

        rendering = true;

        const page = await pdfDoc.getPage(pageNum);
        const containerWidth = container.clientWidth;
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = (containerWidth / unscaledViewport.width) * window.devicePixelRatio;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = (viewport.height / window.devicePixelRatio) + 'px';

        await page.render({ canvasContext: ctx, viewport }).promise;

        currentPage = pageNum;
        pageIndicator.textContent = `${currentPage} / ${totalPages}`;
        rendering = false;
    }

    async function load(url) {
        const lib = await loadPdfJs();
        pdfDoc = await lib.getDocument(url).promise;
        totalPages = pdfDoc.numPages;
        currentPage = 1;
        await renderPage(1);
    }

    async function prev() {
        if (currentPage <= 1) {
            return;
        }

        await renderPage(currentPage - 1);
    }

    async function next() {
        if (currentPage >= totalPages) {
            return;
        }

        await renderPage(currentPage + 1);
    }

    function destroy() {
        if (pdfDoc) {
            pdfDoc.destroy();
            pdfDoc = null;
        }

        currentPage = 1;
        totalPages = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pageIndicator.textContent = '';
    }

    function getCurrentPage() {
        return currentPage;
    }

    function getTotalPages() {
        return totalPages;
    }

    return {
        destroy,
        getCurrentPage,
        getTotalPages,
        load,
        next,
        prev,
    };
}
