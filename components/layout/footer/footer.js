// ===============================
// SHARED FOOTER RENDERER
// ===============================
// Renders the footer HTML into #footer-placeholder.

(function () {
    function renderFooter() {
        const placeholder = document.getElementById('footer-placeholder');
        if (!placeholder) return;

        const footerHtml = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Nguyen Thi Quynh</h3>
                        <p>Software Developer passionate about creating beautiful and functional web experiences.</p>
                    </div>
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="index.html#home">Home</a></li>
                            <li><a href="index.html#about">About</a></li>
                            <li><a href="index.html#projects">Projects</a></li>
                            <li><a href="index.html#blog">Blog</a></li>
                            <li><a href="index.html#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Follow Me</h4>
                        <div class="social-links">
                            <a href="https://github.com/nquynh15" class="social-link">GitHub</a>
                            <a href="https://www.linkedin.com/in/quynh-nguyen-850876222/" class="social-link">LinkedIn</a>
                            <a href="https://www.facebook.com/quynhnguyen.nyukina15" class="social-link">Facebook</a>
                        </div>
                        <div class="social-links">
                            <a href="#" class="social-link">Tiktok</a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Nguyen Thi Quynh. All rights reserved.</p>
                </div>
            </div>
        </footer>`;

        placeholder.outerHTML = footerHtml;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderFooter);
    } else {
        renderFooter();
    }
})();