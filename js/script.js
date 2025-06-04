// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeLoading();
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollEffects();
    initializeFormHandling();
    initializeAnimations();
    initializeThemeToggle();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Smooth scroll with offset for fixed navbar
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing Effect
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const text = "Hi, I'm Mohan Ram Majhi";
    let index = 0;
    
    typingElement.textContent = '';
    
    function typeWriter() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            // Add blinking cursor
            typingElement.innerHTML += '<span class="cursor">|</span>';
            
            // Add CSS for blinking cursor
            const style = document.createElement('style');
            style.textContent = `
                .cursor {
                    animation: blink 1s infinite;
                }
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add initial styles and observe elements
    const animatedElements = document.querySelectorAll('.about-content, .cv-content, .blog-card, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Parallax effect for floating shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Create mailto link as fallback
            setTimeout(() => {
                const subject_encoded = encodeURIComponent(subject);
                const body_encoded = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                const mailtoLink = `mailto:reachout.mohan9@gmail.com?subject=${subject_encoded}&body=${body_encoded}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Reset form
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                showNotification('Email client opened! Please send the email to complete your message.', 'success');
            }, 1500);
        });
    }
    
    // Enhanced form styling
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
                max-width: 400px;
            }
            .notification-success { border-left: 4px solid #10b981; }
            .notification-error { border-left: 4px solid #ef4444; }
            .notification-info { border-left: 4px solid #3b82f6; }
            .notification-close {
                background: none;
                border: none;
                color: #6b7280;
                cursor: pointer;
                margin-left: auto;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Additional Animations
function initializeAnimations() {
    // Animate skill tags on hover
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Animate contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // CV download functionality
    window.downloadCV = function() {
        // Create a simple text version of the CV
        const cvContent = `
MOHAN RAM MAJHI
Nayabazzar, Kathmandu, Nepal
Phone: 9826841278
Email: reachout.mohan9@gmail.com

OBJECTIVE
Dedicated Bachelor's student in Information Technology with a strong foundation in computer applications. Passionate about learning, adapting to new environments, and continuously growing both academically and professionally.

EDUCATION
Bachelor of Information Technology (BIT), 1st Semester
Himalayan Whitehouse International College, Kathmandu
2024 – Present
• Studying IT fundamentals and modern technologies

Intermediate (+2) in Management
Peoples Campus, Paknajol, Kathmandu
2022 – 2024
• Completed science education

SKILLS
Technical Skills:
• Microsoft Office (Word, Excel, PowerPoint)
• Fast and accurate typing
• Data entry

Soft Skills:
• Attention to detail
• Time management
• Teamwork
• Problem-solving
• Organisational skills

LANGUAGES
• Nepali: Native
• English: Fluent
        `;
        
        // Create blob and download
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Mohan_Ram_Majhi_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification('CV downloaded successfully!', 'success');
    };
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', function() {
    let scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.id = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.onclick = scrollToTop;
        
        // Add styles
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            z-index: 1000;
        `;
        
        scrollToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.1)';
            this.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
        });
        
        scrollToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
        });
        
        document.body.appendChild(scrollToTopBtn);
    }
    
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        scrollToTopBtn.style.transform = 'translateY(20px)';
    }
});

// Performance optimization - lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initializeLazyLoading();

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply theme with smooth transition
        document.documentElement.style.transition = 'all 0.3s ease';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme, themeIcon);
        
        // Remove transition after animation completes
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
        
        // Add a subtle animation to the toggle button
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

function updateThemeIcon(theme, iconElement) {
    if (theme === 'dark') {
        iconElement.className = 'fas fa-sun';
    } else {
        iconElement.className = 'fas fa-moon';
    }
}

// Enhanced notification function for theme changes
function showThemeNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.innerHTML = `
        <i class="fas fa-palette"></i>
        <span>${message}</span>
    `;
    
    // Add styles for theme notification
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--surface);
        color: var(--text-primary);
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        animation: slideInTheme 0.3s ease-out;
        border: 1px solid var(--border);
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#theme-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'theme-notification-styles';
        style.textContent = `
            @keyframes slideInTheme {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .theme-transition * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 2 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInTheme 0.3s ease-out reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 2000);
}
