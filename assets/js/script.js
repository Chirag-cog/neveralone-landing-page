// Never Alone - Mental Wellness Platform JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add floating animation to wellness elements
    const floatingElements = document.querySelectorAll('.element');
    floatingElements.forEach((element, index) => {
        // Add random animation delays for natural movement
        element.style.animationDelay = `${index * 1.5}s`;
    });

    // WhatsApp CTA tracking (for analytics)
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track WhatsApp click events
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    event_category: 'engagement',
                    event_label: 'WhatsApp CTA'
                });
            }
            console.log('WhatsApp CTA clicked');
        });
    });

    // Emergency contact tracking
    const emergencyLinks = document.querySelectorAll('.emergency-link');
    emergencyLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'emergency_contact', {
                    event_category: 'crisis_support',
                    event_label: this.href.includes('tel:') ? 'Phone' : 'WhatsApp'
                });
            }
            console.log('Emergency contact clicked');
        });
    });

    // Support card interactions
    const supportCards = document.querySelectorAll('.support-card');
    supportCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Intersection Observer for fade-in animations
    const observeElements = document.querySelectorAll('.step, .feature, .support-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    observeElements.forEach(el => {
        observer.observe(el);
    });

    // Form validation helper (for future forms)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #6B93D6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Performance optimization: Debounce scroll events
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

    // Scroll progress indicator (optional)
    function updateScrollProgress() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        // You can add a scroll progress bar here if needed
        document.documentElement.style.setProperty('--scroll-progress', `${Math.min(scrolled, 100)}%`);
    }

    const debouncedScrollHandler = debounce(updateScrollProgress, 10);
    window.addEventListener('scroll', debouncedScrollHandler);

    // Error handling for missing elements
    function safeAddEventListener(selector, event, handler) {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    // Console welcome message
    console.log('🌱 Never Alone - Mental Wellness Platform Loaded');
    console.log('💙 Remember: You are never alone in your journey');
    
    // Preload important resources
    const importantImages = [
        // Add any critical images here when available
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Add gentle animations to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Mental wellness tip of the day (optional feature)
    const wellnessTips = [
        "Take three deep breaths when you feel overwhelmed.",
        "It's okay to not be okay. Seeking help is a sign of strength.",
        "Practice gratitude by writing down three things you're thankful for.",
        "Remember: This feeling is temporary. You will get through this.",
        "Small steps count. Progress isn't always linear."
    ];

    // You can use this to show daily tips in a toast or modal
    function showWellnessTip() {
        const tip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
        console.log('💡 Wellness Tip:', tip);
        // Implement UI display if needed
    }

    // Show tip after page loads (optional)
    // setTimeout(showWellnessTip, 3000);

    // Track page engagement
    let engagementTime = 0;
    const engagementInterval = setInterval(() => {
        engagementTime += 5;
        // Track every 30 seconds for analytics
        if (engagementTime % 30 === 0) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_engagement', {
                    event_category: 'engagement',
                    value: engagementTime
                });
            }
        }
    }, 5000);

    // Stop tracking on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(engagementInterval);
    });
});