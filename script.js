// ===== Theme toggle =====
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') || 'auto';
  const next = current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== Mobile nav =====
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navList.style.display = expanded ? 'none' : 'flex';
});

// ===== Active link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-list a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 });
sections.forEach(s => observer.observe(s));

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
revealEls.forEach(el => revealObs.observe(el));

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Contact: open mail compose =====
function handleSubmit(e){
  e.preventDefault();
  const form = e.target;
  const name = encodeURIComponent(form.name.value);
  const email = encodeURIComponent(form.email.value);
  const subject = encodeURIComponent(form.subject.value || 'お問い合わせ');
  const message = encodeURIComponent(form.message.value + `\n\nFrom: ${form.name.value} <${form.email.value}>`);
  // Change 'you@example.com' to your email in index.html as well.
  const to = document.querySelector('a[href^="mailto:"]')?.getAttribute('href')?.replace('mailto:', '') || 'you@example.com';
  const mailto = `mailto:${to}?subject=${subject}&body=${message}`;
  window.location.href = mailto;
}
window.handleSubmit = handleSubmit;
