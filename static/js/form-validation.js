// ============================================
// FORM VALIDATION & ENHANCEMENT
// ============================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    // Show validation errors on blur
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            // Clear error when user starts typing
            const errorMessage = input.parentElement.querySelector('.form-error');
            if (errorMessage && input.value.trim()) {
                errorMessage.style.display = 'none';
            }
        });
    });
    
    // Validate on submit
    contactForm.addEventListener('submit', (e) => {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Re-enable after form submission
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            e.preventDefault();
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    
    // Check if empty
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Check email format
    if (fieldType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email');
            return false;
        }
    }
    
    // Check minimum lengths
    if (field.name === 'name' && value.length < 2) {
        showFieldError(field, 'Name must be at least 2 characters');
        return false;
    }
    
    if (field.name === 'subject' && value.length < 3) {
        showFieldError(field, 'Subject must be at least 3 characters');
        return false;
    }
    
    if (field.name === 'message' && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters');
        return false;
    }
    
    // Clear any existing errors
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('span');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    
    field.parentElement.appendChild(errorElement);
    field.classList.add('error');
}

function clearFieldError(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

// Close message alerts
document.querySelectorAll('.message-close').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.style.display = 'none';
    });
});

// Auto-close success messages after 5 seconds
document.querySelectorAll('.message-success').forEach(msg => {
    setTimeout(() => {
        msg.style.display = 'none';
    }, 5000);
});