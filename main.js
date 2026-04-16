// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Mobile dropdown toggle (tap to open)
document.querySelectorAll('.has-dropdown > a').forEach(a => {
  a.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      a.parentElement.classList.toggle('open');
    }
  });
});

// Service tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    // Re-trigger animations for newly visible cards
    document.querySelectorAll('#tab-' + tab.dataset.tab + ' .service-card').forEach(el => {
      el.classList.remove('visible');
      requestAnimationFrame(() => requestAnimationFrame(() => observer.observe(el)));
    });
  });
});

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
document.querySelectorAll('.service-card, .pillar, .info-card').forEach(el => {
  observer.observe(el);
});

// Contact form → mailto
document.getElementById('contactForm').addEventListener('submit', e => {
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
