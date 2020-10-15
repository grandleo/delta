export const scroll = {
    getPercent() {
        const h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
    },
    goDown() {
        window.scrollTo(0, 99999);
    },
}
