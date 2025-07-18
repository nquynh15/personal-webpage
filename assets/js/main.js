// ===============================
// MAIN JAVASCRIPT FUNCTIONALITY
// ===============================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Initialize all components
    initSmoothScrolling();
    initScrollEffects();
    initIntersectionObserver();
    initParallaxEffects();
    initThemeToggle();
    initProgressBars();
    initCounterAnimations();
    initTooltips();
    initLazyLoading();
    initPerformanceOptimizations();
    
    // Initialize stagewise toolbar as requested
    initStageWiseToolbar();
    
    console.log('🌱 Personal Website initialized successfully!');
}

// ===============================
// SMOOTH SCROLLING
// ===============================
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        if (link.closest('.navbar')) return;
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// ===============================
// SCROLL EFFECTS
// ===============================
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background change
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/Show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active nav link based on scroll position
        updateActiveNavLinkOnScroll();
        
        // Parallax effect for floating elements
        updateParallaxElements(scrollTop);
    });
}

// ===============================
// INTERSECTION OBSERVER
// ===============================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillProgress(entry.target);
                }
                
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll(`
        .animate-on-scroll,
        .skill-item,
        .stat-item,
        .project-card,
        .blog-card,
        .service-card,
        .trait-item
    `);
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// ===============================
// PARALLAX EFFECTS
// ===============================
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-leaf, .floating-particle');
    
    parallaxElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

function updateParallaxElements(scrollTop) {
    const parallaxElements = document.querySelectorAll('.floating-leaf, .floating-particle');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// ===============================
// THEME TOGGLE (Optional)
// ===============================
function initThemeToggle() {
    // Add theme toggle functionality if needed
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Save theme preference
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// ===============================
// PROGRESS BAR ANIMATIONS
// ===============================
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.dataset.progress;
        bar.style.setProperty('--progress-width', progress + '%');
    });
}

function animateSkillProgress(skillItem) {
    const progressBar = skillItem.querySelector('.progress-bar');
    if (progressBar) {
        const progress = progressBar.dataset.progress;
        
        setTimeout(() => {
            progressBar.style.width = progress + '%';
        }, 300);
    }
}

// ===============================
// COUNTER ANIMATIONS
// ===============================
function initCounterAnimations() {
    // Initialize counter animations for stats
}

function animateCounter(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    if (numberElement) {
        const targetNumber = parseInt(numberElement.textContent);
        const duration = 2000; // 2 seconds
        const increment = targetNumber / (duration / 16); // 60fps
        
        let currentNumber = 0;
        numberElement.textContent = '0';
        
        const counter = setInterval(() => {
            currentNumber += increment;
            
            if (currentNumber >= targetNumber) {
                numberElement.textContent = targetNumber + '+';
                clearInterval(counter);
            } else {
                numberElement.textContent = Math.floor(currentNumber);
            }
        }, 16);
    }
}

// ===============================
// PROJECT CARD ANIMATIONS
// ===============================
function animateProjectCard(projectCard) {
    projectCard.style.animationDelay = '0.2s';
    projectCard.classList.add('animate-fadeInUp');
}

// ===============================
// NAVIGATION HELPERS
// ===============================
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ===============================
// TOOLTIPS
// ===============================
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = e.target.getAttribute('data-tooltip');
    const tooltipElement = document.createElement('div');
    
    tooltipElement.className = 'tooltip-popup';
    tooltipElement.textContent = tooltip;
    
    document.body.appendChild(tooltipElement);
    
    // Position tooltip
    const rect = e.target.getBoundingClientRect();
    tooltipElement.style.left = rect.left + rect.width / 2 - tooltipElement.offsetWidth / 2 + 'px';
    tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltipPopup = document.querySelector('.tooltip-popup');
    if (tooltipPopup) {
        tooltipPopup.remove();
    }
}

// ===============================
// LAZY LOADING
// ===============================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===============================
// PERFORMANCE OPTIMIZATIONS
// ===============================
function initPerformanceOptimizations() {
    // Debounce scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll effects already handled above
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Initialize Web Workers for heavy computations if needed
    if (typeof Worker !== 'undefined') {
        // Can initialize workers here for complex animations
    }
}

function preloadCriticalResources() {
    // Preload critical images
    const criticalImages = [
        'assets/images/hero-bg.jpg',
        'assets/images/profile.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ===============================
// STAGEWISE TOOLBAR INTEGRATION
// ===============================
function initStageWiseToolbar() {
    // Only initialize in development mode
    if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
        if (typeof initToolbar === 'function') {
            const stagewiseConfig = {
                plugins: [],
                theme: {
                    primaryColor: '#2e7d66',
                    secondaryColor: '#a3b18a'
                }
            };
            
            initToolbar(stagewiseConfig);
            console.log('🚀 Stagewise toolbar initialized');
        }
    }
}

// ===============================
// UTILITY FUNCTIONS
// ===============================

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll position
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// Get element offset
function getElementOffset(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
}

// ===============================
// ERROR HANDLING
// ===============================
window.addEventListener('error', function(e) {
    console.error('🚨 JavaScript Error:', e.error);
    
    // Log to analytics service if needed
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.message,
            'fatal': false
        });
    }
});

// ===============================
// EXPORTS FOR MODULE USAGE
// ===============================
window.PersonalWebsite = {
    init: initializeApp,
    utils: {
        throttle,
        debounce,
        isInViewport,
        getScrollPosition,
        getElementOffset
    }
};

// Initialize app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
} 