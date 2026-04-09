/* =============================================
   THE RODEO SHOWCASE — MAIN JS
   ============================================= */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- MOBILE NAV TOGGLE ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- FAQ ACCORDION ----
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // Close all
    document.querySelectorAll('.faq__question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    // Open clicked (unless it was already open)
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

// ---- FADE-IN ON SCROLL (IntersectionObserver) ----
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ---- REGISTRATION FORM ----
const registerForm = document.getElementById('registerForm');
const formConfirmation = document.getElementById('formConfirmation');

if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const required = registerForm.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#f00000';
        valid = false;
      }
    });

    if (!valid) return;

    registerForm.style.display = 'none';
    formConfirmation.style.display = 'block';
    formConfirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const required = contactForm.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#f00000';
        valid = false;
      }
    });

    if (!valid) return;

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.disabled = true;
    btn.style.background = '#2a6e2a';
    btn.style.borderColor = '#2a6e2a';

    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 4000);
  });
}

// ---- SMOOTH SCROLL for anchor nav ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- ACTIVE NAV LINK on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinkEls.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? '#f00000' : '';
  });
});
