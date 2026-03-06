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
const revealElements = document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3, .reveal-right');

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
// Contact Form Submission
// =====================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch('https://formspree.io/f/xeeldrlq', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' },
        });

        if (response.ok) {
            formSuccess.classList.add('show');
            contactForm.reset();
            setTimeout(() => formSuccess.classList.remove('show'), 5000);
        } else {
            alert('There was a problem sending your message. Please try again.');
        }
    } catch (error) {
        alert('There was a problem sending your message. Please check your connection and try again.');
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
// FAQ Accordion
// =====================
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const faqItem = btn.closest('.faq-item');
        const isOpen = faqItem.classList.contains('open');

        // Close all open items
        document.querySelectorAll('.faq-item.open').forEach(item => {
            item.classList.remove('open');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked item if it wasn't already open
        if (!isOpen) {
            faqItem.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
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

// =====================
// Scroll Progress Bar
// =====================
const scrollProgressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgressBar.style.width = ((scrollTop / scrollHeight) * 100) + '%';
}, { passive: true });

// =====================
// Parallax Hero
// =====================
const heroImg = document.querySelector('.hero-background img');
if (heroImg) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset < window.innerHeight) {
            heroImg.style.transform = `translateY(${window.pageYOffset * 0.35}px)`;
        }
    }, { passive: true });
}

// =====================
// 3D Card Tilt Effect (desktop only)
// =====================
if (window.matchMedia('(hover: hover)').matches) {
    function initTilt(selector) {
        document.querySelectorAll(selector).forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
                card.style.willChange = 'transform';
            });
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const rotX = ((y - cy) / cy) * -6;
                const rotY = ((x - cx) / cx) * 6;
                card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.02)`;
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
                card.style.transform = '';
                card.style.boxShadow = '';
                setTimeout(() => { card.style.willChange = ''; }, 500);
            });
        });
    }
    initTilt('.service-card');
    initTilt('.benefit-card');
    initTilt('.testimonial-card');
}

// =====================
// Animated Stats Counters
// =====================
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function runCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const startTime = performance.now();
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.textContent = Math.round(easeOutCubic(progress) * target);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            statsSection.querySelectorAll('.stat-number').forEach(runCounter);
            counterObserver.disconnect();
        }
    }, { threshold: 0.5 });
    counterObserver.observe(statsSection);
}


// =====================
// Magnetic Buttons (desktop only)
// =====================
if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.button-primary, .cta-button').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2 - 2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
            btn.style.transform = '';
            setTimeout(() => { btn.style.transition = ''; }, 450);
        });
    });
}

// =====================
// Lightbox Functions
// =====================
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// =====================
// Hide Elfsight Branding Badge
// =====================
(function () {
    function hideBadge() {
        const badge = Array.from(document.querySelectorAll('a')).find(
            a => a.getAttribute('href') && a.getAttribute('href').includes('elfsight.com')
        );
        if (!badge) return false;

        badge.style.setProperty('display', 'none', 'important');

        // Elfsight re-applies inline styles after render — watch and re-hide each time
        const attrObserver = new MutationObserver(() => {
            if (badge.style.getPropertyValue('display') !== 'none') {
                badge.style.setProperty('display', 'none', 'important');
            }
        });
        attrObserver.observe(badge, { attributes: true, attributeFilter: ['style'] });
        return true;
    }

    if (!hideBadge()) {
        const domObserver = new MutationObserver(() => {
            if (hideBadge()) domObserver.disconnect();
        });
        domObserver.observe(document.body, { childList: true, subtree: true });
    }
})();