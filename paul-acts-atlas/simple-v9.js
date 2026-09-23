// Paul Acts Atlas v9 — visual refinement layer
(() => {
  if(document.getElementById('v9Mounted'))return;
  const marker=document.createElement('meta');marker.id='v9Mounted';document.head.appendChild(marker);

  // Cinematic hero
  const hero=document.querySelector('.hero');
  if(hero){
    hero.innerHTML=`<div class="v9-hero">
      <div>
        <div class="v9-eyebrow">ACTS × PAUL · VISUAL ATLAS</div>
        <h1>從耶路撒冷，走到羅馬。</h1>
        <p>不要一次記全部。先看一條路，再把章節、城市、年份和書信一個一個掛上去。</p>
        <div class="v9-route-word"><span>耶路撒冷</span><i></i><span>大馬士革</span><i></i><span>安提阿</span><i></i><span>希臘</span><i></i><span>羅馬</span></div>
      </div>
      <div class="v9-film-card" aria-hidden="true">
        <div class="v9-film-map"></div><div class="v9-film-path"></div>
        <div class="v9-year-badge">ACTS 1 → 28</div>
        <div class="v9-film-copy"><b>JERUSALEM → ROME</b><span>一條線，串起整卷使徒行傳</span></div>
      </div>
    </div>`;
  }

  const brand=document.querySelector('.simple-brand small');if(brand)brand.textContent='PAUL ATLAS v9';

  // Decorate cinema scenes by chapter
  const old=window.showCinemaChapter;
  function artClass(ch){
    if(ch===27)return 'storm';
    if([16,23,24,25,26].includes(ch))return 'prison';
    if([17,18,19,20].includes(ch))return 'city';
    if(ch===28)return 'rome';
    if(ch===9)return 'damascus';
    return 'city';
  }
  function decorate(ch){
    const stage=document.getElementById('cinemaStage');if(!stage)return;
    stage.querySelector('.scene-v9-art')?.remove();
    const art=document.createElement('div');art.className='scene-v9-art '+artClass(ch);
    art.innerHTML='<div class="sun"></div><div class="horizon"></div>';
    stage.prepend(art);
  }
  if(typeof old==='function'){
    window.showCinemaChapter=function(ch,scroll=false){old(ch,scroll);decorate(ch)};
    const active=document.querySelector('.cine-card.active');if(active){const n=Number(active.dataset?.ch||active.getAttribute('data-ch'));if(n)decorate(n)}
  }

  // Make journey guide cards feel like exhibits without adding information
  document.querySelectorAll('.journey-guide').forEach((card,i)=>{
    if(card.querySelector('.v9-exhibit'))return;
    const tag=document.createElement('span');tag.className='v9-exhibit';tag.style.cssText='position:absolute;right:12px;bottom:10px;font-size:9px;letter-spacing:.08em;color:#a08f79';
    tag.textContent=['ORIGIN','CYPRUS','EUROPE','EPHESUS','ROME'][i]||'ROUTE';card.appendChild(tag);
  });

  // Small tactile sound cue button treatment
  const dock=document.getElementById('soundDock');
  if(dock){dock.style.boxShadow='0 10px 30px rgba(70,50,28,.05)';}
})();