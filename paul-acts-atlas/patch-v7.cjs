const fs=require('fs');
const p='public/index.html';
let s=fs.readFileSync(p,'utf8');
s=s.replace('</head>','<link rel="stylesheet" href="/simple-v7.css"></head>');
s=s.replace('</body>','<script src="/simple-v7.js"></script></body>');
fs.writeFileSync(p,s);
fs.copyFileSync('paul-acts-atlas/simple-v7.css','public/simple-v7.css');
fs.copyFileSync('paul-acts-atlas/simple-v7.js','public/simple-v7.js');