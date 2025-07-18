// ===============================
// PROJECTS COMPONENT
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    initProjects();
});

function initProjects() {
    initProjectCards();
    initProjectFilters();
    initProjectModal();
    initProjectsIntersectionObserver();
    initProjectsHoverEffects();
    initProjectsLazyLoading();
    
    console.log('🚀 Projects component initialized');
}

// ===============================
// PROJECT CARDS
// ===============================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add data attributes for filtering
        setupProjectCardData(card, index);
        
        // Add click functionality
        setupProjectCardClick(card);
        
        // Add hover effects
        setupProjectCardHover(card);
    });
}

function setupProjectCardData(card, index) {
    const techTags = card.querySelectorAll('.tech-tag');
    const technologies = Array.from(techTags).map(tag => tag.textContent.toLowerCase());
    
    card.setAttribute('data-project-id', index);
    card.setAttribute('data-technologies', technologies.join(','));
    card.setAttribute('data-category', getProjectCategory(technologies));
}

function getProjectCategory(technologies) {
    if (technologies.includes('react') || technologies.includes('vue.js')) {
        return 'frontend';
    } else if (technologies.includes('node.js') || technologies.includes('api')) {
        return 'backend';
    } else if (technologies.includes('javascript') || technologies.includes('css3')) {
        return 'web';
    }
    return 'other';
}

function setupProjectCardClick(card) {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        
        const projectId = this.getAttribute('data-project-id');
        openProjectModal(projectId);
    });
}

function setupProjectCardHover(card) {
    const image = card.querySelector('.project-image img');
    const overlay = card.querySelector('.project-overlay');
    
    card.addEventListener('mouseenter', function() {
        this.classList.add('hover-lift');
        
        // Animate image
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
        
        // Show overlay with animation
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        }
        
        // Animate tech tags
        const techTags = this.querySelectorAll('.tech-tag');
        techTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(-3px)';
                tag.style.boxShadow = '0 5px 15px rgba(46, 125, 102, 0.3)';
            }, index * 50);
        });
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('hover-lift');
        
        // Reset image
        if (image) {
            image.style.transform = 'scale(1)';
        }
        
        // Hide overlay
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(20px)';
        }
        
        // Reset tech tags
        const techTags = this.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.style.transform = 'translateY(0)';
            tag.style.boxShadow = 'none';
        });
    });
}

// ===============================
// PROJECT FILTERS
// ===============================
function initProjectFilters() {
    const projectsSection = document.querySelector('.projects');
    
    if (projectsSection) {
        const filterContainer = createProjectFilters();
        
        if (filterContainer) {
            const projectsGrid = document.querySelector('.projects-grid');
            projectsSection.insertBefore(filterContainer, projectsGrid);
            
            setupFilterFunctionality();
        }
    }
}

function createProjectFilters() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'projects-filter';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Projects</button>
            <button class="filter-btn" data-filter="frontend">Frontend</button>
            <button class="filter-btn" data-filter="backend">Backend</button>
            <button class="filter-btn" data-filter="web">Web</button>
            <button class="filter-btn" data-filter="other">Other</button>
        </div>
    `;
    
    return filterContainer;
}

function setupFilterFunctionality() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
        });
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            card.style.display = 'block';
            
            // Animate in with delay
            setTimeout(() => {
                card.classList.add('animate-fadeInUp');
                card.style.animationDelay = `${index * 0.1}s`;
            }, 100);
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-fadeInUp');
        }
    });
}

// ===============================
// PROJECT MODAL
// ===============================
function initProjectModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('project-modal')) {
        createProjectModal();
    }
    
    setupModalEvents();
}

function createProjectModal() {
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                    <div class="modal-tech-tags"></div>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="" alt="Project Image">
                    </div>
                    <div class="modal-details">
                        <p class="modal-description"></p>
                        <div class="modal-features">
                            <h4>Key Features:</h4>
                            <ul class="features-list"></ul>
                        </div>
                        <div class="modal-links">
                            <a href="#" class="btn btn-primary modal-demo">View Demo</a>
                            <a href="#" class="btn btn-secondary modal-code">View Code</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function setupModalEvents() {
    const modal = document.getElementById('project-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeProjectModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeProjectModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
    
    if (projectCard) {
        populateModalContent(projectCard);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate modal in
        setTimeout(() => {
            modal.querySelector('.modal-content').classList.add('animate-scaleIn');
        }, 100);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset animation class
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.remove('animate-scaleIn');
    }, 300);
}

function populateModalContent(projectCard) {
    const modal = document.getElementById('project-modal');
    const title = projectCard.querySelector('.project-info h3').textContent;
    const description = projectCard.querySelector('.project-info p').textContent;
    const image = projectCard.querySelector('.project-image img').src;
    const techTags = projectCard.querySelectorAll('.tech-tag');
    
    // Set basic content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-description').textContent = description;
    modal.querySelector('.modal-image img').src = image;
    
    // Set tech tags
    const modalTechTags = modal.querySelector('.modal-tech-tags');
    modalTechTags.innerHTML = '';
    techTags.forEach(tag => {
        const tagClone = tag.cloneNode(true);
        modalTechTags.appendChild(tagClone);
    });
    
    // Set features (you would customize this based on your project data)
    const featuresList = modal.querySelector('.features-list');
    featuresList.innerHTML = `
        <li>Responsive design across all devices</li>
        <li>Modern UI/UX with smooth animations</li>
        <li>Optimized performance and loading speed</li>
        <li>Cross-browser compatibility</li>
    `;
    
    // Set links
    const demoLink = modal.querySelector('.modal-demo');
    const codeLink = modal.querySelector('.modal-code');
    
    demoLink.href = '#'; // You would set actual demo URL
    codeLink.href = '#'; // You would set actual code URL
}

// ===============================
// INTERSECTION OBSERVER
// ===============================
function initProjectsIntersectionObserver() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(projectCards).indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('animate-fadeInUp');
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// ===============================
// HOVER EFFECTS
// ===============================
function initProjectsHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const links = card.querySelectorAll('.project-link');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Add click animation
                this.classList.add('animate-organicPulse');
                
                setTimeout(() => {
                    this.classList.remove('animate-organicPulse');
                }, 600);
            });
        });
    });
}

// ===============================
// LAZY LOADING
// ===============================
function initProjectsLazyLoading() {
    const projectImages = document.querySelectorAll('.project-image img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Create loading animation
                const loader = document.createElement('div');
                loader.className = 'image-loader';
                loader.innerHTML = '<div class="loader-spinner"></div>';
                
                img.parentNode.insertBefore(loader, img);
                
                // Load image
                const tempImg = new Image();
                tempImg.onload = function() {
                    img.src = this.src;
                    img.classList.add('loaded');
                    loader.remove();
                };
                tempImg.src = img.dataset.src || img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    projectImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===============================
// PROJECT SEARCH
// ===============================
function initProjectSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'projects-search';
    searchContainer.innerHTML = `
        <input type="text" class="search-input" placeholder="Search projects...">
        <button class="search-btn">Search</button>
    `;
    
    const projectsSection = document.querySelector('.projects');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (projectsSection && projectsGrid) {
        projectsSection.insertBefore(searchContainer, projectsGrid);
        
        const searchInput = searchContainer.querySelector('.search-input');
        const searchBtn = searchContainer.querySelector('.search-btn');
        
        searchInput.addEventListener('input', debounce(searchProjects, 300));
        searchBtn.addEventListener('click', searchProjects);
    }
}

function searchProjects() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const title = card.querySelector('.project-info h3').textContent.toLowerCase();
        const description = card.querySelector('.project-info p').textContent.toLowerCase();
        const technologies = card.getAttribute('data-technologies');
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       technologies.includes(searchTerm);
        
        if (matches) {
            card.style.display = 'block';
            card.classList.add('animate-fadeIn');
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-fadeIn');
        }
    });
}

// ===============================
// UTILITY FUNCTIONS
// ===============================
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

// Initialize all projects functionality
function initProjects() {
    initProjectCards();
    initProjectFilters();
    initProjectModal();
    initProjectsIntersectionObserver();
    initProjectsHoverEffects();
    initProjectsLazyLoading();
    // initProjectSearch(); // Uncomment if search is needed
    
    console.log('🚀 Projects component fully initialized');
}

// Export projects functions
window.ProjectsComponent = {
    init: initProjects,
    openProjectModal: openProjectModal,
    closeProjectModal: closeProjectModal,
    filterProjects: filterProjects
}; 