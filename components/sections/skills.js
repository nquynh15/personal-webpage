// ===============================
// SKILLS COMPONENT
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    initSkills();
});

function initSkills() {
    initProgressBars();
    initLanguageLevels();
    initSkillsIntersectionObserver();
    initSkillsHoverEffects();
    initSkillsFiltering();
    
    console.log('🎯 Skills component initialized');
}

// ===============================
// PROGRESS BAR ANIMATIONS
// ===============================
function initProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const progressBar = item.querySelector('.progress-bar');
        const skillLevel = item.querySelector('.skill-level');
        
        if (progressBar) {
            const progress = parseInt(progressBar.dataset.progress) || 0;
            
            // Store original values
            progressBar.style.setProperty('--progress-width', progress + '%');
            progressBar.style.width = '0%';
            
            // Set skill level text based on progress
            if (skillLevel) {
                skillLevel.textContent = getSkillLevelText(progress);
            }
        }
    });
}

function animateProgressBar(skillItem) {
    const progressBar = skillItem.querySelector('.progress-bar');
    const skillLevel = skillItem.querySelector('.skill-level');
    
    if (progressBar) {
        const progress = parseInt(progressBar.dataset.progress) || 0;
        const duration = 1500; // Animation duration in ms
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progressPercent = Math.min(elapsed / duration, 1);
            
            // Use easing function for smooth animation
            const easedProgress = easeOutCubic(progressPercent);
            const currentWidth = Math.floor(easedProgress * progress);
            
            progressBar.style.width = currentWidth + '%';
            
            if (progressPercent < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                progressBar.style.width = progress + '%';
                
                // Add completion effect
                addProgressCompletionEffect(skillItem);
            }
        }
        
        requestAnimationFrame(animate);
    }
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function addProgressCompletionEffect(skillItem) {
    const progressBar = skillItem.querySelector('.progress-bar');
    
    if (progressBar) {
        progressBar.classList.add('animate-progressGlow');
        
        setTimeout(() => {
            progressBar.classList.remove('animate-progressGlow');
        }, 1000);
    }
}

function getSkillLevelText(progress) {
    if (progress >= 90) return 'Expert';
    if (progress >= 75) return 'Advanced';
    if (progress >= 60) return 'Intermediate';
    if (progress >= 40) return 'Basic';
    return 'Beginner';
}

// ===============================
// LANGUAGE LEVEL INDICATORS
// ===============================
function initLanguageLevels() {
    const languageItems = document.querySelectorAll('.language-item');
    
    languageItems.forEach(item => {
        const indicators = item.querySelectorAll('.level-indicator');
        const levelText = item.querySelector('.level-text');
        
        // Store original state
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Animate on intersection
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateLanguageLevel(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
}

function animateLanguageLevel(languageItem) {
    const indicators = languageItem.querySelectorAll('.level-indicator');
    const activeCount = languageItem.querySelectorAll('.level-indicator.active').length;
    
    // Remove all active classes first
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Animate indicators one by one
    indicators.forEach((indicator, index) => {
        setTimeout(() => {
            if (index < activeCount) {
                indicator.classList.add('active');
                indicator.style.animation = 'scaleIn 0.3s ease-out';
            }
        }, index * 150);
    });
}

// ===============================
// SKILLS INTERSECTION OBSERVER
// ===============================
function initSkillsIntersectionObserver() {
    const skillsSection = document.querySelector('.skills');
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill items with stagger
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-fadeInUp');
                        animateProgressBar(item);
                    }, index * 150);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ===============================
// HOVER EFFECTS
// ===============================
function initSkillsHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    const languageItems = document.querySelectorAll('.language-item');
    
    // Skill items hover effects
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
            
            // Add icon rotation
            const icon = this.querySelector('.skill-icon img');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
            }
            
            // Glow effect on progress bar
            const progressBar = this.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.boxShadow = '0 0 20px rgba(46, 125, 102, 0.5)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
            
            // Reset icon
            const icon = this.querySelector('.skill-icon img');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
            
            // Reset progress bar glow
            const progressBar = this.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.boxShadow = 'none';
            }
        });
    });
    
    // Language items hover effects
    languageItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
            
            // Animate flag
            const flag = this.querySelector('.language-flag img');
            if (flag) {
                flag.style.transform = 'scale(1.1) rotate(2deg)';
            }
            
            // Pulse level indicators
            const indicators = this.querySelectorAll('.level-indicator.active');
            indicators.forEach((indicator, index) => {
                setTimeout(() => {
                    indicator.style.animation = 'organicPulse 0.6s ease-out';
                }, index * 50);
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
            
            // Reset flag
            const flag = this.querySelector('.language-flag img');
            if (flag) {
                flag.style.transform = 'scale(1) rotate(0deg)';
            }
            
            // Reset indicators
            const indicators = this.querySelectorAll('.level-indicator');
            indicators.forEach(indicator => {
                indicator.style.animation = 'none';
            });
        });
    });
}

// ===============================
// SKILLS FILTERING (Optional)
// ===============================
function initSkillsFiltering() {
    // Create filter buttons if needed
    const skillsContainer = document.querySelector('.skills-content');
    
    if (skillsContainer) {
        const filterButtons = createFilterButtons();
        
        if (filterButtons) {
            skillsContainer.insertBefore(filterButtons, skillsContainer.firstChild);
            
            // Add filter functionality
            initFilterFunctionality();
        }
    }
}

function createFilterButtons() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'skills-filter';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Skills</button>
        <button class="filter-btn" data-filter="programming">Programming</button>
        <button class="filter-btn" data-filter="languages">Languages</button>
    `;
    
    return filterContainer;
}

function initFilterFunctionality() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCategories = document.querySelectorAll('.skills-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter skill categories
            skillCategories.forEach(category => {
                if (filter === 'all') {
                    category.style.display = 'block';
                    category.classList.add('animate-fadeIn');
                } else {
                    const categoryType = category.querySelector('h3').textContent.toLowerCase();
                    
                    if (categoryType.includes(filter)) {
                        category.style.display = 'block';
                        category.classList.add('animate-fadeIn');
                    } else {
                        category.style.display = 'none';
                        category.classList.remove('animate-fadeIn');
                    }
                }
            });
        });
    });
}

// ===============================
// SKILLS ANIMATION CONTROLLER
// ===============================
function animateSkillsOnScroll() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !item.classList.contains('animated')) {
            setTimeout(() => {
                item.classList.add('animated');
                item.classList.add('animate-fadeInUp');
                animateProgressBar(item);
            }, index * 100);
        }
    });
}

// ===============================
// SKILLS COUNTER ANIMATION
// ===============================
function animateSkillCounter(element, target) {
    const duration = 1000;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(progress * target);
        element.textContent = currentValue + '%';
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// ===============================
// SKILLS PERFORMANCE OPTIMIZATION
// ===============================
function optimizeSkillsPerformance() {
    // Use passive event listeners for better performance
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        // Enable hardware acceleration
        item.style.transform = 'translateZ(0)';
        item.style.willChange = 'transform';
    });
}

// ===============================
// SKILLS ACCESSIBILITY
// ===============================
function initSkillsAccessibility() {
    const skillItems = document.querySelectorAll('.skill-item');
    const languageItems = document.querySelectorAll('.language-item');
    
    // Add ARIA labels
    skillItems.forEach(item => {
        const skillName = item.querySelector('h4').textContent;
        const skillLevel = item.querySelector('.skill-level').textContent;
        const progress = item.querySelector('.progress-bar').dataset.progress;
        
        item.setAttribute('aria-label', `${skillName}: ${skillLevel} level, ${progress}% proficiency`);
        item.setAttribute('role', 'progressbar');
        item.setAttribute('aria-valuenow', progress);
        item.setAttribute('aria-valuemin', '0');
        item.setAttribute('aria-valuemax', '100');
    });
    
    languageItems.forEach(item => {
        const languageName = item.querySelector('h4').textContent;
        const level = item.querySelector('.level-text').textContent;
        const activeIndicators = item.querySelectorAll('.level-indicator.active').length;
        
        item.setAttribute('aria-label', `${languageName}: ${level} level, ${activeIndicators} out of 5 stars`);
        item.setAttribute('role', 'progressbar');
        item.setAttribute('aria-valuenow', activeIndicators);
        item.setAttribute('aria-valuemin', '0');
        item.setAttribute('aria-valuemax', '5');
    });
}

// Initialize all skills functionality
function initSkills() {
    initProgressBars();
    initLanguageLevels();
    initSkillsIntersectionObserver();
    initSkillsHoverEffects();
    initSkillsFiltering();
    optimizeSkillsPerformance();
    initSkillsAccessibility();
    
    console.log('🎯 Skills component fully initialized');
}

// Export skills functions
window.SkillsComponent = {
    init: initSkills,
    animateProgressBar: animateProgressBar,
    animateLanguageLevel: animateLanguageLevel,
    animateSkillsOnScroll: animateSkillsOnScroll
}; 