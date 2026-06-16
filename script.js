// ============================================================
// SOORYAA SURGICALS — Main JavaScript
// ============================================================

// ---- Mobile Nav ----
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    });
}

// ---- Active Nav Link ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// ---- Stats Counter Animation ----
function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) { start = target; clearInterval(timer); }
        el.textContent = Math.floor(start);
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.counter').forEach(el => {
                const target = parseInt(el.dataset.target);
                animateCounter(el, target, '+', 1800);
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) statsObserver.observe(statsSection);

// ---- Product Filter (products.html) ----
const filterBtns = document.querySelectorAll('.fbtn');
const catSections = document.querySelectorAll('.cat-section');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        catSections.forEach(sec => {
            if (filter === 'all' || sec.dataset.cat === filter) {
                sec.classList.remove('hidden');
            } else {
                sec.classList.add('hidden');
            }
        });
    });
});

// ---- Contact Form Submit ----
const form = document.querySelector('#contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#16a34a';
        setTimeout(() => {
            btn.innerHTML = '📤 Send Enquiry';
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.service-card, .pp-card, .prod-card, .why-feat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
});
