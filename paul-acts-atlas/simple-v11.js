// Paul Acts Atlas v11 — one-click guided tour
(() => {
  if(document.getElementById('guidedTour'))return;
  const content=document.querySelector('.content'); if(!content)return;

  const steps=[
    {name:'耶路撒冷',sub:'Acts 1–7 · 起點',year:'AD 30–33',emperor:'提庇留',now:'耶穌升天後，門徒在耶路撒冷等候聖靈。五旬節之後，教會建立，彼得公開講道，直到司提反殉道，逼迫開始把信徒推向外地。',memory:'先記：福音不是先從保羅開始，而是從耶路撒冷的教會開始。',next:'下一站：大馬士革',visual:'city',bg:'linear-gradient(135deg,#2b2118,#17130f)'},
    {name:'大馬士革',sub:'Acts 9 · 保羅歸信',year:'約 AD 33–36',emperor:'提庇留／卡利古拉前期',now:'掃羅原本去大馬士革抓基督徒，卻在路上遇見復活的耶穌。這一站把「逼迫教會的人」變成後來向外邦人傳福音的使徒。',memory:'先記：大馬士革＝保羅人生方向完全翻轉。',next:'下一站：安提阿',visual:'light',bg:'linear-gradient(135deg,#4a331e,#16120e)'},
    {name:'安提阿',sub:'Acts 11–13 · 宣教基地',year:'約 AD 43–46',emperor:'革老丟',now:'巴拿巴把保羅帶到安提阿，兩人一起教導教會約一年。門徒第一次被稱為「基督徒」也與安提阿有關。之後聖靈差派巴拿巴與保羅出去。',memory:'先記：耶路撒冷是起點；安提阿是保羅宣教的大本營。',next:'下一站：第一次宣教',visual:'city',bg:'linear-gradient(135deg,#3e2d20,#19140f)'},
    {name:'第一次宣教',sub:'Acts 13–14 · 外邦教會',year:'約 AD 46–48',emperor:'革老丟',now:'保羅從安提阿出發，經居比路，再進入小亞細亞南部：彼西底安提阿、以哥念、路司得、特庇。福音開始大量進到外邦城市。',memory:'先記：第一次＝居比路＋南加拉太，最後回安提阿。',next:'下一站：第二次宣教',visual:'ship',bg:'linear-gradient(135deg,#24313a,#10191e)'},
    {name:'第二次宣教',sub:'Acts 16–18 · 福音進歐洲',year:'約 AD 49–52',emperor:'革老丟',now:'保羅在特羅亞看見馬其頓異象，於是進入歐洲。腓立比、帖撒羅尼迦、庇哩亞、雅典、哥林多成為主線。保羅在哥林多停留約18個月。',memory:'先記：第二次＝跨海進歐洲；哥林多＝18個月。',next:'下一站：以弗所',visual:'prison',bg:'linear-gradient(135deg,#22282c,#111417)'},
    {name:'以弗所',sub:'Acts 19–20 · 第三次核心',year:'約 AD 52–57',emperor:'革老丟 → 尼祿',now:'第三次宣教最重要的基地是以弗所。保羅長時間教導，福音影響整個亞細亞省，也衝擊亞底米女神相關產業，最後引發大型騷動。',memory:'先記：第三次＝以弗所核心；林前也與這段時間密切相關。',next:'下一站：該撒利亞',visual:'city',bg:'linear-gradient(135deg,#3b3026,#17130f)'},
    {name:'該撒利亞',sub:'Acts 23–26 · 被囚約2年',year:'約 AD 57–59',emperor:'尼祿',now:'保羅回到耶路撒冷後被捕，為避開殺害陰謀被押到該撒利亞。在這裡他先後面對腓力斯、非斯都與亞基帕，最後上告於凱撒。',memory:'先記：該撒利亞＝被囚2年；因上告凱撒，故事才往羅馬走。',next:'下一站：羅馬',visual:'prison',bg:'linear-gradient(135deg,#292724,#12110f)'},
    {name:'羅馬',sub:'Acts 27–28 · 抵達終點',year:'約 AD 60–62',emperor:'尼祿',now:'保羅以囚犯身分搭船前往羅馬，途中遭遇暴風、船難，在馬耳他停留，最後抵達羅馬。使徒行傳結尾不是保羅獲釋，而是福音在帝國中心仍然被傳講。',memory:'先記：徒28不是「故事結束」，而是福音已走到羅馬。',next:'主線完成：回頭再補書信與年份',visual:'rome',bg:'linear-gradient(135deg,#30261f,#17130f)'}
  ];

  const tour=document.createElement('div');tour.id='guidedTour';tour.className='guided-tour';
  tour.innerHTML=`<div class="simple-title"><div><div class="eyebrow">GUIDED STORY</div><h2>一鍵導覽｜8站走完整卷</h2></div><p>每一幕只看四件事：在哪裡、徒幾章、發生什麼、下一站去哪。</p></div>
  <div class="tour-shell">
    <div class="tour-stage" id="tourStage"><div class="tour-stage-bg" id="tourStageBg"></div><div class="tour-grain"></div><div class="tour-visual city" id="tourVisual"></div>
      <div class="tour-copy"><div class="tour-kicker"><span id="tourSub"></span><span id="tourYear"></span><span id="tourEmperor"></span></div><h2 id="tourName"></h2><div class="tour-now" id="tourNow"></div><div class="tour-memory"><b>記憶點</b><span id="tourMemory"></span></div><div class="tour-route-next"><span id="tourNext"></span><i></i><span>→</span></div></div>
    </div>
    <div class="tour-controls"><button type="button" id="tourPrev">← 上一站</button><div class="tour-progress-wrap"><div class="tour-progress-line"><i id="tourProgress"></i></div><div class="tour-progress-label"><span id="tourCount">1 / 8</span><span>先懂主線，再背細節</span></div></div><button type="button" class="primary" id="tourNextBtn">下一站 →</button></div>
    <div class="tour-mini-map" id="tourMiniMap"></div>
  </div>`;
  content.prepend(tour);

  let idx=0;
  function render(i,playSound=true){
    idx=Math.max(0,Math.min(steps.length-1,i)); const s=steps[idx];
    document.getElementById('tourStageBg').style.background=s.bg;
    const vis=document.getElementById('tourVisual');vis.className='tour-visual '+s.visual;
    document.getElementById('tourSub').textContent=s.sub;document.getElementById('tourYear').textContent=s.year;document.getElementById('tourEmperor').textContent=s.emperor;
    document.getElementById('tourName').textContent=s.name;document.getElementById('tourNow').textContent=s.now;document.getElementById('tourMemory').textContent=s.memory;document.getElementById('tourNext').textContent=s.next;
    document.getElementById('tourProgress').style.width=((idx+1)/steps.length*100)+'%';document.getElementById('tourCount').textContent=(idx+1)+' / '+steps.length;
    document.getElementById('tourPrev').disabled=idx===0;document.getElementById('tourNextBtn').textContent=idx===steps.length-1?'完成導覽 ✓':'下一站 →';
    document.querySelectorAll('#tourMiniMap button').forEach((b,n)=>b.classList.toggle('active',n===idx));
    if(playSound&&typeof window.playSceneAudio==='function'){
      const chapters=[1,9,11,13,16,19,24,28];window.playSceneAudio(chapters[idx]);
    }
  }
  const mini=document.getElementById('tourMiniMap');
  steps.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.innerHTML='<i></i><span>'+s.name+'</span>';b.addEventListener('click',()=>render(i));mini.appendChild(b)});
  document.getElementById('tourPrev').addEventListener('click',()=>render(idx-1));
  document.getElementById('tourNextBtn').addEventListener('click',()=>{if(idx<steps.length-1)render(idx+1);else window.simpleOpen?.('home')});

  const oldOpen=window.simpleOpen;
  window.simpleOpen=function(view,scroll=true){
    tour.classList.remove('active');
    if(view==='tour'){
      oldOpen?.('home',false);
      document.getElementById('simpleHome')?.classList.remove('active');document.getElementById('advancedHub')?.classList.remove('active');document.getElementById('newcomerGuide')?.classList.remove('active');
      document.querySelectorAll('.section').forEach(x=>x.classList.remove('simple-visible'));tour.classList.add('active');
      document.querySelectorAll('.simple-nav button').forEach(b=>b.classList.remove('active'));
      if(scroll)window.scrollTo({top:0,behavior:'smooth'});render(idx,false);return;
    }
    oldOpen?.(view,scroll);
  };

  function addStartButtons(){
    const targets=[document.querySelector('#newcomerGuide .guide-cta'),document.querySelector('#simpleHome .simple-actions')].filter(Boolean);
    targets.forEach(t=>{if(t.querySelector('.start-tour-btn'))return;const b=document.createElement('button');b.type='button';b.className='start-tour-btn primary';b.textContent='開始一鍵導覽';b.addEventListener('click',()=>window.simpleOpen('tour'));t.prepend(b)});
  }
  addStartButtons();render(0,false);
})();