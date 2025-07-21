// ===============================
// CONTACT COMPONENT
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    initContact();
});

function initContact() {
    initContactForm();
    initContactMethodsAnimation();
    initContactIntersectionObserver();
    initContactValidation();
    initContactSubmission();
    
    console.log('📧 Contact component initialized');
}

// ===============================
// CONTACT FORM
// ===============================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        setupFormFields(contactForm);
        setupFormEvents(contactForm);
        setupFormValidation(contactForm);
    }
}

function setupFormFields(form) {
    const formGroups = form.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        
        if (input) {
            // Add floating label effect
            addFloatingLabelEffect(input);
            
            // Add focus/blur effects
            addFocusEffects(input);
            
            // Add validation styling
            addValidationStyling(input);
        }
    });
}

function addFloatingLabelEffect(input) {
    const placeholder = input.getAttribute('placeholder');
    
    if (placeholder) {
        const label = document.createElement('label');
        label.className = 'floating-label';
        label.textContent = placeholder;
        label.setAttribute('for', input.id);
        
        input.parentNode.insertBefore(label, input.nextSibling);
        input.removeAttribute('placeholder');
        
        // Handle label animation
        input.addEventListener('focus', function() {
            label.classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                label.classList.remove('active');
            }
        });
        
        // Check if field has value on load
        if (input.value !== '') {
            label.classList.add('active');
        }
    }
}

function addFocusEffects(input) {
    input.addEventListener('focus', function() {
        this.parentNode.classList.add('focused');
        
        // Add glow effect
        this.style.boxShadow = '0 0 0 3px rgba(46, 125, 102, 0.1)';
        this.style.borderColor = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', function() {
        this.parentNode.classList.remove('focused');
        
        // Remove glow effect
        this.style.boxShadow = 'none';
        this.style.borderColor = 'var(--bg-secondary)';
    });
}

function addValidationStyling(input) {
    input.addEventListener('input', function() {
        validateField(this);
    });
    
    input.addEventListener('blur', function() {
        validateField(this);
    });
}

function setupFormEvents(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this);
    });
}

// ===============================
// CONTACT METHODS ANIMATION
// ===============================
function initContactMethodsAnimation() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach((method, index) => {
        // Add hover effects
        method.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
            
            // Animate icon
            const icon = this.querySelector('.method-icon img');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
            
            // Add glow effect
            this.style.boxShadow = '0 10px 30px rgba(46, 125, 102, 0.2)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
            
            // Reset icon
            const icon = this.querySelector('.method-icon img');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            // Reset glow effect
            this.style.boxShadow = '0 5px 15px var(--shadow)';
        });
        
        // Add click to copy functionality
        method.addEventListener('click', function() {
            const text = this.querySelector('.method-info p').textContent;
            copyToClipboard(text);
            showCopyNotification(this);
        });
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function showCopyNotification(element) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = 'Copied to clipboard!';
    
    element.appendChild(notification);
    
    // Animate notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// ===============================
// INTERSECTION OBSERVER
// ===============================
function initContactIntersectionObserver() {
    const contactSection = document.querySelector('.contact');
    const contactMethods = document.querySelectorAll('.contact-method');
    const contactForm = document.querySelector('.contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate contact methods
                contactMethods.forEach((method, index) => {
                    setTimeout(() => {
                        method.classList.add('animate-slideInLeft');
                    }, index * 150);
                });
                
                // Animate contact form
                if (contactForm) {
                    setTimeout(() => {
                        contactForm.classList.add('animate-slideInRight');
                    }, 300);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (contactSection) {
        observer.observe(contactSection);
    }
}

// ===============================
// FORM VALIDATION
// ===============================
function initContactValidation() {
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Name must contain only letters and spaces'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            required: true,
            minLength: 5,
            message: 'Subject must be at least 5 characters long'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Message must be at least 10 characters long'
        }
    };
    
    window.validationRules = validationRules;
}

function validateField(field) {
    const fieldName = field.getAttribute('name');
    const value = field.value.trim();
    const rules = window.validationRules[fieldName];
    
    if (!rules) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (rules.required && !value) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    // Min length validation
    if (isValid && rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rules.minLength} characters`;
    }
    
    // Pattern validation
    if (isValid && rules.pattern && !rules.pattern.test(value)) {
        isValid = false;
        errorMessage = rules.message;
    }
    
    // Update field styling
    updateFieldValidation(field, isValid, errorMessage);
    
    return isValid;
}

function updateFieldValidation(field, isValid, errorMessage) {
    const formGroup = field.parentNode;
    let errorElement = formGroup.querySelector('.error-message');
    
    // Remove existing error message
    if (errorElement) {
        errorElement.remove();
    }
    
    // Update field styling
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
        formGroup.classList.remove('has-error');
        formGroup.classList.add('has-success');
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
        formGroup.classList.remove('has-success');
        formGroup.classList.add('has-error');
        
        // Add error message
        if (errorMessage) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            formGroup.appendChild(errorElement);
        }
    }
}

function validateForm(form) {
    const fields = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// ===============================
// FORM SUBMISSION
// ===============================
function initContactSubmission() {
    // Setup form submission handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Validate form
    if (!validateForm(form)) {
        showFormMessage('Please fix the errors above', 'error');
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('loading');
    
    // Collect form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        simulateFormSubmission(data)
            .then(response => {
                if (response.success) {
                    showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                    form.reset();
                    resetFormFields(form);
                } else {
                    showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                }
            })
            .catch(error => {
                showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.classList.remove('loading');
            });
    }, 2000);
}

function simulateFormSubmission(data) {
    // Simulate API call
    return new Promise((resolve) => {
        // In a real application, you would send data to your server
        console.log('Form data:', data);
        
        // Simulate success (you can change this to test error handling)
        resolve({ success: true });
    });
}

function showFormMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    const contactForm = document.getElementById('contactForm');
    contactForm.insertBefore(messageElement, contactForm.firstChild);
    
    // Animate message
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 100);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 5000);
}

function resetFormFields(form) {
    const formGroups = form.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('.floating-label');
        
        if (input) {
            input.classList.remove('valid', 'error');
            group.classList.remove('has-success', 'has-error', 'focused');
            
            // Reset floating label
            if (label) {
                label.classList.remove('active');
            }
        }
        
        // Remove error messages
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

// ===============================
// CONTACT ANIMATIONS
// ===============================
function initContactAnimations() {
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactInfo) {
        contactInfo.addEventListener('mouseenter', function() {
            this.classList.add('animate-gentleWave');
        });
        
        contactInfo.addEventListener('mouseleave', function() {
            this.classList.remove('animate-gentleWave');
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('mouseenter', function() {
            this.classList.add('hover-glow');
        });
        
        contactForm.addEventListener('mouseleave', function() {
            this.classList.remove('hover-glow');
        });
    }
}

// ===============================
// CONTACT ACCESSIBILITY
// ===============================
function initContactAccessibility() {
    const contactMethods = document.querySelectorAll('.contact-method');
    const formFields = document.querySelectorAll('input, textarea');
    
    // Add ARIA labels to contact methods
    contactMethods.forEach(method => {
        const methodType = method.querySelector('.method-info h4').textContent;
        const methodValue = method.querySelector('.method-info p').textContent;
        
        method.setAttribute('aria-label', `${methodType}: ${methodValue}. Click to copy.`);
        method.setAttribute('role', 'button');
        method.setAttribute('tabindex', '0');
        
        // Add keyboard support
        method.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add form field accessibility
    formFields.forEach(field => {
        const fieldName = field.getAttribute('name');
        const label = document.querySelector(`label[for="${field.id}"]`);
        
        if (!label) {
            field.setAttribute('aria-label', fieldName.charAt(0).toUpperCase() + fieldName.slice(1));
        }
        
        // Add required attribute and aria-required
        if (window.validationRules[fieldName]?.required) {
            field.setAttribute('required', true);
            field.setAttribute('aria-required', 'true');
        }
    });
}

// Initialize all contact functionality
function initContact() {
    initContactForm();
    initContactMethodsAnimation();
    initContactIntersectionObserver();
    initContactValidation();
    initContactSubmission();
    initContactAnimations();
    initContactAccessibility();
    
    console.log('📧 Contact component fully initialized');
}

// Export contact functions
window.ContactComponent = {
    init: initContact,
    validateForm: validateForm,
    handleFormSubmission: handleFormSubmission,
    showFormMessage: showFormMessage
}; 