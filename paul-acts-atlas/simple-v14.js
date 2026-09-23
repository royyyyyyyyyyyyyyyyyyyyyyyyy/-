// Paul Acts Atlas v14 — route teaching animation + clearer chapter map action
(() => {
  if (document.getElementById('routeTeacherV14')) return;
  const mapSection=document.getElementById('map'), mapStage=document.getElementById('mapWrap');
  if(!mapSection||!mapStage||typeof JOURNEYS==='undefined'||typeof PLACES==='undefined') return;
  const mark=document.createElement('meta');mark.id='routeTeacherV14';document.head.appendChild(mark);

  const GUIDE={
    early:{title:'歸信與前期',why:'先看保羅怎麼從逼迫教會的人，變成被差派的人。',memory:'耶路撒冷 → 大馬士革 → 大數 → 安提阿 → 耶路撒冷',direction:'先抓「保羅歸信」和「安提阿成為宣教基地」。'},
    j1:{title:'第一次宣教',why:'第一次宣教先從安提阿出發，經居比路，再進小亞細亞南部。',memory:'安提阿 → 居比路 → 彼西底安提阿 → 路司得／特庇 → 回安提阿',direction:'先記「海島居比路」，再記「南加拉太」。'},
    j2:{title:'第二次宣教',why:'第二次宣教最重要的是：福音第一次明顯跨進馬其頓與希臘。',memory:'安提阿 → 特羅亞 → 腓立比 → 帖撒羅尼迦 → 雅典 → 哥林多',direction:'先記「跨海進歐洲」，哥林多停留18個月。'},
    j3:{title:'第三次宣教',why:'第三次宣教要抓「以弗所成為核心基地」，再往馬其頓與哥林多。',memory:'安提阿 → 以弗所 → 馬其頓 → 哥林多 → 米利都 → 該撒利亞 → 耶路撒冷',direction:'第三次＝以弗所核心；林前、林後、羅都跟這階段高度相關。'},
    rome:{title:'囚犯前往羅馬',why:'這不是普通宣教旅行，而是保羅被押送去羅馬。',memory:'該撒利亞 → 每拉 → 革哩底 → 馬耳他 → 部丟利 → 羅馬',direction:'先記「海路＋船難＋馬耳他」，最後抵達羅馬。'}
  };
  const CHMAP=(typeof CHAPTER_ROUTE!=='undefined'?CHAPTER_ROUTE:{
    9:['early','Damascus'],11:['early','Antioch'],13:['j1','Antioch'],14:['j1','Lystra'],15:['j2','Jerusalem'],16:['j2','Philippi'],17:['j2','Athens'],18:['j2','Corinth'],19:['j3','Ephesus'],20:['j3','Miletus'],21:['j3','Jerusalem'],23:['rome','Caesarea'],24:['rome','Caesarea'],25:['rome','Caesarea'],26:['rome','Caesarea'],27:['rome','Crete'],28:['rome','Rome']
  });

  const teacher=document.createElement('div');
  teacher.className='route-teacher';teacher.id='routeTeacher';
  teacher.innerHTML=`
   <div class="route-teacher-head">
    <div><div class="eyebrow">ROUTE GUIDE · 地圖不是拿來猜的</div><h3>先選旅程，再跟著 1 → 2 → 3 走。</h3><p>不用一開始看懂所有箭頭。上方選一趟旅程，下面站點列就是正確順序；右側卡片會告訴你「現在在哪一站、這裡發生什麼」。</p></div>
    <div class="route-teacher-actions"><button class="primary" id="v14TeachBtn">▶ 看 10 秒教學</button><button id="v14PrevBtn">← 上一站</button><button id="v14NextBtn">下一站 →</button></div>
   </div>
   <div class="route-teacher-grid">
    <div class="route-teach-card"><b id="v14JourneyTitle">現在看的旅程</b><p id="v14JourneyWhy"></p><div class="route-teach-legend"><span><i class="route-legend-solid"></i>實線＝陸路</span><span><i class="route-legend-dash"></i>虛線＝海路</span><span>● 大圓點＝目前站</span></div></div>
    <div class="route-teach-card"><b>先背這條</b><p id="v14Memory"></p><p style="margin-top:7px" id="v14Direction"></p></div>
    <div class="route-teach-card"><b id="v14CurrentTitle">現在第 1 站</b><p id="v14CurrentText">按下一站，網站會帶你走。</p><div class="route-teacher-progress"><span id="v14Progress"></span></div></div>
   </div>
   <div class="route-station-wrap"><div class="route-station-head"><b>站點順序</b><span>直接點站名也可以，不必自己找箭頭</span></div><div class="route-station-list" id="v14Stations"></div></div>`;
  const card=mapSection.querySelector('.map-card'); mapSection.insertBefore(teacher,card);

  const overlay=document.createElement('div');overlay.className='map-teach-overlay';overlay.id='v14Overlay';
  overlay.innerHTML='<div class="map-teach-card"><div class="step" id="v14OverlayStep">STEP 1</div><h4 id="v14OverlayTitle"></h4><p id="v14OverlayText"></p><div class="mini" id="v14OverlayMini"></div></div>';
  mapStage.appendChild(overlay);

  const controls=mapStage.querySelector('.map-controls');
  if(controls&&!controls.querySelector('.map-guide-btn')){
    const b=document.createElement('button');b.type='button';b.className='btn map-guide-btn';b.textContent='？怎麼看';b.addEventListener('click',()=>startTeach());controls.appendChild(b);
  }

  let teachToken=0;
  function stepIndexFromUI(){
    const t=document.querySelector('#currentStop .eyebrow')?.textContent||'';
    const m=t.match(/第\s*(\d+)/);return m?Math.max(0,+m[1]-1):0;
  }
  function clearNodeGuide(){
    document.querySelectorAll('.map-node').forEach(n=>n.classList.remove('route-guide-current','route-guide-next'));
  }
  function update(step=stepIndexFromUI()){
    const j=JOURNEYS[activeJourney],g=GUIDE[activeJourney]||{};
    step=Math.max(0,Math.min(step,j.stops.length-1));
    const key=j.stops[step],p=PLACES[key],inf=stopInfo(key);
    document.getElementById('v14JourneyTitle').textContent=`${g.title||j.label}｜${JOURNEY_META[activeJourney]?.years||''}`;
    document.getElementById('v14JourneyWhy').textContent=g.why||'';
    document.getElementById('v14Memory').textContent=g.memory||'';
    document.getElementById('v14Direction').textContent=g.direction||'';
    document.getElementById('v14CurrentTitle').textContent=`現在第 ${step+1} / ${j.stops.length} 站｜${p.name}`;
    document.getElementById('v14CurrentText').textContent=`${inf.acts}｜${inf.duration}｜${inf.note}`;
    document.getElementById('v14Progress').style.width=(j.stops.length>1?step/(j.stops.length-1)*100:100)+'%';
    const wrap=document.getElementById('v14Stations');
    wrap.innerHTML=j.stops.map((k,i)=>`<button type="button" class="route-station-pill ${i===step?'active':''}" data-i="${i}" data-k="${k}"><i>${i+1}</i><span>${PLACES[k].name}</span></button>`).join('');
    wrap.querySelectorAll('button').forEach(x=>x.addEventListener('click',()=>selectStop(x.dataset.k,+x.dataset.i,true)));
    clearNodeGuide();
    document.querySelector(`.map-node[data-key="${key}"]`)?.classList.add('route-guide-current');
    const nk=j.stops[step+1];if(nk)document.querySelector(`.map-node[data-key="${nk}"]`)?.classList.add('route-guide-next');
  }
  function showOverlay(step,title,text,mini=''){
    document.getElementById('v14OverlayStep').textContent='STEP '+step;
    document.getElementById('v14OverlayTitle').textContent=title;
    document.getElementById('v14OverlayText').textContent=text;
    document.getElementById('v14OverlayMini').textContent=mini;
    overlay.classList.add('show');
    if(window.paulNarrator?.speak) window.paulNarrator.speak(title+'。'+text+(mini?'。'+mini:''),'路程教學');
  }
  function wait(ms){return new Promise(r=>setTimeout(r,ms))}
  async function startTeach(chapter=null){
    const token=++teachToken;
    if(chapter&&CHMAP[chapter]){
      const [journey,city]=CHMAP[chapter]; setJourney(journey); const j=JOURNEYS[journey]; let idx=j.stops.indexOf(city); if(idx<0)idx=0; selectStop(city,idx,false);
    }
    const j=JOURNEYS[activeJourney],g=GUIDE[activeJourney]||{},step=stepIndexFromUI(),key=j.stops[step],next=j.stops[step+1];
    mapSection.scrollIntoView({behavior:'smooth',block:'start'});await wait(500);if(token!==teachToken)return;
    showOverlay(1,'先看你選的是哪一趟',g.title||j.label,`使徒行傳：${JOURNEY_META[activeJourney]?.acts||''}`);await wait(2500);if(token!==teachToken)return;
    showOverlay(2,'再看第幾站',`現在是第 ${step+1} 站：${PLACES[key].name}`,'大圓點就是現在位置');document.querySelector(`.map-node[data-key="${key}"]`)?.classList.add('route-guide-current');await wait(2500);if(token!==teachToken)return;
    if(next){showOverlay(3,'最後只看下一站',`${PLACES[key].name} → ${PLACES[next].name}`,'不用一次看完整張圖，先跟著下一站走');document.querySelector(`.map-node[data-key="${next}"]`)?.classList.add('route-guide-next')}else showOverlay(3,'這趟到終點了',`${PLACES[key].name} 是這條線的最後一站`,'接著可以切另一趟旅程');
    await wait(2800);if(token!==teachToken)return;overlay.classList.remove('show');
  }
  window.startRouteTeachV14=startTeach;

  document.getElementById('v14TeachBtn').addEventListener('click',()=>startTeach());
  document.getElementById('v14PrevBtn').addEventListener('click',()=>{const j=JOURNEYS[activeJourney],s=Math.max(0,stepIndexFromUI()-1);selectStop(j.stops[s],s,true)});
  document.getElementById('v14NextBtn').addEventListener('click',()=>{const j=JOURNEYS[activeJourney],s=Math.min(j.stops.length-1,stepIndexFromUI()+1);selectStop(j.stops[s],s,true)});

  const oldSet=window.setJourney,oldSelect=window.selectStop;
  if(typeof oldSet==='function')window.setJourney=function(k){oldSet(k);setTimeout(()=>update(0),0)};
  if(typeof oldSelect==='function')window.selectStop=function(k,s=null,scroll=true){oldSelect(k,s,scroll);const real=s===null?JOURNEYS[activeJourney].stops.indexOf(k):s;setTimeout(()=>update(real),0)};

  // Rename and upgrade the confusing chapter action.
  function upgradeChapterButtons(){
    document.querySelectorAll('#acts .chapter-actions button').forEach(b=>{
      const txt=(b.textContent||'').trim();
      if(txt.includes('地圖定位')||txt.includes('看這章在哪裡')){
        b.textContent='🗺 看這章在哪裡';b.dataset.v14Map='1';
      }
    });
  }
  upgradeChapterButtons();
  const acts=document.getElementById('acts');if(acts)new MutationObserver(upgradeChapterButtons).observe(acts,{childList:true,subtree:true});
  document.addEventListener('click',e=>{
    const b=e.target.closest?.('#acts .chapter-actions [data-v14-map]');
    if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();
    const n=Number(document.querySelector('.chapter-btn.active .chapter-num')?.textContent?.match(/\d+/)?.[0]||document.querySelector('#acts .chapter-view h3')?.textContent?.match(/\d+/)?.[0]||0);
    if(!n||!CHMAP[n]){window.simpleOpen?.('map');return}
    window.simpleOpen?.('map',false);
    setTimeout(()=>startTeach(n),80);
  },true);

  // If user opens the map normally, show the guide but do not auto-talk.
  setTimeout(()=>update(0),100);
  const brand=document.querySelector('.simple-brand small');if(brand)brand.textContent='PAUL ATLAS v14';
})();