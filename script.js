// =====================================================================
//  ポートフォリオ メインスクリプト
//  - モーフ式ハンバーガーメニューの開閉
//  - スクロールで要素をフェードイン（reveal）
//  - フッターの年号表示
//  - 連絡先フォームからメール作成（mailto）
// =====================================================================

// ===== モーフメニュー =====
const hamburger = document.querySelector('.hamburger-morph');
const morphNav  = document.getElementById('morph-menu');

function toggleMorph(open){
  if (!hamburger || !morphNav) return;
  const willOpen = (open === undefined) ? !hamburger.classList.contains('active') : open;
  hamburger.classList.toggle('active', willOpen);
  morphNav.classList.toggle('active', willOpen);
  hamburger.setAttribute('aria-expanded', String(willOpen));
  hamburger.setAttribute('aria-label', willOpen ? 'メニューを閉じる' : 'メニューを開く');
  morphNav.setAttribute('aria-hidden', String(!willOpen));
  document.body.style.overflow = willOpen ? 'hidden' : '';
  if (willOpen) morphNav.querySelector('.nav-morph__link')?.focus();
}

hamburger?.addEventListener('click', () => toggleMorph());
// 背景（オーバーレイ自身）クリックで閉じる
morphNav?.addEventListener('click', (e) => { if (e.target === morphNav) toggleMorph(false); });
// メニュー内リンクを押したら閉じる
morphNav?.addEventListener('click', (e) => {
  if (e.target instanceof HTMLElement && e.target.closest('.nav-morph__link')) toggleMorph(false);
});
// Esc で閉じる
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMorph(false); });

// ===== スクロールで reveal =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window){
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObs.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ===== フッターの年号 =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ===== 連絡先フォーム → メール作成 =====
function handleSubmit(e){
  e.preventDefault();
  const form = e.target;
  const subject = encodeURIComponent(form.subject.value || 'ポートフォリオからのお問い合わせ');
  const body = encodeURIComponent(
    `${form.message.value}\n\n― ${form.name.value} <${form.email.value}>`
  );
  const to = document.querySelector('a[href^="mailto:"]')
    ?.getAttribute('href')?.replace('mailto:', '') || 'ryutoiwa2929@gmail.com';
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}
window.handleSubmit = handleSubmit;
