const fs=require('fs');
const p='public/index.html';
let s=fs.readFileSync(p,'utf8');
s=s.replace('</head>','<link rel="stylesheet" href="/simple-v7.css"><link rel="stylesheet" href="/simple-v8.css"><link rel="stylesheet" href="/simple-v9.css"><link rel="stylesheet" href="/simple-v11.css"><link rel="stylesheet" href="/simple-v12.css"><link rel="stylesheet" href="/simple-v14.css"></head>');
s=s.replace('</body>','<script src="/simple-v7.js"></script><script src="/simple-v8.js"></script><script src="/simple-v9.js"></script><script src="/simple-v10.js"></script><script src="/simple-v11.js"></script><script src="/simple-v12.js"></script><script src="/simple-v14.js"></script></body>');
fs.writeFileSync(p,s);
for(const f of ['simple-v7.css','simple-v7.js','simple-v8.css','simple-v8.js','simple-v9.css','simple-v9.js','simple-v10.js','simple-v11.css','simple-v11.js','simple-v12.css','simple-v12.js','simple-v14.css','simple-v14.js']) fs.copyFileSync('paul-acts-atlas/'+f,'public/'+f);