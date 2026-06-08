/* =====================================================================
   岩崎 琉斗 — Portfolio / インタラクション
   - Lenis による滑らかスクロール
   - GSAP + ScrollTrigger によるリビール演出
   - カスタムカーソル / ローダー / マーキー
   yui540 のような「動き主体」の体験を目指した実装。
   ===================================================================== */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  // 年号
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // モーション控えめ設定なら、装飾的な演出はすべてスキップ
  if (reduce) {
    document.body.classList.remove('is-loading');
    return;
  }

  // ===== 行を <span> で包んでマスク用にする（data-lines） =====
  document.querySelectorAll('[data-lines]').forEach((el) => {
    const text = el.textContent.trim();
    el.innerHTML = '';
    // 句点・読点で意味の区切りを作りつつ行を生成
    const parts = text.split(/(?<=[、。])/).filter(Boolean);
    parts.forEach((p) => {
      const line = document.createElement('span');
      line.className = 'reveal-line';
      const inner = document.createElement('span');
      inner.textContent = p;
      line.appendChild(inner);
      el.appendChild(line);
    });
  });

  // ===== ヒーロー見出しを 1 文字ずつに分割 =====
  document.querySelectorAll('.hero__title [data-split]').forEach((el) => {
    const chars = [...el.textContent];
    el.textContent = '';
    chars.forEach((c) => {
      const s = document.createElement('span');
      s.textContent = c;
      el.appendChild(s);
    });
  });

  const start = () => {
    if (!window.gsap) return;
    const { gsap } = window;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    // ===== Lenis 滑らかスクロール =====
    if (window.Lenis && !isTouch) {
      const lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on('scroll', () => window.ScrollTrigger && window.ScrollTrigger.update());
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      // アンカーリンクを Lenis 経由でスクロール
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href');
          if (id.length > 1) { e.preventDefault(); lenis.scrollTo(id, { offset: 0 }); }
        });
      });
    }

    // ===== ヒーロー入場 =====
    const heroChars = document.querySelectorAll('.hero__title .line span');
    const tl = gsap.timeline();
    tl.to(heroChars, { y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.045 })
      .to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.9')
      .to('.hero__lede', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7');

    // ===== セクションタイトルのリビール =====
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
      gsap.from(el, {
        y: 60, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    // ===== data-fade =====
    document.querySelectorAll('[data-fade]').forEach((el) => {
      if (el.closest('.hero')) return; // ヒーロー内はタイムラインで処理済み
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    // ===== 行マスクのリビール =====
    document.querySelectorAll('[data-lines]').forEach((el) => {
      gsap.from(el.querySelectorAll('.reveal-line > span'), {
        yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    // ===== Works を 1 件ずつ =====
    document.querySelectorAll('[data-work]').forEach((el) => {
      gsap.from(el, {
        opacity: 0, y: 50, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });

    // ===== マーキー（スクロール速度に反応） =====
    const track = document.querySelector('.marquee__track');
    if (track) {
      const half = track.scrollWidth / 2;
      const loop = gsap.to(track, { x: -half, duration: 18, ease: 'none', repeat: -1 });
      if (window.ScrollTrigger) {
        let dir = 1;
        window.ScrollTrigger.create({
          onUpdate: (self) => {
            const v = self.getVelocity();
            if (v !== 0) dir = v < 0 ? -1 : 1;
            gsap.to(loop, { timeScale: dir * (1 + Math.min(Math.abs(v) / 400, 4)), duration: 0.4, overwrite: true });
            gsap.to(loop, { timeScale: dir * 1, duration: 0.8, delay: 0.4, overwrite: false });
          },
        });
      }
    }

    // ===== ヒーロータイトルの視差 =====
    if (window.ScrollTrigger) {
      gsap.to('.hero__title', {
        yPercent: 24, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  };

  // ===== カスタムカーソル =====
  const cursor = document.getElementById('cursor');
  if (cursor && !isTouch) {
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    const ringAfter = ring;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
    const raf = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(raf); };
    raf();
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      const mode = el.getAttribute('data-cursor');
      el.addEventListener('mouseenter', () => {
        cursor.classList.add(mode === 'view' ? 'is-view' : 'is-hover');
        if (mode === 'view') ringAfter.setAttribute('data-label', 'VIEW');
      });
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover', 'is-view'));
    });
  }

  // ===== 作品プレビュー（カーソル追従） =====
  const preview = document.getElementById('worksPreview');
  if (preview && !isTouch) {
    const pImg = preview.querySelector('img');
    let px = innerWidth / 2, py = innerHeight / 2, cx = px, cy = py;
    const lerp = () => {
      cx += (px - cx) * 0.14; cy += (py - cy) * 0.14;
      preview.style.left = cx + 'px'; preview.style.top = cy + 'px';
      requestAnimationFrame(lerp);
    };
    lerp();
    addEventListener('mousemove', (e) => { px = e.clientX; py = e.clientY; });
    document.querySelectorAll('[data-preview]').forEach((el) => {
      const src = el.getAttribute('data-preview');
      el.addEventListener('mouseenter', () => {
        if (pImg.getAttribute('src') !== src) pImg.setAttribute('src', src);
        preview.classList.add('is-visible');
      });
      el.addEventListener('mouseleave', () => preview.classList.remove('is-visible'));
    });
  }

  // ===== ローダー =====
  const loader = document.getElementById('loader');
  const numEl = document.getElementById('loaderNum');
  const barEl = document.getElementById('loaderBar');
  let loadFinished = false;
  function finishLoad() {
    if (loadFinished) return;
    loadFinished = true;
    document.body.classList.remove('is-loading');
    if (loader) {
      loader.classList.add('is-done');
      // カーテンが上がりきったら DOM から除去（写り込み・残留を防ぐ）
      setTimeout(() => loader.remove(), 1100);
    }
    start();
  }
  if (loader && numEl && barEl) {
    let p = 0;
    const tick = () => {
      p += Math.max(1.4, (100 - p) * 0.085);
      if (p >= 100) p = 100;
      numEl.textContent = Math.floor(p);
      barEl.style.width = p + '%';
      if (p < 100) {
        setTimeout(tick, 55);
      } else {
        setTimeout(finishLoad, 400);
      }
    };
    // フォント等の読み込みを少し待ってから開始
    setTimeout(tick, 250);
    // セーフティ: 6 秒で強制解除
    setTimeout(() => { if (document.body.classList.contains('is-loading')) finishLoad(); }, 6000);
  } else {
    finishLoad();
  }
})();
