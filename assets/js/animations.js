// ===============================
// ANIMATIONS CONTROLLER
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
});

function initAnimations() {
    initIntersectionObserver();
    initParallaxScrolling();
    initMouseFollower();
    initFloatingParticles();
    initOrganicShapes();
    initCursorEffects();
    initPageTransitions();
    initMagneticElements();
    initRippleEffects();
    
    console.log('✨ Animations initialized');
}

// ===============================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===============================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add base animation class
                target.classList.add('animate-in');
                
                // Apply specific animations based on element type
                applyElementSpecificAnimation(target);
                
                // Trigger staggered animations for child elements
                triggerStaggeredAnimations(target);
                
                // Stop observing this element
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe all elements that should animate
    const elementsToAnimate = document.querySelectorAll(`
        .section-title,
        .section-subtitle,
        .skill-item,
        .project-card,
        .blog-card,
        .service-card,
        .contact-method,
        .trait-item,
        .about-stats .stat-item,
        .hero-buttons .btn
    `);
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

function applyElementSpecificAnimation(element) {
    if (element.classList.contains('section-title')) {
        element.classList.add('animate-fadeInUp');
    } else if (element.classList.contains('section-subtitle')) {
        element.classList.add('animate-fadeInUp', 'animate-delay-1');
    } else if (element.classList.contains('skill-item')) {
        element.classList.add('animate-slideInLeft');
    } else if (element.classList.contains('project-card')) {
        element.classList.add('animate-fadeInUp');
    } else if (element.classList.contains('blog-card')) {
        element.classList.add('animate-slideInUp');
    } else if (element.classList.contains('service-card')) {
        element.classList.add('animate-scaleIn');
    } else if (element.classList.contains('contact-method')) {
        element.classList.add('animate-slideInLeft');
    } else if (element.classList.contains('trait-item')) {
        element.classList.add('animate-bounceIn');
    } else if (element.classList.contains('stat-item')) {
        element.classList.add('animate-flipInY');
    } else {
        element.classList.add('animate-fadeInUp');
    }
}

function triggerStaggeredAnimations(container) {
    const children = container.querySelectorAll('.stagger-item');
    
    children.forEach((child, index) => {
        setTimeout(() => {
            child.classList.add('animate-fadeInUp');
        }, index * 100);
    });
}

// ===============================
// PARALLAX SCROLLING
// ===============================
function initParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Throttled scroll handler
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });
}

// ===============================
// MOUSE FOLLOWER
// ===============================
function initMouseFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animate follower with easing
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .blog-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ===============================
// FLOATING PARTICLES
// ===============================
function initFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    document.body.appendChild(particleContainer);
    
    const particleCount = 20;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        particles.push(particle);
        particleContainer.appendChild(particle);
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random starting position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        
        // Random size
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color from our palette
        const colors = ['#2e7d66', '#a3b18a', '#e76f51', '#c9b458'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        return particle;
    }
    
    function animateParticles() {
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            
            // Reset position if particle goes off screen
            if (rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) {
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = '-10px';
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// ===============================
// ORGANIC SHAPES
// ===============================
function initOrganicShapes() {
    const shapes = document.querySelectorAll('.organic-shape');
    
    shapes.forEach(shape => {
        animateOrganicShape(shape);
    });
}

function animateOrganicShape(shape) {
    const morphKeyframes = [
        { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        { borderRadius: '54% 46% 38% 62% / 49% 70% 30% 51%' },
        { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }
    ];
    
    shape.animate(morphKeyframes, {
        duration: 8000,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}

// ===============================
// CURSOR EFFECTS
// ===============================
function initCursorEffects() {
    const interactiveElements = document.querySelectorAll('.btn, .project-card, .blog-card, .service-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {           
            // Add magnetic effect
            addMagneticEffect(this);
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.cursor = 'pointer';
            
            // Remove magnetic effect
            removeMagneticEffect(this);
        });
    });
}

function addMagneticEffect(element) {
    element.classList.add('magnetic');
    // Debounce mousemove to only update every 16ms (60fps)
    element.debouncedMagneticMove = debounce(handleMagneticMove, 16);
    element.addEventListener('mousemove', handleMagneticMove);
}

function removeMagneticEffect(element) {
    element.classList.remove('magnetic');
    if (element.debouncedMagneticMove) {
        element.removeEventListener('mousemove', handleMagneticMove);
    }
    element.style.transform = 'translate(0, 0)';
}

function handleMagneticMove(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const strength = 0.2;
    const moveX = x * strength;
    const moveY = y * strength;
    
    this.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===============================
// PAGE TRANSITIONS
// ===============================
function initPageTransitions() {
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);
    
    // Handle internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Show transition overlay
                transitionOverlay.classList.add('active');
                
                setTimeout(() => {
                    // Scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Hide overlay
                    setTimeout(() => {
                        transitionOverlay.classList.remove('active');
                    }, 300);
                }, 200);
            }
        });
    });
}

// ===============================
// MAGNETIC ELEMENTS
// ===============================
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic-element');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.2;
            const moveX = x * strength;
            const moveY = y * strength;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// ===============================
// RIPPLE EFFECTS
// ===============================
function initRippleEffects() {
    const rippleElements = document.querySelectorAll('.ripple-effect');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

function createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ===============================
// SCROLL ANIMATIONS
// ===============================
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add(`animate-${animationType}`);
                }, delay);
                
                scrollObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// ===============================
// NATURE EFFECTS
// ===============================
function initNatureEffects() {
    // Create falling leaves effect
    createFallingLeaves();
    
    // Create floating particles
    createFloatingParticles();
    
    // Create wind effect
    createWindEffect();
}

function createFallingLeaves() {
    const leafContainer = document.createElement('div');
    leafContainer.className = 'falling-leaves';
    document.body.appendChild(leafContainer);
    
    setInterval(() => {
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';
        leaf.style.left = Math.random() * window.innerWidth + 'px';
        leaf.style.animationDuration = (Math.random() * 5 + 5) + 's';
        leaf.style.animationDelay = Math.random() * 2 + 's';
        
        leafContainer.appendChild(leaf);
        
        // Remove leaf after animation
        setTimeout(() => {
            leaf.remove();
        }, 10000);
    }, 3000);
}

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'nature-particles';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'nature-particle';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        particleContainer.appendChild(particle);
    }
}

function createWindEffect() {
    const windElements = document.querySelectorAll('.wind-effect');
    
    windElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('animate-windSway');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('animate-windSway');
        });
    });
}

// ===============================
// PERFORMANCE OPTIMIZATION
// ===============================
function optimizeAnimations() {
    // Use will-change for better performance
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .floating-particle, .magnetic-element');
    
    animatedElements.forEach(element => {
        element.style.willChange = 'transform, opacity';
    });
    
    // Use passive event listeners where possible
    const passiveSupported = checkPassiveSupport();
    
    if (passiveSupported) {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
    }
}

function checkPassiveSupport() {
    let passiveSupported = false;
    
    try {
        const options = {
            get passive() {
                passiveSupported = true;
                return false;
            }
        };
        
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passiveSupported = false;
    }
    
    return passiveSupported;
}

function handleScroll() {
    // Throttled scroll handler
    requestAnimationFrame(() => {
        // Update parallax elements
        updateParallaxElements();
        
        // Update floating particles
        updateFloatingParticles();
    });
}

function handleResize() {
    // Throttled resize handler
    requestAnimationFrame(() => {
        // Recalculate positions
        recalculatePositions();
    });
}

function updateParallaxElements() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

function updateFloatingParticles() {
    const particles = document.querySelectorAll('.floating-particle');
    
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        
        if (rect.top > window.innerHeight) {
            particle.style.top = '-10px';
            particle.style.left = Math.random() * window.innerWidth + 'px';
        }
    });
}

function recalculatePositions() {
    // Recalculate any position-dependent elements
    const magneticElements = document.querySelectorAll('.magnetic-element');
    
    magneticElements.forEach(element => {
        element.style.transform = 'translate(0, 0)';
    });
}

// ===============================
// INITIALIZATION
// ===============================
function initAnimations() {
    initIntersectionObserver();
    initParallaxScrolling();
    initMouseFollower();
    initFloatingParticles();
    initOrganicShapes();
    initCursorEffects();
    initPageTransitions();
    initMagneticElements();
    initRippleEffects();
    initScrollAnimations();
    initNatureEffects();
    optimizeAnimations();
    
    console.log('✨ All animations initialized successfully');
}

// Export animation functions
window.AnimationsController = {
    init: initAnimations,
    createRipple: createRipple,
    addMagneticEffect: addMagneticEffect,
    removeMagneticEffect: removeMagneticEffect
}; 