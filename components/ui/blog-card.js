// ===============================
// UI BLOG CARD COMPONENT
// ===============================

const BlogCardComponent = (() => {

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

    /**
     * Render a single blog card HTML string.
     * @param {Object} post - Blog post data object
     * @param {Object} [options] - Rendering options
     * @param {string} [options.variant] - 'home' (index.html style) or 'blog' (blog.html style)
     * @returns {string} HTML string for the blog card
     */
    function renderCard(post, options = {}) {
        const variant = options.variant || 'home';

        const title = escapeHtml(post.title ?? '');
        const excerpt = escapeHtml(post.excerpt ?? post.description ?? '');
        const category = escapeHtml(post.category ?? '');
        const date = escapeHtml(formatDate(post.date ?? post.publishedAt ?? ''));
        const imageSrc = safeUrl(post?.image?.src ?? post.imageSrc);
        const imageAlt = escapeHtml(post?.image?.alt ?? post.title ?? 'Blog image');
        const href = safeUrl(post.url ?? post.href ?? '#');
        const linkAttrs = href === '#' ? '' : ' target="_blank" rel="noopener noreferrer"';

        if (variant === 'blog') {
            // Blog page variant — uses blog-card-image, blog-card-content, etc.
            const likesCount = typeof post.likes === 'number' ? post.likes : 0;
            const tagsHtml = Array.isArray(post.tags) ? post.tags.map(tag => `
                <span class="blog-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                    ${escapeHtml(tag)}
                </span>
            `).join('') : '';

            return `
                <article class="blog-card" aria-label="${title}">
                    <div class="blog-card-image">
                        <span class="blog-category-badge-pill">${category}</span>
                        <div class="blog-likes-float">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            <span>${likesCount}</span>
                        </div>
                        <img src="${escapeHtml(imageSrc)}" alt="${imageAlt}" loading="lazy">
                    </div>
                    <div class="blog-card-content">
                        <span class="blog-date">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            ${date}
                        </span>
                        <h3 class="blog-card-title">${title}</h3>
                        <p class="blog-card-excerpt">${excerpt}</p>
                        ${tagsHtml ? `<div class="blog-tags">${tagsHtml}</div>` : ''}
                        <a href="${escapeHtml(href)}" class="btn-read-full"${linkAttrs}>Đọc bài viết</a>
                    </div>
                </article>
            `;
        }

        // Home page variant (default) — uses blog-image, blog-content, blog-meta, etc.
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
    }

    /**
     * Render a grid of blog cards into a target element.
     * @param {HTMLElement} container - The grid container element
     * @param {Array} posts - Array of blog post data objects
     * @param {Object} [options] - Rendering options
     * @param {string} [options.variant] - 'home' or 'blog'
     * @param {number} [options.limit] - Max number of posts to display (0 = all)
     */
    function renderGrid(container, posts, options = {}) {
        if (!container) return;

        const limit = options.limit || 0;
        const displayPosts = limit > 0 ? posts.slice(0, limit) : posts;

        if (!Array.isArray(displayPosts) || displayPosts.length === 0) {
            container.innerHTML = `
                <article class="blog-card" aria-label="No blog posts yet">
                    <div class="blog-content">
                        <h3>No posts yet</h3>
                        <p>Blog content will appear here once you add items to <code>data/blogs/blogs_data.json</code>.</p>
                    </div>
                </article>
            `;
            return;
        }

        container.innerHTML = displayPosts
            .map(post => renderCard(post, options))
            .join('');
    }

    /**
     * Load blog data from the JSON file.
     * @param {string} [basePath] - Base path to the data file (relative to page)
     * @returns {Promise<Array>} Array of blog post objects
     */
    async function loadData(basePath = './data/blogs/blogs_data.json') {
        const response = await fetch(basePath, { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`Failed to load blogs_data.json: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    }

    /**
     * Initialize blog cards in a container by loading data and rendering.
     * @param {Object} config - Configuration object
     * @param {string} config.selector - CSS selector for the grid container
     * @param {string} [config.variant] - 'home' or 'blog'
     * @param {number} [config.limit] - Max posts to display (0 = all)
     * @param {string} [config.dataPath] - Path to blog data JSON
     */
    async function init(config = {}) {
        const {
            selector = '.blog-grid',
            variant = 'home',
            limit = 0,
            dataPath = './data/blogs/blogs_data.json'
        } = config;

        const container = document.querySelector(selector);
        if (!container) return;

        const hasFallbackPosts = !!container.querySelector('.blog-card');

        try {
            const posts = await loadData(dataPath);
            renderGrid(container, posts, { variant, limit });
        } catch (err) {
            if (!hasFallbackPosts) {
                console.warn('❌ Failed to load blogs JSON', err);
            }
        }
    }

    return {
        renderCard,
        renderGrid,
        loadData,
        init,
        escapeHtml,
        safeUrl,
        formatDate
    };
})();

// Export for global access
window.BlogCardComponent = BlogCardComponent;
