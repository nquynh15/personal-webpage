// ===============================
// SKILLS COMPONENT
// ===============================

document.addEventListener('DOMContentLoaded', () => {
    void initSkills();
});

async function loadJsonArray(url) {
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(`Failed to load JSON: ${response.status} (${url})`);
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
        // Allow relative paths like ./assets/icons/...
        if (typeof url === 'string' && (url.startsWith('./') || url.startsWith('../') || url.startsWith('/'))) {
            return url;
        }
        return '#';
    }
}

function clampNumber(value, min, max, fallback) {
    const n = typeof value === 'number' ? value : parseInt(String(value), 10);
    if (Number.isNaN(n)) return fallback;
    return Math.min(max, Math.max(min, n));
}

function renderProgrammingLanguages(skills) {
    const grid = document.querySelector('.skills-category .skills-grid');
    if (!grid) return;

    if (!Array.isArray(skills) || skills.length === 0) {
        grid.innerHTML = '';
        return;
    }

    grid.innerHTML = skills
        .map((skill) => {
            const name = escapeHtml(skill.name ?? '');
            const iconSrc = safeUrl(skill?.icon?.src);
            const iconAlt = escapeHtml(skill?.icon?.alt ?? skill.name ?? 'Skill icon');
            const progress = clampNumber(skill.progress, 0, 100, 0);

            return `
                <div class="skill-item">
                    <div class="skill-icon">
                        <img src="${escapeHtml(iconSrc)}" alt="${iconAlt}" loading="lazy">
                    </div>
                    <div class="skill-info">
                        <h4>${name}</h4>
                        <div class="skill-progress">
                            <div class="progress-bar" data-progress="${progress}"></div>
                        </div>
                        <span class="skill-level"></span>
                    </div>
                </div>
            `;
        })
        .join('');
}

function renderHumanLanguages(languages) {
    const container = document.querySelector('.skills-category .language-skills');
    if (!container) return;

    if (!Array.isArray(languages) || languages.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = languages
        .map((lang) => {
            const name = escapeHtml(lang.name ?? '');
            const flagSrc = safeUrl(lang?.flag?.src);
            const flagAlt = escapeHtml(lang?.flag?.alt ?? lang.name ?? 'Language flag');
            const level = clampNumber(lang.level, 0, 5, 0);
            const levelText = escapeHtml(lang.levelText ?? '');

            const indicators = Array.from({ length: 5 })
                .map((_, idx) => `<div class="level-indicator${idx < level ? ' active' : ''}"></div>`)
                .join('');

            return `
                <div class="language-item">
                    <div class="language-flag">
                        <img src="${escapeHtml(flagSrc)}" alt="${flagAlt}" loading="lazy">
                    </div>
                    <div class="language-info">
                        <h4>${name}</h4>
                        <div class="language-level">
                            ${indicators}
                        </div>
                        <span class="level-text">${levelText}</span>
                    </div>
                </div>
            `;
        })
        .join('');
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
        const initialActiveCount = item.querySelectorAll('.level-indicator.active').length;
        
        // Persist initial markup state so animation can restore it after we clear classes
        item.dataset.activeCount = String(initialActiveCount);
        
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
    const activeCount = parseInt(languageItem.dataset.activeCount || '0', 10);
    
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
    const skillsContainer = document.querySelector('.skills-content');
    
    if (skillsContainer) {
        const filterButtons = createFilterButtons();
        
        if (filterButtons) {
            skillsContainer.insertBefore(filterButtons, skillsContainer.firstChild);
            
            // Add filter functionality
            initFilterFunctionality();
            
            console.log('✅ Skills filter initialized');
        } else {
            console.warn('❌ Failed to create filter buttons');
        }
    } else {
        console.warn('❌ .skills-content not found');
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
    
    if (filterButtons.length === 0 || skillCategories.length === 0) {
        console.warn('❌ Filter elements not found');
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter.toLowerCase();  // "all", "programming", "languages"
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter skill categories with smooth transition
            skillCategories.forEach(category => {
                const categoryType = category.querySelector('h3')?.textContent.toLowerCase() || '';
                
                let shouldShow = false;
                
                if (filter === 'all') {
                    shouldShow = true;
                } else if (filter === 'programming' && categoryType === 'programming languages') {
                    shouldShow = true;
                } else if (filter === 'languages' && categoryType === 'human languages') {
                    shouldShow = true;
                }
                
                if (shouldShow) {
                    category.style.display = 'block';
                    category.style.opacity = '0';
                    category.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    category.style.transition = 'opacity 0.3s ease';
                    category.style.opacity = '0';
                    setTimeout(() => {
                        category.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ✅ Initial filter to 'all'
    filterButtons[0].click();
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
async function initSkills() {
    const programmingGrid = document.querySelector('.skills-grid');
    const humanLanguagesContainer = document.querySelector('.language-skills');
    const hasFallbackProgramming = !!programmingGrid?.querySelector('.skill-item');
    const hasFallbackHuman = !!humanLanguagesContainer?.querySelector('.language-item');

    try {
        const [programming, humanLanguages] = await Promise.all([
            loadJsonArray('./data/skills/programming_languages/programming_languages_data.json'),
            loadJsonArray('./data/skills/human_languages/human_languages_data.json')
        ]);

        if (programming.length > 0) {
            renderProgrammingLanguages(programming);
        }
        if (humanLanguages.length > 0) {
            renderHumanLanguages(humanLanguages);
        }
    } catch (err) {
        if (!hasFallbackProgramming && !hasFallbackHuman) {
            console.warn('❌ Failed to load skills JSON', err);
        }
    }

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