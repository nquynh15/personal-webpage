// ===============================
// HERO COMPONENT
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    initHero();
});

function initHero() {
    initTypingEffect();
    initFloatingElements();
    initParallaxEffect();
    initHeroAnimations();
    initScrollIndicator();
    initProfileInteraction();
    
    console.log('🌟 Hero component initialized');
}

// ===============================
// TYPING EFFECT
// ===============================
function initTypingEffect() {
    const typewriterElement = document.querySelector('.hero-subtitle');
    
    if (typewriterElement) {
        const texts = [
            'Software Developer passionate about creating beautiful, functional web experiences',
            'Building the future with code, one line at a time',
            'Turning ideas into reality through elegant solutions'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';
        
        function typeWriter() {
            const fullText = texts[textIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typewriterElement.textContent = currentText;
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next text
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // Start typing effect after initial delay
        setTimeout(typeWriter, 1000);
    }
}

// ===============================
// FLOATING ELEMENTS
// ===============================
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-leaf, .floating-particle');
    
    floatingElements.forEach((element, index) => {
        // Set random initial positions
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        element.style.left = `${randomX}%`;
        element.style.top = `${randomY}%`;
        
        // Add random animation delays
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add mouse interaction
        addFloatingElementInteraction(element);
    });
    
    // Create additional particles dynamically
    createDynamicParticles();
}

function addFloatingElementInteraction(element) {
    element.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
        this.style.transform = 'scale(1.2)';
        this.style.filter = 'brightness(1.3)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        this.style.transform = 'scale(1)';
        this.style.filter = 'brightness(1)';
    });
}

function createDynamicParticles() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle dynamic-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 3}s`;
            particle.style.animationDuration = `${3 + Math.random() * 4}s`;
            
            heroBackground.appendChild(particle);
        }
    }
}

// ===============================
// PARALLAX EFFECT
// ===============================
function initParallaxEffect() {
    const heroContent = document.querySelector('.hero-content');
    const floatingElements = document.querySelectorAll('.floating-leaf, .floating-particle');
    
    let ticking = false;
    let lastUpdate = 0;
    const throttleRate = 16;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
        
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        const now = performance.now();
        if (!ticking && now - lastUpdate > throttleRate) {
            requestAnimationFrame(updateParallax);
            ticking = true;
            lastUpdate = now;
        }
    });
}

// ===============================
// HERO ANIMATIONS
// ===============================
function initHeroAnimations() {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    // Animate elements on load
    setTimeout(() => {
        if (heroText) {
            heroText.classList.add('animate-fadeInLeft');
        }
        
        if (heroImage) {
            heroImage.classList.add('animate-fadeInRight');
        }
        
        // Animate buttons with delay
        heroButtons.forEach((button, index) => {
            setTimeout(() => {
                button.classList.add('animate-fadeInUp');
                button.style.animationDelay = `${index * 0.2}s`;
            }, 800 + (index * 200));
        });
    }, 500);
    
    // Add hover effects to buttons
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('animate-organicPulse');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('animate-organicPulse');
        });
    });
}

// ===============================
// SCROLL INDICATOR
// ===============================
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide scroll indicator when scrolling
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const opacity = Math.max(0, 1 - (scrollTop / 300));
            scrollIndicator.style.opacity = opacity;
        });
    }
}

// ===============================
// PROFILE INTERACTION
// ===============================
function initProfileInteraction() {
    const profilePhoto = document.querySelector('.profile-photo');
    const profileContainer = document.querySelector('.profile-container');
    
    if (profilePhoto && profileContainer) {
        // Add click interaction
        profilePhoto.addEventListener('click', function() {
            this.classList.add('animate-organicPulse');
            
            // Create ripple effect
            createRippleEffect(this);
            
            setTimeout(() => {
                this.classList.remove('animate-organicPulse');
            }, 1000);
        });
        
        // Add hover effects
        profileContainer.addEventListener('mouseenter', function() {
            this.classList.add('hover-glow');
        });
        
        profileContainer.addEventListener('mouseleave', function() {
            this.classList.remove('hover-glow');
        });
    }
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(46, 125, 102, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '200px';
    ripple.style.height = '200px';
    ripple.style.marginLeft = '-100px';
    ripple.style.marginTop = '-100px';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ===============================
// HERO BACKGROUND EFFECTS
// ===============================
function initHeroBackgroundEffects() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        // Add gradient animation
        heroBackground.style.background = `
            linear-gradient(45deg, 
                var(--bg-light), 
                var(--bg-secondary), 
                var(--bg-light)
            )
        `;
        heroBackground.style.backgroundSize = '400% 400%';
        heroBackground.classList.add('animate-gradientShift');
    }
}

// ===============================
// RESPONSIVE HERO ADJUSTMENTS
// ===============================
function initResponsiveHero() {
    function adjustHeroForMobile() {
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero-title');
        
        if (window.innerWidth <= 768) {
            if (heroContent) {
                heroContent.style.gridTemplateColumns = '1fr';
                heroContent.style.textAlign = 'center';
            }
            
            if (heroTitle) {
                heroTitle.style.fontSize = '2.5rem';
            }
        } else {
            if (heroContent) {
                heroContent.style.gridTemplateColumns = '1fr 1fr';
                heroContent.style.textAlign = 'left';
            }
            
            if (heroTitle) {
                heroTitle.style.fontSize = '4rem';
            }
        }
    }
    
    // Initial adjustment
    adjustHeroForMobile();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustHeroForMobile);
}

// ===============================
// HERO INTERSECTION OBSERVER
// ===============================
function initHeroIntersectionObserver() {
    const heroSection = document.querySelector('.hero');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hero is visible
                entry.target.classList.add('hero-visible');
                
                // Start any visibility-based animations
                startVisibilityAnimations();
            } else {
                // Hero is not visible
                entry.target.classList.remove('hero-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    if (heroSection) {
        observer.observe(heroSection);
    }
}

function startVisibilityAnimations() {
    const floatingElements = document.querySelectorAll('.floating-leaf, .floating-particle');
    
    floatingElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animationPlayState = 'running';
        }, index * 100);
    });
}

// Initialize all hero functionality
function initHero() {
    initTypingEffect();
    initFloatingElements();
    initParallaxEffect();
    initHeroAnimations();
    initScrollIndicator();
    initProfileInteraction();
    initHeroBackgroundEffects();
    initResponsiveHero();
    initHeroIntersectionObserver();
    
    console.log('🌟 Hero component fully initialized');
}

// Export hero functions
window.HeroComponent = {
    init: initHero,
    createRippleEffect: createRippleEffect,
    createDynamicParticles: createDynamicParticles
}; 