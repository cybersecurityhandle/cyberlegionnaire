// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Animate elements into view
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.08 }
);
document.querySelectorAll('.service-card, .pillar, .info-card, .teaser-card').forEach(el => {
  observer.observe(el);
});

// Contact form → mailto
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('name').value;
    const org     = document.getElementById('org').value;
    const email   = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    const subject = encodeURIComponent(`CyberLegionnaire Inquiry — ${service || 'General'}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nOrganization: ${org}\nEmail: ${email}\nService: ${service}\n\n${message}`
    );
    window.location.href = `mailto:info@cyberlegionnaire.com?subject=${subject}&body=${body}`;
  });
}
