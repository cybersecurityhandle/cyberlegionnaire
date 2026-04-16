// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form — mailto fallback
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

// Animate elements into view
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('.service-card, .pillar, .info-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});
document.addEventListener('animationframe', () => {});
// Apply visible state via class
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);
