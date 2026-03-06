// =====================
// GSAP + ScrollTrigger
// =====================
gsap.registerPlugin(ScrollTrigger);

// =====================
// Lenis Smooth Scroll
// =====================
const lenis = new Lenis({
    duration: 1.25,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// =====================
// Sparkle Burst on Benefit Icon Enter
// =====================
function sparkleIcon(iconEl) {
    if (!iconEl || iconEl._sparkled) return;
    iconEl._sparkled = true;

    const colors = ['#0066CC', '#38bdf8', '#7dd3fc', '#BAE6FD', '#ffffff', '#e0f2fe', '#fbbf24'];
    const N = 10;

    for (let i = 0; i < N; i++) {
        const dot    = document.createElement('span');
        const angle  = (i / N) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const dist   = 28 + Math.random() * 32;
        const tx     = Math.cos(angle) * dist;
        const ty     = Math.sin(angle) * dist;
        const dur    = 0.48 + Math.random() * 0.44;
        const color  = colors[i % colors.length];
        const size   = 3 + Math.random() * 4;

        dot.style.cssText = `
            position:absolute;top:50%;left:50%;
            width:${size}px;height:${size}px;
            border-radius:50%;
            background:${color};
            box-shadow:0 0 ${size * 2}px ${color};
            pointer-events:none;z-index:20;
            --tx:${tx}px;--ty:${ty}px;--dur:${dur}s;
        `;

        iconEl.style.overflow = 'visible';
        iconEl.appendChild(dot);

        // Tiny delay so CSS transition has a frame to start from
        requestAnimationFrame(() => dot.classList.add('sparkle-dot', 'animate'));
        setTimeout(() => dot.remove(), (dur + 0.2) * 1000);
    }
}

document.querySelectorAll('.benefit-card').forEach(card => {
    ScrollTrigger.create({
        trigger: card,
        start: 'top 86%',
        once: true,
        onEnter: () => sparkleIcon(card.querySelector('.benefit-icon')),
    });
});

// =====================
// Liquid Ripple on Buttons
// =====================
document.querySelectorAll('.button-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top  = (e.clientY - rect.top)  + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 760);
    });
});

// =====================
// Nav Iridescent Shimmer on Scroll
// =====================
const navEl = document.getElementById('nav');
let prevScrollY = window.scrollY;
let shimmerTimer = null;

window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (navEl && Math.abs(sy - prevScrollY) > 55) {
        prevScrollY = sy;
        navEl.classList.remove('iridescent');
        void navEl.offsetWidth; // force reflow to restart animation
        navEl.classList.add('iridescent');
        clearTimeout(shimmerTimer);
        shimmerTimer = setTimeout(() => navEl.classList.remove('iridescent'), 1700);
    }
}, { passive: true });

// =====================
// Nav Link Magnetic Hover
// =====================
if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mousemove', e => {
            const r = link.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width  / 2) * 0.28;
            const y = (e.clientY - r.top  - r.height / 2) * 0.38;
            link.style.transform  = `translate(${x}px, ${y}px)`;
            link.style.transition = 'transform 0.1s ease';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform  = '';
            link.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });
}

// =====================
// Light Ray / Glare Sweep on Scroll
// =====================
['services', 'why-choose', 'testimonials', 'faq', 'contact'].forEach(id => {
    const sec = document.getElementById(id) || document.querySelector('.' + id);
    if (!sec) return;
    const glare = document.createElement('div');
    glare.className = 'glare-overlay';
    sec.appendChild(glare);
});

let glareRaf = null;
function updateGlare() {
    const vh = window.innerHeight;
    document.querySelectorAll('.glare-overlay').forEach(g => {
        const rect = g.parentElement.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
            const prog   = 1 - (rect.bottom / (rect.height + vh));
            const clamped = Math.max(0, Math.min(1, prog));
            g.style.left = (-40 + clamped * 180) + '%';
        }
    });
}

window.addEventListener('scroll', () => {
    if (!glareRaf) glareRaf = requestAnimationFrame(() => { updateGlare(); glareRaf = null; });
}, { passive: true });

updateGlare();
