// Paul Acts Atlas v8 — newcomer guide + generative scene audio
(() => {
  if (document.getElementById('newcomerGuide')) return;
  const content=document.querySelector('.content'), topnav=document.querySelector('.simple-nav');
  if(!content||!topnav)return;

  // --- Newcomer map
  const guide=document.createElement('div');
  guide.id='newcomerGuide'; guide.className='newcomer-guide';
  guide.innerHTML=`
  <div class="guide-hero">
    <div class="guide-kicker">NEWCOMER MAP · 先看一條線</div>
    <h2>先不要背28章。先知道「從哪裡走到哪裡」。</h2>
    <p>《使徒行傳》的大方向只有一條：福音從耶路撒冷出發，經過敘利亞、小亞細亞、馬其頓與希臘，最後走到羅馬。保羅的三次宣教，就是在這條大方向上來回建立教會。</p>
    <div class="guide-rule"><b>新人背法</b><span>地點 → 章節 → 發生什麼 → 再補年份</span></div>
  </div>
  <div class="guide-flow">
    <div class="guide-flow-head"><h3>一條線看懂全部</h3><p>點一站，就直接進那一章的電影場景</p></div>
    <div class="metro-line">
      <button class="metro-stop" data-scene="1"><i>1</i><b>耶路撒冷</b><small>徒1–7<br>起點</small></button>
      <button class="metro-stop" data-scene="9"><i>2</i><b>大馬士革</b><small>敘利亞<br>保羅歸信</small></button>
      <button class="metro-stop" data-scene="11"><i>3</i><b>安提阿</b><small>今土耳其<br>宣教基地</small></button>
      <button class="metro-stop" data-scene="13"><i>4</i><b>小亞細亞</b><small>今土耳其<br>第一次</small></button>
      <button class="metro-stop" data-scene="16"><i>5</i><b>馬其頓</b><small>今希臘北部<br>第二次</small></button>
      <button class="metro-stop" data-scene="19"><i>6</i><b>以弗所</b><small>今土耳其<br>第三次核心</small></button>
      <button class="metro-stop" data-scene="24"><i>7</i><b>該撒利亞</b><small>地中海東岸<br>被囚2年</small></button>
      <button class="metro-stop" data-scene="28"><i>8</i><b>羅馬</b><small>義大利<br>徒28</small></button>
    </div>
  </div>
  <div class="journey-guide-grid">
    <button class="journey-guide" data-journey="early"><span class="jg-num">00</span><b>前期｜起點擴張</b><span>耶路撒冷 → 撒瑪利亞 → 大馬士革 → 安提阿</span><em>徒1–12</em></button>
    <button class="journey-guide" data-journey="j1"><span class="jg-num">01</span><b>第一次宣教</b><span>安提阿 → 居比路 → 彼西底安提阿 → 以哥念 → 路司得 → 特庇 → 回安提阿</span><em>徒13–14</em></button>
    <button class="journey-guide" data-journey="j2"><span class="jg-num">02</span><b>第二次宣教</b><span>安提阿 → 小亞細亞 → 特羅亞 → 腓立比 → 帖撒羅尼迦 → 雅典 → 哥林多</span><em>徒15:36–18:22</em></button>
    <button class="journey-guide" data-journey="j3"><span class="jg-num">03</span><b>第三次宣教</b><span>安提阿 → 加拉太／弗呂家 → 以弗所 → 馬其頓 → 哥林多 → 米利都 → 耶路撒冷</span><em>徒18:23–21:17</em></button>
    <button class="journey-guide" data-journey="rome"><span class="jg-num">→</span><b>囚犯前往羅馬</b><span>耶路撒冷 → 該撒利亞 → 西頓 → 每拉 → 革哩底 → 馬耳他 → 羅馬</span><em>徒21–28</em></button>
  </div>
  <div class="guide-how"><div><b>① 先看「方向」</b><span>不要先記所有城市。先知道每次宣教往哪個區域走。</span></div><div><b>② 再綁「章節」</b><span>徒13–14＝第一次；徒16–18＝第二次；徒19–20＝第三次。</span></div><div><b>③ 最後補「年份與書信」</b><span>等路線熟了，再把皇帝、停留多久、寫哪封信掛上去。</span></div></div>
  <div class="guide-cta"><button class="primary" data-guide-go="map">🗺 打開完整路程</button><button data-guide-go="cinema">🎬 直接進電影模式</button><button data-guide-finish>我懂主線了 → 開始學習</button></div>`;
  content.prepend(guide);

  // Add guide + cinema to simple nav without making it noisy.
  const homeBtn=topnav.querySelector('[data-view="home"]');
  const guideBtn=document.createElement('button');guideBtn.className='guide-nav';guideBtn.dataset.view='guide';guideBtn.textContent='新人導覽';
  topnav.insertBefore(guideBtn,homeBtn);
  if(!topnav.querySelector('[data-view="cinema"]')){
    const actsBtn=topnav.querySelector('[data-view="acts"]');
    const cineBtn=document.createElement('button');cineBtn.dataset.view='cinema';cineBtn.textContent='電影';
    actsBtn.after(cineBtn);
  }
  document.querySelector('.simple-brand small').textContent='PAUL ATLAS v8';

  // Wrap simplified router to support guide.
  const oldOpen=window.simpleOpen;
  window.simpleOpen=function(view,scroll=true){
    guide.classList.remove('active');
    if(view==='guide'){
      oldOpen('home',false);
      document.getElementById('simpleHome')?.classList.remove('active');
      document.getElementById('advancedHub')?.classList.remove('active');
      document.querySelectorAll('.section').forEach(x=>x.classList.remove('simple-visible'));
      guide.classList.add('active');
      document.querySelectorAll('.simple-nav button').forEach(b=>b.classList.toggle('active',b.dataset.view==='guide'));
      if(scroll)window.scrollTo({top:0,behavior:'smooth'});
      return;
    }
    oldOpen(view,scroll);
  };

  // Existing listeners were created earlier but resolve global simpleOpen at click time.
  guideBtn.addEventListener('click',()=>window.simpleOpen('guide'));
  topnav.querySelector('[data-view="cinema"]')?.addEventListener('click',()=>window.simpleOpen('cinema'));

  document.querySelectorAll('[data-guide-go]').forEach(b=>b.addEventListener('click',()=>{
    const v=b.dataset.guideGo; window.simpleOpen(v); if(v==='cinema'&&typeof window.showCinemaChapter==='function')window.showCinemaChapter(16,false);
  }));
  document.querySelector('[data-guide-finish]')?.addEventListener('click',()=>{
    try{localStorage.setItem('actsSeenGuide','1')}catch(e){}
    window.simpleOpen('home');
  });
  document.querySelectorAll('.journey-guide').forEach(b=>b.addEventListener('click',()=>{
    window.simpleOpen('map',false);
    if(typeof window.setJourney==='function')window.setJourney(b.dataset.journey);
    setTimeout(()=>document.getElementById('map')?.scrollIntoView({behavior:'smooth',block:'start'}),20);
  }));
  document.querySelectorAll('.metro-stop').forEach(b=>b.addEventListener('click',()=>{
    const ch=Number(b.dataset.scene);
    window.simpleOpen('cinema',false);
    if(typeof window.showCinemaChapter==='function'){
      // cinema only has selected key chapters; chapter 1 falls back to chapter detail
      if(ch===1){ window.simpleOpen('acts',false); window.showCh?.(1); playSceneAudio(1); }
      else window.showCinemaChapter(ch,true);
    }
  }));

  // --- Sound dock
  const cinema=document.getElementById('cinema');
  if(cinema){
    const dock=document.createElement('div');dock.className='sound-dock';dock.id='soundDock';
    dock.innerHTML='<strong>🎧 場景聲音</strong><span class="sound-state" id="soundState">點電影章節後播放</span><button type="button" id="soundToggle">🔊 音效開</button><button type="button" id="soundStop">⏹ 停止</button>';
    const layout=cinema.querySelector('.cinema-layout'); cinema.insertBefore(dock,layout);
  }

  let ctx=null,master=null,timers=[],nodes=[],soundEnabled=true,currentAudioCh=null;
  function clearAudio(){
    timers.forEach(clearInterval);timers=[];nodes.forEach(n=>{try{n.stop?.()}catch(e){} try{n.disconnect?.()}catch(e){}});nodes=[];
    if(master){try{master.disconnect()}catch(e){} master=null}
    document.getElementById('cinemaStage')?.classList.remove('audio-on');
    currentAudioCh=null;
    const s=document.getElementById('soundState');if(s)s.textContent='已停止';
  }
  function ensureCtx(){
    if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();
    if(ctx.state==='suspended')ctx.resume();
    master=ctx.createGain();master.gain.value=.085;master.connect(ctx.destination);
  }
  function osc(freq,type='sine',gain=.12,dur=1.5,when=0){
    const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0,ctx.currentTime+when);g.gain.linearRampToValueAtTime(gain,ctx.currentTime+when+.05);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+when+dur);o.connect(g);g.connect(master);o.start(ctx.currentTime+when);o.stop(ctx.currentTime+when+dur+.1);nodes.push(o,g)
  }
  function noise(kind='soft'){
    const len=ctx.sampleRate*2,buf=ctx.createBuffer(1,len,ctx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(kind==='storm'?1:.35);
    const src=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),g=ctx.createGain();src.buffer=buf;src.loop=true;filter.type=kind==='storm'?'lowpass':'bandpass';filter.frequency.value=kind==='storm'?700:900;g.gain.value=kind==='storm'?.34:.055;src.connect(filter);filter.connect(g);g.connect(master);src.start();nodes.push(src,filter,g)
  }
  function pulse(notes,style='sine',ms=2600){
    let i=0; const hit=()=>{const f=notes[i++%notes.length];osc(f,style,.08,1.7);osc(f*1.5,'sine',.025,1.3,.08)};hit();timers.push(setInterval(hit,ms))
  }
  function playSceneAudio(ch){
    if(!soundEnabled)return; clearAudio(); ensureCtx(); currentAudioCh=ch;
    const state=document.getElementById('soundState'),stage=document.getElementById('cinemaStage');stage?.classList.add('audio-on');
    const label=(window.ACTS?.find?.(x=>x.ch===ch)?.place)||('徒'+ch);
    if(state)state.textContent='播放中｜'+label;
    if(ch===27){noise('storm');osc(55,'sine',.18,4);timers.push(setInterval(()=>{osc(42,'sawtooth',.13,2);osc(74,'triangle',.05,1.4,.15)},4200))}
    else if([16,23,24,25,26].includes(ch)){noise('soft');pulse([82.4,98,110,98],'triangle',3200);timers.push(setInterval(()=>osc(520,'triangle',.025,.25),5400))}
    else if([17,18,19].includes(ch)){pulse([146.8,174.6,220,196],'sine',2400);timers.push(setInterval(()=>osc(659,'sine',.025,.55),6000))}
    else if(ch===28){pulse([130.8,164.8,196,164.8],'sine',2800);osc(65.4,'sine',.09,5)}
    else if(ch===9){noise('soft');osc(880,'sine',.08,2);pulse([110,146.8,164.8],'sine',3300)}
    else if(ch===1||ch===2){pulse([196,246.9,293.7,246.9],'sine',2600)}
    else {pulse([130.8,164.8,196,164.8],'sine',3000)}
  }
  window.playSceneAudio=playSceneAudio;

  // Wrap movie scene selection so every deliberate chapter click gets its soundtrack.
  if(typeof window.showCinemaChapter==='function'){
    const oldCinema=window.showCinemaChapter;
    window.showCinemaChapter=function(ch,scroll=false){
      oldCinema(ch,scroll);
      const stage=document.getElementById('cinemaStage');
      if(stage&&!stage.querySelector('.scene-sound-badge'))stage.insertAdjacentHTML('beforeend','<div class="scene-sound-badge">🎧 點場景即播放環境音</div>');
      playSceneAudio(ch);
    };
  }

  // Map clicks get a short location cue without changing the main movie track.
  document.querySelectorAll('.map-node .dot').forEach(dot=>dot.addEventListener('click',()=>{
    if(!soundEnabled)return;
    try{ensureCtx();osc(392,'sine',.035,.25);osc(523.25,'sine',.02,.45,.08)}catch(e){}
  },{capture:true}));

  const toggle=document.getElementById('soundToggle'),stop=document.getElementById('soundStop');
  toggle?.addEventListener('click',()=>{
    soundEnabled=!soundEnabled;toggle.classList.toggle('is-on',soundEnabled);toggle.textContent=soundEnabled?'🔊 音效開':'🔇 音效關';
    if(!soundEnabled)clearAudio();else if(currentAudioCh)playSceneAudio(currentAudioCh);
  });
  stop?.addEventListener('click',clearAudio);
  toggle?.classList.add('is-on');

  // First-time visitors land on the newcomer map.
  let seen=false;try{seen=localStorage.getItem('actsSeenGuide')==='1'}catch(e){}
  window.simpleOpen(seen?'home':'guide',false);
})();