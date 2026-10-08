// NovaClean — поведінка сторінок
// ---------- Навігація ----------
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

function onScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

function setMenu(open) {
    if (!hamburger || !navMenu) return;
    navMenu.classList.toggle('active', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', (open ? hamburger.dataset.labelClose : hamburger.dataset.labelOpen) || '');
}
if (hamburger) {
    hamburger.addEventListener('click', () => setMenu(!navMenu.classList.contains('active')));
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    window.matchMedia('(min-width: 901px)').addEventListener('change', () => setMenu(false));
}

// ---------- Поява елементів при прокручуванні ----------
// Блоки, що вже в зоні видимості (або вище неї), показуються миттєво — без прозорості та пауз.
// Решта з'являється з випередженням: observer спрацьовує за 60px до входу в екран.
const revealEls = document.querySelectorAll('.reveal');

function show(el, instant, step = 0) {
    if (instant) el.classList.add('instant');
    else if (step) {
        // дуже легкий каскад: +140мс на кожен наступний блок, максимум 560мс
        el.style.transitionDelay = `${Math.min(step * 140, 560)}ms`;
        setTimeout(() => { el.style.transitionDelay = ''; }, 1600);
    }
    el.classList.add('in');
    if (instant) requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('instant')));
}

if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        let step = 0;
        entries.forEach(entry => {
            const above = entry.boundingClientRect.top < 0;
            if (entry.isIntersecting || above) {
                // above: блок пропущено швидким скролом, переходом за якорем або відновленням позиції
                const instant = above && !entry.isIntersecting;
                show(entry.target, instant, instant ? 0 : step++);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px 60px 0px' });
    revealEls.forEach(el => io.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('in'));
}

// ---------- Підменю продукції: активний розділ ----------
const subnavLinks = document.querySelectorAll('.subnav a[href^="#"]');
if (subnavLinks.length && 'IntersectionObserver' in window) {
    const map = new Map();
    subnavLinks.forEach(a => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) map.set(t, a);
    });
    const so = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                subnavLinks.forEach(a => a.classList.remove('is-active'));
                map.get(entry.target).classList.add('is-active');
            }
        });
    }, { rootMargin: '-35% 0px -60% 0px' });
    map.forEach((_, el) => so.observe(el));
}

// ---------- Форма контактів ----------
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    if (type === 'success') {
        setTimeout(() => { formMessage.className = 'form-message'; }, 5000);
    }
}

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(contactForm));

        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage(contactForm.dataset.errRequired, 'error');
            return;
        }
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(data.email)) {
            showFormMessage(contactForm.dataset.errEmail, 'error');
            return;
        }

        // Імітація відправки (як і в оригінальному сайті).
        // Для реальної відправки підключіть серверний обробник:
        // fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        showFormMessage(contactForm.dataset.success, 'success');
        contactForm.reset();
    });
}
