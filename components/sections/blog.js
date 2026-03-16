// ===============================
// BLOG COMPONENT
// ===============================

document.addEventListener('DOMContentLoaded', () => {
    void initBlog();
});

async function loadBlogsData() {
    const response = await fetch('./data/blogs/blogs_data.json', { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(`Failed to load blogs_data.json: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function safeUrl(url) {
    if (!url || url === '#') return '#';
    try {
        const parsed = new URL(url, window.location.href);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.href;
        return '#';
    } catch {
        return '#';
    }
}

function formatDate(value) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return String(value);
}

function renderBlogGrid(posts) {
    const grid = document.querySelector('.blog-grid');
    if (!grid) return;

    if (!Array.isArray(posts) || posts.length === 0) {
        grid.innerHTML = `
            <article class="blog-card" aria-label="No blog posts yet">
                <div class="blog-content">
                    <h3>No posts yet</h3>
                    <p>Blog content will appear here once you add items to <code>data/blogs/blogs_data.json</code>.</p>
                </div>
            </article>
        `;
        return;
    }

    grid.innerHTML = posts
        .map((post) => {
            const title = escapeHtml(post.title ?? '');
            const excerpt = escapeHtml(post.excerpt ?? post.description ?? '');
            const category = escapeHtml(post.category ?? '');
            const date = escapeHtml(formatDate(post.date ?? post.publishedAt ?? ''));

            const imageSrc = safeUrl(post?.image?.src ?? post.imageSrc);
            const imageAlt = escapeHtml(post?.image?.alt ?? post.title ?? 'Blog image');

            const href = safeUrl(post.url ?? post.href ?? '#');
            const linkAttrs =
                href === '#'
                    ? ''
                    : ' target="_blank" rel="noopener noreferrer"';

            return `
                <article class="blog-card" aria-label="${title}">
                    <div class="blog-image">
                        <img src="${escapeHtml(imageSrc)}" alt="${imageAlt}" loading="lazy">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date">${date}</span>
                            <span class="blog-category">${category}</span>
                        </div>
                        <h3>${title}</h3>
                        <p>${excerpt}</p>
                        <a href="${escapeHtml(href)}" class="read-more"${linkAttrs}>Read More</a>
                    </div>
                </article>
            `;
        })
        .join('');
}

async function initBlog() {
    const grid = document.querySelector('.blog-grid');
    const hasFallbackPosts = !!grid?.querySelector('.blog-card');

    try {
        const posts = await loadBlogsData();
        renderBlogGrid(posts);
    } catch (err) {
        if (!hasFallbackPosts) {
            console.warn('❌ Failed to load blogs JSON', err);
        }
    }
}

window.BlogComponent = {
    init: initBlog
};