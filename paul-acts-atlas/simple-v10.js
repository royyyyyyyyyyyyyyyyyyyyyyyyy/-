// Paul Acts Atlas v10 — single-chapter book reader fix
(() => {
  if (typeof BOOKDETAILS === 'undefined') return;
  BOOKDETAILS['腓利門書']=[
    '福音如何重新定義主人與奴僕',
    '全書只有1章：保羅為阿尼西母代求',
    ['保羅不靠權柄強迫；請腓利門接納阿尼西母，不再只是奴僕，而是親愛弟兄；保羅願承擔虧欠。']
  ];
  BOOKDETAILS['約翰二書']=[
    '愛不能離開真理',
    '全書只有1章',
    ['在真理中彼此相愛；防備不承認基督成肉身的迷惑者；接待也要分辨。']
  ];
  BOOKDETAILS['約翰三書']=[
    '用接待支持真理工作',
    '全書只有1章',
    ['稱讚該猶接待弟兄；責備丟特腓好為首、不接待人；推薦低米丟。']
  ];
  BOOKDETAILS['猶大書']=[
    '為真道竭力爭辯',
    '全書只有1章',
    ['假教師偷進教會；回顧曠野、天使、所多瑪等審判例；信徒要保守自己在神愛中並憐憫動搖者。']
  ];

  // Defensive rendering so a malformed single-chapter record can never blank the panel again.
  if (typeof showBookDetail === 'function') {
    const original=showBookDetail;
    showBookDetail=function(n){
      const d=BOOKDETAILS[n];
      if(d && !Array.isArray(d[2])){
        const last=Array.isArray(d[d.length-1])?d[d.length-1]:[String(d[2]||'')];
        BOOKDETAILS[n]=[d[0]||'',d[1]||'全書只有1章',last];
      }
      return original(n);
    };
  }
  if (typeof renderBookReader === 'function') renderBookReader();
})();