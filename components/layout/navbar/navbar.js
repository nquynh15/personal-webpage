class NavbarComponent {
    constructor() {
        this.navbar = null;
        this.navToggle = null;
        this.navMenu = null;
        this.navLinks = [];
        this.lastScrollTop = 0;
        this.ticking = false;
        
        this.init();
    }

    init() {
        this.setupElements();
        this.bindEvents();
        this.initCombinedScrollEffects();
        
        console.log('🧭 Navbar component initialized');
    }

    setupElements() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        if (!this.navbar) {
            console.warn('Navbar element not found');
            return;
        }
    }

    bindEvents() {
        // Cache bound methods to avoid re-binding and optimize performance
        this.boundToggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.boundCloseMobileMenu = this.closeMobileMenu.bind(this);
        this.boundHandleOutsideClick = this.handleOutsideClick.bind(this);
        this.boundHandleSmoothScroll = this.handleSmoothScroll.bind(this);
        
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', this.boundToggleMobileMenu);
        }
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.boundCloseMobileMenu);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', this.boundHandleOutsideClick);
        
        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            if (link.getAttribute('href')?.startsWith('#')) {
                link.addEventListener('click', this.boundHandleSmoothScroll);
            }
        });
    }

    toggleMobileMenu() {
        if (!this.navMenu || !this.navToggle) return;
        
        const isActive = this.navMenu.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.navMenu.classList.add('active');
        this.navToggle.classList.add('active');
        this.animateHamburgerBars(true);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.animateHamburgerBars(false);
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    handleOutsideClick(e) {
        if (!this.navbar || !this.navMenu) return;
        
        if (!this.navbar.contains(e.target)) {
            this.closeMobileMenu();
        }
    }

    animateHamburgerBars(isOpen) {
        if (!this.navToggle) return;
        
        const bars = this.navToggle.querySelectorAll('.bar');
        
        bars.forEach((bar, index) => {
            if (isOpen) {
                bar.style.transform = this.getBarTransform(index);
            } else {
                bar.style.transform = 'none';
            }
        });
    }

    getBarTransform(index) {
        switch(index) {
            case 0:
                return 'rotate(45deg) translate(5px, 5px)';
            case 1:
                return 'scale(0)';
            case 2:
                return 'rotate(-45deg) translate(7px, -6px)';
            default:
                return 'none';
        }
    }

    initCombinedScrollEffects() {
        if (!this.navbar) return;
        
        const updateOnScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Navbar scroll effects
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar based on scroll direction
            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            this.lastScrollTop = scrollTop;
            
            // Active link highlighting - uses cached sections
            const scrollPosition = scrollTop + 100;
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
            
            this.ticking = false;
        };
        
        // Single scroll listener với throttling
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(updateOnScroll);
                this.ticking = true;
            }
        });
        
        // Initial active link check
        updateOnScroll();
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        
        // Instant visual feedback cho responsive feel
        const clickedLink = e.target;
        clickedLink.style.transform = 'scale(0.98)';
        clickedLink.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            clickedLink.style.transform = '';
            clickedLink.style.transition = '';
        }, 150);
        
        const targetId = clickedLink.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            this.smoothScrollToSection(targetElement);
            this.closeMobileMenu();
        }
    }

    smoothScrollToSection(targetElement) {
        const targetPosition = targetElement.offsetTop - 70; // Account for navbar height
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 500;
        
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }

    // Easing function for smooth animation
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Public methods
    showNavbar() {
        if (this.navbar) {
            this.navbar.style.transform = 'translateY(0)';
        }
    }

    hideNavbar() {
        if (this.navbar) {
            this.navbar.style.transform = 'translateY(-100%)';
        }
    }

    setActiveLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            }
        });
    }

    destroy() {
        // ✅ Clean up event listeners với bound methods
        if (this.navToggle && this.boundToggleMobileMenu) {
            this.navToggle.removeEventListener('click', this.boundToggleMobileMenu);
        }
        
        if (this.boundCloseMobileMenu) {
            this.navLinks.forEach(link => {
                link.removeEventListener('click', this.boundCloseMobileMenu);
            });
        }
        
        if (this.boundHandleOutsideClick) {
            document.removeEventListener('click', this.boundHandleOutsideClick);
        }
        
        if (this.boundHandleSmoothScroll) {
            this.navLinks.forEach(link => {
                if (link.getAttribute('href')?.startsWith('#')) {
                    link.removeEventListener('click', this.boundHandleSmoothScroll);
                }
            });
        }
        
        console.log('🧭 Navbar component destroyed');
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.navbarComponent = new NavbarComponent();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavbarComponent;
}

// Global access
window.NavbarComponent = NavbarComponent;