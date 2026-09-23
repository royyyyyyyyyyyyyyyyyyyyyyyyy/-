const fs=require('fs');
const p='public/index.html';
let s=fs.readFileSync(p,'utf8');
s=s.replace('</head>','<link rel="stylesheet" href="/simple-v7.css"><link rel="stylesheet" href="/simple-v8.css"><link rel="stylesheet" href="/simple-v9.css"></head>');
s=s.replace('</body>','<script src="/simple-v7.js"></script><script src="/simple-v8.js"></script><script src="/simple-v9.js"></script></body>');
fs.writeFileSync(p,s);
for(const f of ['simple-v7.css','simple-v7.js','simple-v8.css','simple-v8.js','simple-v9.css','simple-v9.js']) fs.copyFileSync('paul-acts-atlas/'+f,'public/'+f);