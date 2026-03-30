// ===============================
// BLOG SECTION (index.html)
// ===============================
// Uses shared BlogCardComponent for rendering

document.addEventListener('DOMContentLoaded', () => {
    void initBlog();
});

async function initBlog() {
    // Delegate to the shared BlogCardComponent
    await BlogCardComponent.init({
        selector: '.blog-grid',
        variant: 'home',
        limit: 0
    });
}

window.BlogComponent = {
    init: initBlog
};