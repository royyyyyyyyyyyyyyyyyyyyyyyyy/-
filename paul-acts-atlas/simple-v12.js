// Paul Acts Atlas v12 — Mandarin human-style browser narration
(() => {
  if(document.getElementById('voiceGuideV12')) return;
  const marker=document.createElement('meta'); marker.id='voiceGuideV12'; document.head.appendChild(marker);

  const synth=window.speechSynthesis;
  if(!synth) return;

  let voices=[], selectedVoice=null, autoNarrate=false, rate=0.95, lastText='', speakingSource='';
  const preferredVoice=()=> {
    const zhTW=voices.filter(v=>/zh[-_]TW/i.test(v.lang));
    const zh=voices.filter(v=>/^zh/i.test(v.lang));
    return zhTW[0]||zh[0]||voices[0]||null;
  };
  function refreshVoices(){
    voices=synth.getVoices();
    if(!selectedVoice) selectedVoice=preferredVoice();
    document.querySelectorAll('[data-voice-select]').forEach(sel=>{
      const current=selectedVoice?.voiceURI||'';
      sel.innerHTML='';
      const relevant=voices.filter(v=>/^zh/i.test(v.lang));
      const list=relevant.length?relevant:voices.slice(0,12);
      list.forEach(v=>{const o=document.createElement('option');o.value=v.voiceURI;o.textContent=(v.name||v.lang)+' · '+v.lang;sel.appendChild(o)});
      if(current && [...sel.options].some(o=>o.value===current)) sel.value=current;
    });
  }
  refreshVoices();
  if('onvoiceschanged' in synth) synth.onvoiceschanged=refreshVoices;

  function setStatus(text,on=false){
    document.querySelectorAll('[data-voice-status]').forEach(el=>{
      el.classList.toggle('is-speaking',on);
      el.innerHTML='<span class="voice-wave"><i></i><i></i><i></i></span>'+text;
    });
  }
  function stop(){
    synth.cancel(); speakingSource=''; setStatus('已停止');
  }
  function speak(text,source=''){
    if(!text?.trim()) return;
    synth.cancel();
    const u=new SpeechSynthesisUtterance(text.replace(/\s+/g,' ').trim());
    u.lang=selectedVoice?.lang||'zh-TW'; u.rate=rate; u.pitch=1; u.volume=1;
    if(selectedVoice) u.voice=selectedVoice;
    lastText=text; speakingSource=source;
    u.onstart=()=>setStatus('正在導讀'+(source?'｜'+source:''),true);
    u.onend=()=>{speakingSource='';setStatus('導讀完成')};
    u.onerror=()=>{speakingSource='';setStatus('這個瀏覽器目前無法播放人聲，請換 Chrome / Edge 再試')};
    synth.speak(u);
  }
  window.paulNarrator={speak,stop,get auto(){return autoNarrate},setAuto(v){autoNarrate=!!v},get rate(){return rate}};

  function tourText(){
    const name=document.getElementById('tourName')?.textContent||'';
    const sub=document.getElementById('tourSub')?.textContent||'';
    const year=document.getElementById('tourYear')?.textContent||'';
    const emperor=document.getElementById('tourEmperor')?.textContent||'';
    const now=document.getElementById('tourNow')?.textContent||'';
    const memory=document.getElementById('tourMemory')?.textContent||'';
    const next=document.getElementById('tourNext')?.textContent||'';
    return [name,sub,year,emperor,now,'記憶重點：'+memory,next].filter(Boolean).join('。');
  }

  const shell=document.querySelector('#guidedTour .tour-shell');
  if(shell){
    const bar=document.createElement('div'); bar.className='voice-guide-bar';
    bar.innerHTML='<strong>🎙️ 人聲導讀</strong><button type="button" data-tour-read>▶ 念這一站</button><button type="button" data-auto-read>自動導讀：關</button><button type="button" data-stop-read>⏹ 停止</button><select data-rate-select aria-label="朗讀速度"><option value="0.82">慢速</option><option value="0.95" selected>自然</option><option value="1.08">稍快</option></select><select data-voice-select aria-label="人聲"></select><div class="voice-guide-status" data-voice-status><span class="voice-wave"><i></i><i></i><i></i></span>點「念這一站」開始</div>';
    shell.appendChild(bar);
    bar.querySelector('[data-tour-read]').addEventListener('click',()=>speak(tourText(),document.getElementById('tourName')?.textContent||''));
    bar.querySelector('[data-auto-read]').addEventListener('click',e=>{
      autoNarrate=!autoNarrate;e.currentTarget.classList.toggle('is-active',autoNarrate);e.currentTarget.textContent='自動導讀：'+(autoNarrate?'開':'關');
      if(autoNarrate) speak(tourText(),document.getElementById('tourName')?.textContent||'');
    });
    bar.querySelector('[data-stop-read]').addEventListener('click',stop);
    bar.querySelector('[data-rate-select]').addEventListener('change',e=>{rate=Number(e.target.value)||.95});
    bar.querySelector('[data-voice-select]').addEventListener('change',e=>{selectedVoice=voices.find(v=>v.voiceURI===e.target.value)||preferredVoice()});
    refreshVoices();
  }

  // Observe guided-tour station changes and narrate automatically.
  const tourName=document.getElementById('tourName');
  if(tourName){
    new MutationObserver(()=>{ if(autoNarrate) setTimeout(()=>speak(tourText(),tourName.textContent||''),120); }).observe(tourName,{childList:true,subtree:true,characterData:true});
  }

  function installChapterReader(){
    const view=document.querySelector('#acts .chapter-view'); if(!view || view.querySelector('.chapter-voice-row')) return;
    const row=document.createElement('div');row.className='chapter-voice-row';row.innerHTML='<button type="button" class="read-inline">🎙️ 念這一章</button>';
    view.prepend(row);
    row.querySelector('button').addEventListener('click',()=>{
      const h=view.querySelector('h3')?.textContent||'';
      const meta=[...view.querySelectorAll('.meta span')].map(x=>x.textContent).join('。');
      const cpr=[...view.querySelectorAll('.cpr > div')].map(x=>x.innerText).join('。');
      const mem=view.querySelector('.memory')?.innerText||'';
      speak([h,meta,cpr,mem].filter(Boolean).join('。'),h);
    });
  }
  function installBookReader(){
    const detail=document.querySelector('#bookreader .book-detail'); if(!detail || detail.querySelector('.book-voice-row')) return;
    const row=document.createElement('div');row.className='book-voice-row';row.innerHTML='<button type="button" class="read-inline">🎙️ 念目前書卷</button>';
    detail.prepend(row);
    row.querySelector('button').addEventListener('click',()=>{
      const title=detail.querySelector('h3')?.textContent||'';
      const text=[...detail.querySelectorAll('p,.chapter-chips button')].map(x=>x.textContent).join('。');
      speak([title,text].filter(Boolean).join('。'),title);
    });
  }
  installChapterReader();installBookReader();
  const acts=document.getElementById('acts'),books=document.getElementById('bookreader');
  if(acts)new MutationObserver(installChapterReader).observe(acts,{childList:true,subtree:true});
  if(books)new MutationObserver(installBookReader).observe(books,{childList:true,subtree:true});

  // Stop narration when leaving page.
  window.addEventListener('beforeunload',()=>synth.cancel());
})();