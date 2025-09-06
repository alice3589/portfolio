// スプラッシュ（オープニングシャッター）
// 必須：headに gsap v3 を読み込んでおくこと
document.addEventListener('DOMContentLoaded', () => {
    // ユーザーが「動きを減らす」を設定→スキップ
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.getElementById('splash')?.remove();
      return;
    }
  
    const splash    = document.getElementById('splash');
    if (!splash) return;
  
    const cat       = splash.querySelector('.cat');
    const head      = splash.querySelector('.head');
    const eyes      = splash.querySelectorAll('.eyes circle');
    const eyel      = splash.querySelectorAll('.eyes-l');
    const eyer      = splash.querySelectorAll('.eyes-r');
    const ears      = splash.querySelectorAll('.ears');
    const earsl     = splash.querySelector('.ears-l');
    const earsr     = splash.querySelector('.ears-r');
    const tail      = splash.querySelector('.tail');
    const backlegs  = splash.querySelector('.backlegs');
    const frontlegs = splash.querySelector('.frontlegs');
    const frontlegs1= splash.querySelector('.frontlegs1');
    const backcircle= splash.querySelector('.body-backcircle');
    const frontcircle=splash.querySelector('.body-frontcircle');
    const bodybetween=splash.querySelector('.body-between');
    const logo      = splash.querySelector('.logoani');
    const logofix   = splash.querySelector('.logo');
    const resetBtn  = splash.querySelector('.restart');
    const aniWrap   = splash.querySelector('.animation-wrapper');
  
    function setInitial(){
      gsap.set([head, eyes, ears], {y:20, x:30});
      gsap.set(backcircle, {y:35, x:40});
      gsap.set(cat, {opacity: 1});
      gsap.set(bodybetween, {scaleX: 0.5, y:35, x:45, rotation: 0});
      gsap.set(frontcircle, {y:35, x:10});
      gsap.set(head, {y:20});
      gsap.set(eyel, {scaleY:1});
      gsap.set(eyer, {scaleY:1});
      gsap.set(ears, {y:20});
      gsap.set(tail, {y:110, x:30, rotation:0});
      gsap.set(backlegs, {rotation:-100, y:55, x:50});
      gsap.set(frontlegs, {y:0, x:0, rotation:0});
      gsap.set(logo, {opacity: 1, x:0, y:0, rotation: 0});
      gsap.set(earsl, {x:0, y:0, rotation: 0});
      gsap.set(earsr, {x:0, y:0, rotation: 0});
    }
  
    function finishSplash(){
      // ロゴの見せ演出（必要なら）
      logofix?.classList.add('visible');
      resetBtn?.classList.add('visible');
      aniWrap?.classList.add('notvisible');
  
      // 少し見せてからフェード→削除
      gsap.to(splash, {
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        ease: 'power2.out',
        onComplete(){
          splash.remove();
          document.body.style.overflow = ''; // 念のため解除
        }
      });
    }
  
    function runAnimation(){
      setInitial();
  
      const tl = gsap.timeline({ delay: 0.5, onComplete: finishSplash });
      const tleyes = gsap.timeline({ delay: 1.5, repeat: 3, repeatDelay: 1 });
  
      tl.to([head, eyes, ears], {duration:0.2, y:45, x:30})
        .addLabel('twink')
        .to(eyel, {duration:0.1, scaleY:1, y:45}, 'twink-=0.1')
        .to(eyel, {duration:0.1, scaleY:0.1, y:55}, 'twink')
        .to(eyel, {duration:0.1, scaleY:1, y:45}, 'twink+=0.1')
        .to(eyer, {duration:0.1, scaleY:0.1, y:55}, 'twink')
        .to(eyer, {duration:0.1, scaleY:1, y:45}, 'twink+=0.1')
        .to(earsl,{duration:0.1, y:8,  x:-5,  rotation:-20}, 'twink+=0.1')
        .to(earsr,{duration:0.1, y:16, x:-15, rotation:-60}, 'twink+=0.1')
        .set(frontlegs, {opacity:1}, '+=0.5')
        .to(frontlegs1,{duration:0.1, y:35, x:15, rotation:-60})
        .to(logo,      {duration:0.1, x:5})
        .to(frontlegs1,{duration:0.1, y:35, x:5,  rotation:-60})
        .to(frontlegs1,{duration:0.1, y:35, x:15, rotation:-60})
        .to(logo,      {duration:0.3, x:10})
        .to(frontlegs1,{duration:0.1, y:35, x:-5, rotation:-60})
        .to(frontlegs1,{duration:0.1, y:35, x:25, rotation:-60}, '+=0.5')
        .to(logo,      {duration:0.1, x:12})
        .to(frontlegs1,{duration:0.1, y:35, x:5,  rotation:-60})
        .to(frontlegs1,{duration:0.1, y:35, x:25, rotation:-60})
        .to(logo,      {duration:0.3, x:17})
        .to(frontlegs1,{duration:0.1, y:35, x:-5, rotation:-60})
        .to(frontlegs1,{duration:0.1, y:35, x:35, rotation:-60})
        .to(logo,      {duration:0.1, x:20})
        .to(frontlegs1,{duration:0.1, y:35, x:-5, rotation:-60})
        .to(frontlegs1,{duration:0.1, y:30, x:30, rotation:-60, scaleY:1.2})
        .to(logo,      {duration:0.5, x:30})
        .to(logo,      {duration:0.1, rotation:10})
        .to(frontlegs1,{duration:0.1, y:35, x:-15, rotation:-60, scaleY:1})
        .addLabel('wiggle')
        .to([head, eyes, ears], {duration:0.1, y:48}, 'wiggle')
        .to(earsl,{duration:0.1, y:10, x:-5,  rotation:-20}, 'wiggle')
        .to(earsr,{duration:0.1, y:18, x:-15, rotation:-60}, 'wiggle')
        .to(backcircle,{duration:0.1, y:30, x:40}, 'wiggle-=0.2')
        .to(backcircle,{duration:0.1, y:30, x:37}, 'wiggle-=0.1')
        .to(backcircle,{duration:0.1, y:35, x:40}, 'wiggle')
        .to(backcircle,{duration:0.1, y:30, x:40})
        .to(backcircle,{duration:0.1, y:30, x:37})
        .to(backcircle,{duration:0.1, y:35, x:40})
        .to(backcircle,{duration:0.1, y:30, x:40})
        .to(backcircle,{duration:0.1, y:30, x:37})
        .to(backcircle,{duration:0.1, y:35, x:40})
        .addLabel('logowiggle')
        .to(frontlegs1,{duration:0.1, y:35, x:30, rotation:-60, scaleY:1.25}, 'logowiggle-=0.1')
        .to(logo,      {duration:0.1, rotation:60, x:70}, 'logowiggle')
        .to(logo,      {duration:0.5, y:50}, 'logowiggle+=0.1')
        .to(logo,      {duration:0.1, rotation:120}, 'logowiggle+=0.1')
        .to(logo,      {duration:0.1, rotation:270}, 'logowiggle+=0.2')
        .to(logo,      {duration:0.5, y:550, x:90}, 'logowiggle+=0.2')
        .to(logo,      {duration:0.5, opacity:0}, 'logowiggle')
        .to(frontlegs1,{duration:0.1, y:35, x:-15, rotation:-60, scaleY:1})
        .addLabel('jump')
        .to([head, eyes, ears], {duration:0.1, y:5}, 'jump')
        .to(frontcircle,{duration:0.1, y:15, x:5}, 'jump')
        .to(bodybetween,{duration:0.1, rotation:-25, x:25, y:38}, 'jump')
        .to(frontlegs1,{duration:0.1, y:0, x:0, rotation:0}, 'jump')
        .to(tail,      {duration:0.1, y:115, x:20, rotation:-10}, 'jump')
        .to(frontlegs, {duration:0.1, y:-20}, 'jump+=0.1')
        .to([head, eyes, ears, frontcircle], {duration:0.1, x:75, y:5}, 'jump+=0.2')
        .to(frontcircle,{duration:0.1, x:55, y:5}, 'jump+=0.2')
        .to(bodybetween,{duration:0.1, scaleX:1, x:45, y:25, rotation:-15}, 'jump+=0.2')
        .to(backcircle,{duration:0.1, x:50, y:25}, 'jump+=0.2')
        .to(backlegs,  {duration:0.1, x:70}, 'jump+=0.2')
        .to(frontlegs,{duration:0.1, x:250, y:5, rotation:-45}, 'jump+=0.3')
        .to(frontcircle,{duration:0.1, x:250}, 'jump+=0.3')
        .to(backcircle,{duration:0.1, y:0, x:250}, 'jump+=0.3')
        .to(bodybetween,{duration:0.1, y:0, x:255, scaleX:1, rotation:4}, 'jump+=0.3')
        .to([head, eyes, ears], {duration:0.1, x:275}, 'jump+=0.3')
        .to(tail,      {duration:0.1, y:25, x:230, rotation:15}, 'jump+=0.3')
        .to(backlegs,  {duration:0.1, rotation:45, x:250, y:-25}, 'jump+=0.3')
        .to(frontlegs,{duration:0.1, x:340, y:105, rotation:-15}, 'jump+=0.4')
        .to(frontcircle,{duration:0.1, x:340, y:105}, 'jump+=0.4')
        .to(backcircle,{duration:0.1, y:60, x:350}, 'jump+=0.4')
        .to(bodybetween,{duration:0.1, y:70, x:380, scaleX:1, rotation:35}, 'jump+=0.4')
        .to([head, eyes, ears], {duration:0.1, x:385, y:125}, 'jump+=0.4')
        .to(tail,      {duration:0.1, y:50, x:370, rotation:35}, 'jump+=0.4')
        .to(backlegs,  {duration:0.1, rotation:95, x:350, y:5}, 'jump+=0.4')
        .to(frontlegs,{duration:0.1, x:420, y:205, rotation:-15}, 'jump+=0.5')
        .to(frontcircle,{duration:0.1, x:420, y:205}, 'jump+=0.5')
        .to(backcircle,{duration:0.1, y:160, x:430}, 'jump+=0.5')
        .to(bodybetween,{duration:0.1, y:170, x:460, scaleX:1, rotation:35}, 'jump+=0.5')
        .to([head, eyes, ears], {duration:0.1, x:465, y:225}, 'jump+=0.5')
        .to(tail,      {duration:0.1, y:150, x:450, rotation:35}, 'jump+=0.5')
        .to(backlegs,  {duration:0.1, rotation:95, x:430, y:95}, 'jump+=0.5')
        .to(cat,       {duration:0.5, opacity:0}, 'jump+=0.3');
  
      // まばたき
      tleyes
        .addLabel('twinkall')
        .to(eyel, {duration:0.1, scaleY:0.1, y:55}, 'twinkall')
        .to(eyel, {duration:0.1, scaleY:1,   y:45}, 'twinkall+=0.1')
        .to(eyer, {duration:0.1, scaleY:0.1, y:55}, 'twinkall')
        .to(eyer, {duration:0.1, scaleY:1,   y:45}, 'twinkall+=0.1');
    }
  
    // ESCでスキップ
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') splash.remove();
    });
  
    // 開発用リスタート（任意）
    resetBtn?.addEventListener('click', () => {
      if (!document.body.contains(splash)) {
        document.body.prepend(splash);
        splash.style.opacity = '1';
      }
      aniWrap?.classList.remove('notvisible');
      logofix?.classList.remove('visible');
      resetBtn?.classList.remove('visible');
      runAnimation();
    });
  
    // 実行
    document.body.style.overflow = 'hidden'; // 背景スクロール防止
    runAnimation();
  });
  