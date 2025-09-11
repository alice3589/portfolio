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

/// === Morph menu ===
const hamburger = document.querySelector('.hamburger-morph');
const morphNav  = document.getElementById('morph-menu');
const morphList = morphNav?.querySelector('.nav-morph__list');

// 1) #nav-list から項目を複製（文字はそのまま）
const srcLinks = document.querySelectorAll('#nav-list a');
if (morphList && srcLinks.length){
  morphList.innerHTML = '';
  srcLinks.forEach(a => {
    const li = document.createElement('li');
    li.className = 'nav-morph__item';
    const link = document.createElement('a');
    link.className = 'nav-morph__link';
    link.href = a.getAttribute('href') || '#';
    link.textContent = a.textContent?.trim() || '';
    li.appendChild(link);
    morphList.appendChild(li);
  });
}

function toggleMorph(open){
  const willOpen = open ?? !hamburger.classList.contains('active');
  hamburger.classList.toggle('active', willOpen);
  morphNav?.classList.toggle('active', willOpen);
  hamburger.setAttribute('aria-expanded', String(willOpen));
  morphNav?.setAttribute('aria-hidden', String(!willOpen));
  document.body.style.overflow = willOpen ? 'hidden' : '';
  if (willOpen) morphNav?.querySelector('.nav-morph__link')?.focus();
}

hamburger?.addEventListener('click', () => toggleMorph());
morphNav?.addEventListener('click', (e) => { if (e.target === morphNav) toggleMorph(false); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMorph(false); });
// 2) メニュー内リンクを押したら閉じる
morphNav?.addEventListener('click', (e) => {
  const t = e.target;
  if (t instanceof HTMLElement && t.closest('.nav-morph__link')) toggleMorph(false);
});


// ===== Active link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list a');

const setActive = (id) => {
  navLinks.forEach(a => {
    const onThis = a.getAttribute('href') === `#${id}`;
    a.classList.toggle('active', onThis);
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-list a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      setActive(id);
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 });
sections.forEach(s => observer.observe(s));

const aboutEl = document.getElementById('about');
const headOffset = 100;

function maybeDefaultToAbout(){
  if (!aboutEl) return;
  const aboutTop = aboutEl.getBoundingClientRect().top + window.scrollY;
  if (window.scrollY <= Math.max(10, aboutTop - headOffset)) {
    setActive('about');
  }
}
window.addEventListener('scroll', maybeDefaultToAbout, {passive: true});
window.addEventListener('load', maybeDefaultToAbout);
window.addEventListener('hashchange', () => {
  if (location.hash === '' || location.hash === '#top') setActive('about');
});

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

// === 背景切り替え（bg1/bg2/bg3 専用） ===
const BG_KEY   = 'bg-img-url';
const BG_LIST  = [
  'assets/images/bg1.webp',
  'assets/images/bg2.webp',
  'assets/images/bg3.webp'
];

const bgPanel  = document.getElementById('bg-panel');
const bgBtn    = document.getElementById('bg-switcher');

function applyBg(url){
  document.documentElement.style.setProperty('--bg-img', `url("${url}")`);
  localStorage.setItem(BG_KEY, url);
}

// 保存復元（不正値なら bg1 にフォールバック）
const savedBg = localStorage.getItem(BG_KEY);
applyBg(BG_LIST.includes(savedBg) ? savedBg : BG_LIST[0]);

bgBtn?.addEventListener('click', () => {
  const open = bgPanel.hasAttribute('hidden');
  if (open) {
    bgPanel.removeAttribute('hidden');
    bgBtn.setAttribute('aria-expanded', 'true');
  } else {
    bgPanel.setAttribute('hidden', '');
    bgBtn.setAttribute('aria-expanded', 'false');
  }
});

bgPanel?.querySelectorAll('.bg-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-bg');
    if (BG_LIST.includes(url)) applyBg(url);
    bgPanel.setAttribute('hidden','');
    bgBtn.setAttribute('aria-expanded','false');
  });
});

document.addEventListener('click', (e) => {
  if (!bgPanel || !bgBtn) return;
  const inside = bgPanel.contains(e.target) || bgBtn.contains(e.target);
  if (!inside) { bgPanel.setAttribute('hidden',''); bgBtn.setAttribute('aria-expanded','false'); }
});

