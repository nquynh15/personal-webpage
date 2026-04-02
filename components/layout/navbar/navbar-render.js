// ===============================
// SHARED NAVBAR RENDERER
// ===============================
// Renders the navbar HTML into #navbar-placeholder.
// Pass data-active-page attribute on the placeholder to highlight the active nav item.

(function () {
    const NAV_ITEMS = [
        { label: 'Home', href: 'index.html', section: '#home', page: 'home' },
        { label: 'About', href: 'index.html#about', section: '#about', page: 'home' },
        { label: 'Skills', href: 'index.html#skills', section: '#skills', page: 'home' },
        { label: 'Projects', href: 'index.html#projects', section: '#projects', page: 'home' },
        { label: 'Blog', href: 'blog.html', section: '#blog', page: 'blog' },
        { label: 'Services', href: 'index.html#services', section: '#services', page: 'home' },
        { label: 'Contact', href: 'index.html#contact', section: '#contact', page: 'home' },
    ];

    function renderNavbar() {
        const placeholder = document.getElementById('navbar-placeholder');
        if (!placeholder) return;

        const activePage = placeholder.getAttribute('data-active-page') || 'home';
        const isHomePage = activePage === 'home';

        const navLinksHtml = NAV_ITEMS.map(item => {
            // On the home page, use section anchors (#about, #skills, etc.)
            // On other pages, use full paths (index.html#about, blog.html, etc.)
            let href;
            if (isHomePage) {
                href = item.section; // use anchor links for same-page scroll
            } else if (item.page === activePage) {
                href = item.section || item.href; // current page anchor
            } else {
                href = item.href; // full link to other page
            }

            const activeClass = (!isHomePage && (item.page === activePage || (item.label === 'About' && activePage === 'about'))) ? ' active' : '';

            return `
                <li class="nav-item">
                    <a href="${href}" class="nav-link${activeClass}">${item.label}</a>
                </li>`;
        }).join('');

        const navbarHtml = `
        <nav class="navbar" id="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="index.html" style="text-decoration:none;color:inherit;display:flex;align-items:center;">
                        <img src="assets/images/logo.png" alt="Nguyen Thi Quynh" class="navbar-logo-img">
                    </a>
                </div>
                <ul class="nav-menu" id="nav-menu">
                    ${navLinksHtml}
                </ul>
                <div class="nav-toggle" id="nav-toggle">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>`;

        placeholder.outerHTML = navbarHtml;
    }

    // Run as soon as DOM is parsed
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderNavbar);
    } else {
        renderNavbar();
    }
})();