// =====================
// Navigation Scroll Effect
// =====================
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// =====================
// Mobile Navigation Toggle
// =====================
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// =====================
// Smooth Scroll to Sections
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================
// Intersection Observer for Reveal Animations
// =====================
const revealElements = document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// =====================
// Contact Form Submission (Formspree)
// =====================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success message
            formSuccess.classList.add('show');
            contactForm.reset();
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        } else {
            alert('There was an error submitting the form. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again.');
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// =====================
// Click-to-Call Tracking (Analytics)
// =====================
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Click-to-call initiated');
        // You can add analytics tracking here
        // Example: gtag('event', 'click_to_call', { phone_number: link.href });
    });
});

// =====================
// Email Click Tracking (Analytics)
// =====================
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Email link clicked');
        // You can add analytics tracking here
        // Example: gtag('event', 'email_click', { email: link.href });
    });
});

// =====================
// Service Card Hover Effects (Optional Enhancement)
// =====================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '4px solid var(--color-primary)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

// =====================
// Lazy Loading for Images (when you add real images)
// =====================
// Uncomment and use when you add actual images:
/*
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
*/

// =====================
// Performance: Reduce Motion for Users Who Prefer It
// =====================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-right').forEach(element => {
        element.classList.add('active');
    });
}

// =====================
// Claim Offer Button - Auto-fill Promo Code
// =====================
document.querySelectorAll('.spring-special .button-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Prevent default if it's a link
        e.preventDefault();
        
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Fill in the promo code after scrolling
            setTimeout(() => {
                const promoInput = document.getElementById('promo');
                if (promoInput) {
                    promoInput.value = 'FIRST50';
                    promoInput.focus();
                }
            }, 500);
        }
    });
});

// =====================
// Initialize on Load
// =====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Purl Window Cleaning website loaded successfully! 🪟✨');
});