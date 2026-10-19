"use strict";
(() => {
  // ALYINA · Vampire of Halloween — arcade gothic blocks, plain JS + Canvas.
  const W=10,H=20,S=30;
  const canvas=document.getElementById("board"),ctx=canvas.getContext("2d");
  const nextCanvas=document.getElementById("next"),nextCtx=nextCanvas.getContext("2d");
  const holdCanvas=document.getElementById("hold"),holdCtx=holdCanvas.getContext("2d");
  const overlay=document.getElementById("overlay"),kicker=document.getElementById("overlay-kicker");
  const title=document.getElementById("overlay-title"),message=document.getElementById("overlay-message");
  const primary=document.getElementById("primary-button"),pauseButton=document.getElementById("pause-button");
  const soundButton=document.getElementById("sound-button"),scoreEl=document.getElementById("score");
  const linesEl=document.getElementById("lines"),levelEl=document.getElementById("level");
  const bestEl=document.getElementById("best"),announcer=document.getElementById("announcer");
  const palettes=[
    null,
    {c:"#ef405b",hi:"#ff9ba1",lo:"#711433",glyph:"♦"},
    {c:"#fa893f",hi:"#ffe09e",lo:"#803323",glyph:"☾"},
    {c:"#a66aeb",hi:"#e4bcff",lo:"#48206b",glyph:"✦"},
    {c:"#b4dc68",hi:"#eeffb5",lo:"#53672a",glyph:"✣"},
    {c:"#a9eeed",hi:"#f3ffff",lo:"#287c89",glyph:"✧"},
    {c:"#f36ab4",hi:"#ffd0e9",lo:"#78234a",glyph:"✝"},
    {c:"#6e85df",hi:"#c6deff",lo:"#273b74",glyph:"◆"}
  ];
  const shapes={
    I:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    J:[[2,0,0],[2,2,2],[0,0,0]],
    L:[[0,0,3],[3,3,3],[0,0,0]],
    O:[[4,4],[4,4]],
    S:[[0,5,5],[5,5,0],[0,0,0]],
    T:[[0,6,0],[6,6,6],[0,0,0]],
    Z:[[7,7,0],[0,7,7],[0,0,0]]
  };
  const types=Object.keys(shapes),points=[0,100,300,500,800],storageKey="alyina-vampire-halloween-best-v1";
  const board=Array.from({length:H},()=>Array(W).fill(0));
  let bag=[],queue=[],piece=null,held=null,holdUsed=false;
  let score=0,lines=0,level=1,combo=-1,best=0;
  let started=false,paused=false,over=false,audioOn=true,audioCtx=null;
  let dropClock=0,lastFrame=0,raf=0,particles=[],shake=0,flash=0,lightning=0,popup=null;
  try{best=Number(localStorage.getItem(storageKey))||0;}catch(_){}
  bestEl.textContent=best.toLocaleString("fr-FR");
  let seed=171031;
  function rand(){seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;}
  const backdrop=document.createElement("canvas");backdrop.width=300;backdrop.height=600;
  const bg=backdrop.getContext("2d");
  function paintScenery(){
    const sky=bg.createLinearGradient(0,0,0,600);
    sky.addColorStop(0,"#210d39");sky.addColorStop(.5,"#2b153c");sky.addColorStop(1,"#100819");
    bg.fillStyle=sky;bg.fillRect(0,0,300,600);
    let aura=bg.createRadialGradient(235,100,5,235,100,170);
    aura.addColorStop(0,"rgba(250,88,119,.30)");aura.addColorStop(1,"transparent");
    bg.fillStyle=aura;bg.fillRect(0,0,300,360);
    for(let i=0;i<90;i++){
      bg.fillStyle=i%5?"rgba(245,211,255,.35)":"rgba(255,189,166,.50)";
      bg.fillRect(rand()*300,rand()*430,rand()>.87?2:1,1);
    }
    bg.save();bg.shadowColor="#ff6b97";bg.shadowBlur=28;
    bg.fillStyle="#f3a1ae";bg.beginPath();bg.arc(231,93,38,0,Math.PI*2);bg.fill();bg.restore();
    bg.fillStyle="rgba(109,62,97,.15)";
    for(const [x,y,r] of [[213,83,10],[242,80,7],[241,109,12]]){
      bg.beginPath();bg.arc(x,y,r,0,Math.PI*2);bg.fill();
    }
    bg.strokeStyle="#24122b";bg.lineWidth=2;bg.lineCap="round";
    for(const [x,y,s] of [[80,115,1],[109,129,.65],[53,162,.7]]){
      bg.beginPath();bg.moveTo(x-12*s,y-2*s);bg.quadraticCurveTo(x-5*s,y-10*s,x,y);
      bg.quadraticCurveTo(x+5*s,y-10*s,x+12*s,y-2*s);bg.stroke();
    }
    bg.fillStyle="#140d22";
    function tower(x,w,top,bottom){
      bg.fillRect(x,top,w,bottom-top);
      bg.beginPath();bg.moveTo(x-7,top);bg.lineTo(x+w/2,top-52);bg.lineTo(x+w+7,top);bg.fill();
      bg.fillRect(x+w/2-2,top-60,4,12);
      for(let j=x+3;j<x+w;j+=11)bg.fillRect(j,top-8,7,10);
    }
    tower(24,49,258,520);tower(200,54,230,520);tower(113,77,191,520);
    bg.fillRect(38,285,198,245);
    bg.fillStyle="#27132b";
    for(const [x,y] of [[47,290],[67,290],[127,235],[154,235],[216,265],[235,265],[148,332]]){
      bg.beginPath();bg.arc(x,y,5,Math.PI,0);bg.lineTo(x+5,y+17);bg.lineTo(x-5,y+17);bg.fill();
      bg.fillStyle="rgba(255,85,67,.72)";bg.fillRect(x-2,y+3,4,9);bg.fillStyle="#27132b";
    }
    // Graveyard, fence, mausoleums and thorn trees.
    bg.fillStyle="#0d0b19";bg.fillRect(0,497,300,103);
    for(let x=0;x<300;x+=17){
      bg.fillRect(x+4,452,4,74);bg.beginPath();bg.moveTo(x+2,452);
      bg.lineTo(x+6,439);bg.lineTo(x+10,452);bg.fill();
    }
    bg.fillRect(0,478,300,5);bg.fillRect(0,510,300,6);
    bg.fillStyle="#080813";
    for(const [x,y,w,h] of [[25,552,25,35],[88,561,22,27],[190,548,26,40],[262,568,23,32]]){
      bg.beginPath();bg.arc(x+w/2,y,w/2,Math.PI,0);bg.lineTo(x+w,y+h);bg.lineTo(x,y+h);bg.fill();
      bg.strokeStyle="#392238";bg.lineWidth=1.5;bg.beginPath();
      bg.moveTo(x+w/2,y+5);bg.lineTo(x+w/2,y+19);bg.moveTo(x+6,y+12);bg.lineTo(x+w-6,y+12);bg.stroke();
    }
    function tree(x,y,s){
      bg.strokeStyle="#080712";bg.lineWidth=8*s;bg.lineCap="round";bg.beginPath();
      bg.moveTo(x,y+80*s);bg.lineTo(x+6*s,y+6*s);bg.lineTo(x-20*s,y-25*s);
      bg.moveTo(x+4*s,y+30*s);bg.lineTo(x+31*s,y-10*s);bg.lineTo(x+44*s,y-25*s);
      bg.moveTo(x-10*s,y-12*s);bg.lineTo(x+7*s,y-37*s);bg.stroke();
    }
    tree(6,509,.75);tree(290,509,.8);
    bg.strokeStyle="rgba(238,167,192,.075)";bg.lineWidth=1;
    for(let x=0;x<=300;x+=30){bg.beginPath();bg.moveTo(x,0);bg.lineTo(x,600);bg.stroke();}
    for(let y=0;y<=600;y+=30){bg.beginPath();bg.moveTo(0,y);bg.lineTo(300,y);bg.stroke();}
  }
  paintScenery();
  function newBag(){
    const a=types.slice();
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    bag.push(...a);
  }
  function refill(){while(queue.length<5){if(!bag.length)newBag();queue.push(bag.shift());}}
  function create(type){return {type,m:shapes[type].map(r=>r.slice()),x:0,y:0};}
  function fits(p,dx=0,dy=0,m=p.m){
    for(let y=0;y<m.length;y++)for(let x=0;x<m[y].length;x++){
      if(!m[y][x])continue;
      const xx=p.x+x+dx,yy=p.y+y+dy;
      if(xx<0||xx>=W||yy>=H||(yy>=0&&board[yy][xx]))return false;
    }
    return true;
  }
  function spawn(){
    refill();piece=create(queue.shift());refill();
    piece.x=Math.floor((W-piece.m.length)/2);piece.y=0;holdUsed=false;previews();
    if(!fits(piece))endGame();
  }
  function stats(){
    scoreEl.textContent=score.toLocaleString("fr-FR");
    linesEl.textContent=lines.toLocaleString("fr-FR");
    levelEl.textContent=String(level).padStart(2,"0");
    if(score>best){best=score;bestEl.textContent=best.toLocaleString("fr-FR");
      try{localStorage.setItem(storageKey,String(best));}catch(_){}}
  }
  const awake=()=>started&&!paused&&!over&&!!piece;
  const delay=()=>Math.max(85,1000*Math.pow(.83,level-1));
  function say(text){announcer.textContent=text;}
  function overlayMode(mode){
    const options={
      start:["LE RÉVEIL","La nuit t'attend","Empile les reliques. Récolte le sang. Échappe à l'aube.","RÉVEILLER ALYINA"],
      pause:["LE TEMPS EST SUSPENDU","La nuit retient son souffle","Ton royaume attend ton retour.","REPRENDRE LA NUIT"],
      over:["L'AUBE A GAGNÉ","Morsure fatale","Ton butin : "+score.toLocaleString("fr-FR")+" gouttes de sang. Prends ta revanche.","RESSUSCITER ALYINA"]
    }[mode];
    kicker.textContent=options[0];title.textContent=options[1];message.textContent=options[2];
    primary.innerHTML=options[3]+' <span aria-hidden="true">→</span>';overlay.hidden=false;
  }
  function sound(freq=420,duration=.08,wave="sine",volume=.03,end=null){
    if(!audioOn)return;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
      if(!audioCtx)audioCtx=new Audio();
      if(audioCtx.state==="suspended")audioCtx.resume();
      const osc=audioCtx.createOscillator(),env=audioCtx.createGain(),t=audioCtx.currentTime;
      osc.type=wave;osc.frequency.setValueAtTime(freq,t);
      if(end)osc.frequency.exponentialRampToValueAtTime(Math.max(20,end),t+duration);
      env.gain.setValueAtTime(volume,t);env.gain.exponentialRampToValueAtTime(.0001,t+duration);
      osc.connect(env);env.connect(audioCtx.destination);
      osc.start(t);osc.stop(t+duration+.01);
    }catch(_){}
  }
  function move(dx){
    if(!awake())return;
    if(fits(piece,dx)){piece.x+=dx;sound(240,.04,"triangle",.012);}
  }
  function rotateMatrix(m,dir){
    const n=m.length,r=Array.from({length:n},()=>Array(n).fill(0));
    for(let y=0;y<n;y++)for(let x=0;x<n;x++){
      if(dir>0)r[x][n-1-y]=m[y][x];
      else r[n-1-x][y]=m[y][x];
    }
    return r;
  }
  function rotate(dir){
    if(!awake()||piece.type==="O")return;
    const r=rotateMatrix(piece.m,dir);
    for(const [dx,dy] of [[0,0],[-1,0],[1,0],[-2,0],[2,0],[0,-1],[-1,-1],[1,-1],[0,-2]]){
      if(fits(piece,dx,dy,r)){piece.x+=dx;piece.y+=dy;piece.m=r;sound(380,.1,"sine",.026,590);break;}
    }
  }
  function down(){
    if(!awake())return;
    if(fits(piece,0,1)){piece.y++;score++;stats();}
    else lock();
    dropClock=0;
  }
  function hardDrop(){
    if(!awake())return;
    let distance=0;while(fits(piece,0,1)){piece.y++;distance++;}
    score+=2*distance;shake=9;flash=.2;sound(130,.18,"sawtooth",.04,55);
    lock();stats();dropClock=0;
  }
  function holdPiece(){
    if(!awake()||holdUsed)return;
    const type=piece.type;
    if(held){
      piece=create(held);held=type;piece.x=Math.floor((W-piece.m.length)/2);
      if(!fits(piece)){endGame();return;}
    }else{held=type;spawn();}
    holdUsed=true;previews();sound(510,.12,"triangle",.025,300);
  }
  function scatter(y){
    const colors=["#ff507a","#ffb97c","#e7a3ff","#fff0e1"];
    for(let i=0;i<30;i++)particles.push({
      x:rand()*300,y:(y+rand())*30,vx:(rand()-.5)*240,vy:-70-rand()*210,
      life:.5+rand()*.5,max:1,size:2+rand()*4,color:colors[Math.floor(rand()*4)]
    });
    if(particles.length>250)particles.splice(0,particles.length-250);
  }
  function sweep(){
    let cleared=0;
    for(let y=H-1;y>=0;y--){
      if(board[y].every(Boolean)){
        scatter(y);board.splice(y,1);board.unshift(Array(W).fill(0));cleared++;y++;
      }
    }
    if(cleared){
      combo++;const oldLevel=level;
      lines+=cleared;score+=points[cleared]*level;
      if(combo>0)score+=50*combo*level;
      level=Math.floor(lines/10)+1;
      shake=cleared===4?13:7;flash=cleared===4?.65:.35;
      popup={text:["","SAIGNÉE !","DOUBLE MORSURE !","TRIPLE SORT !","TÉTRIS MAUDIT !"][cleared],life:1.35};
      say(cleared+" ligne(s) effacée(s). Score "+score+".");
      sound(320+cleared*95,.35,"triangle",.07,630+cleared*100);
      if(level>oldLevel)sound(790,.4,"sine",.05,1180);
    }else combo=-1;
    stats();
  }
  function lock(){
    if(!piece)return;
    let topOut=false;
    for(let y=0;y<piece.m.length;y++)for(let x=0;x<piece.m[y].length;x++){
      if(!piece.m[y][x])continue;
      const yy=piece.y+y,xx=piece.x+x;
      if(yy<0)topOut=true;
      else if(yy<H&&xx>=0&&xx<W)board[yy][xx]=piece.m[y][x];
    }
    if(topOut){endGame();return;}
    sweep();spawn();
  }
  function endGame(){
    over=true;paused=false;pauseButton.disabled=true;pauseButton.innerHTML='Ⅱ <span>PAUSE</span>';
    overlayMode("over");sound(275,.65,"sawtooth",.045,55);say("Fin de partie. Score "+score);
  }
  function start(){
    board.forEach(row=>row.fill(0));bag=[];queue=[];piece=null;held=null;holdUsed=false;
    score=0;lines=0;level=1;combo=-1;dropClock=0;lastFrame=0;
    particles=[];shake=0;flash=0;popup=null;over=false;paused=false;started=true;
    stats();spawn();overlay.hidden=true;pauseButton.disabled=false;
    pauseButton.innerHTML='Ⅱ <span>PAUSE</span>';
    sound(450,.22,"triangle",.04,730);say("Alyina s'est réveillée !");
  }
  function togglePause(){
    if(!started||over)return;
    paused=!paused;lastFrame=0;dropClock=0;
    if(paused){overlayMode("pause");say("Partie en pause.");}
    else{overlay.hidden=true;say("Partie reprise.");}
    pauseButton.innerHTML=paused?'▶ <span>REPRENDRE</span>':'Ⅱ <span>PAUSE</span>';
  }
  function tile(g,x,y,size,id,opt={}){
    if(!id)return;
    const p=palettes[id],m=opt.ghost?3:1.4;
    g.save();g.translate(x,y);
    if(opt.ghost){
      g.globalAlpha=.42;g.fillStyle=p.c;g.fillRect(2,2,size-4,size-4);
      g.strokeStyle=p.hi;g.globalAlpha=.8;g.lineWidth=1.4;g.setLineDash([3,3]);
      g.strokeRect(2,2,size-4,size-4);g.restore();return;
    }
    if(opt.active){g.shadowColor=p.c;g.shadowBlur=size*.62;}
    const gradient=g.createLinearGradient(0,0,size,size);
    gradient.addColorStop(0,p.hi);gradient.addColorStop(.26,p.c);
    gradient.addColorStop(.78,p.lo);gradient.addColorStop(1,p.c);
    g.fillStyle=gradient;g.beginPath();g.roundRect(m,m,size-2*m,size-2*m,Math.max(2,size*.13));g.fill();
    g.shadowBlur=0;g.strokeStyle=p.hi;g.globalAlpha=.62;
    g.lineWidth=Math.max(.8,size*.055);g.strokeRect(m+2,m+2,size-2*m-4,size-2*m-4);
    g.fillStyle="rgba(255,255,255,.33)";g.fillRect(4,4,size-8,Math.max(1,size*.07));
    g.fillStyle="rgba(0,0,0,.21)";g.fillRect(5,size-6,size-10,2);
    g.globalAlpha=.85;g.fillStyle="#fff0ee";
    g.font=Math.round(size*.48)+"px Georgia,serif";g.textAlign="center";g.textBaseline="middle";
    g.fillText(p.glyph,size/2,size/2+1);g.restore();
  }
  function pieceTiles(g,p,ghost=false,dy=0){
    if(!p)return;
    p.m.forEach((row,y)=>row.forEach((id,x)=>{
      if(id)tile(g,(p.x+x)*S,(p.y+y+dy)*S,S,id,{ghost,active:!ghost});
    }));
  }
  function preview(g,element,type){
    g.clearRect(0,0,element.width,element.height);
    g.fillStyle="#170c28";g.fillRect(0,0,120,120);
    g.strokeStyle="rgba(236,160,213,.14)";g.lineWidth=1;
    for(const r of [46,34]){g.beginPath();g.arc(60,60,r,0,Math.PI*2);g.stroke();}
    g.beginPath();g.moveTo(17,60);g.lineTo(103,60);g.moveTo(60,17);g.lineTo(60,103);g.stroke();
    if(!type){g.fillStyle="#674a75";g.font="29px Georgia,serif";g.textAlign="center";g.textBaseline="middle";g.fillText("?",60,62);return;}
    const cells=[];
    shapes[type].forEach((row,y)=>row.forEach((id,x)=>{if(id)cells.push({x,y,id});}));
    const minX=Math.min(...cells.map(c=>c.x)),maxX=Math.max(...cells.map(c=>c.x));
    const minY=Math.min(...cells.map(c=>c.y)),maxY=Math.max(...cells.map(c=>c.y));
    const size=23,x0=(120-(maxX-minX+1)*size)/2,y0=(120-(maxY-minY+1)*size)/2;
    cells.forEach(c=>tile(g,x0+(c.x-minX)*size,y0+(c.y-minY)*size,size,c.id,{active:true}));
  }
  function previews(){preview(nextCtx,nextCanvas,queue[0]||null);preview(holdCtx,holdCanvas,held);}
  function paint(time){
    ctx.clearRect(0,0,300,600);ctx.save();
    if(shake>0)ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
    ctx.drawImage(backdrop,0,0);
    for(let i=0;i<5;i++){
      const y=85+i*112+Math.sin(time*.0005+i)*12;
      const fog=ctx.createLinearGradient(0,y-35,0,y+45);
      fog.addColorStop(0,"transparent");
      fog.addColorStop(.5,i%2?"rgba(231,83,169,.073)":"rgba(173,123,250,.068)");
      fog.addColorStop(1,"transparent");ctx.fillStyle=fog;ctx.fillRect(0,y-35,300,80);
    }
    if(lightning>0){
      ctx.fillStyle="rgba(240,198,255,"+(lightning*.27)+")";ctx.fillRect(0,0,300,600);
      ctx.strokeStyle="rgba(250,231,255,"+lightning+")";ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(26,0);ctx.lineTo(49,50);ctx.lineTo(38,82);ctx.lineTo(68,123);ctx.lineTo(57,154);ctx.stroke();
    }
    for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(board[y][x])tile(ctx,x*S,y*S,S,board[y][x]);
    if(piece&&started&&!over){
      let ghostY=0;while(fits(piece,0,ghostY+1))ghostY++;
      if(ghostY)pieceTiles(ctx,piece,true,ghostY);
      pieceTiles(ctx,piece);
    }
    const vignette=ctx.createRadialGradient(150,280,145,150,300,380);
    vignette.addColorStop(0,"transparent");vignette.addColorStop(1,"rgba(8,3,16,.55)");
    ctx.fillStyle=vignette;ctx.fillRect(0,0,300,600);
    ctx.strokeStyle="rgba(255,176,115,.43)";ctx.lineWidth=2;
    for(const [x,y,sx,sy] of [[0,0,1,1],[300,0,-1,1],[0,600,1,-1],[300,600,-1,-1]]){
      ctx.beginPath();ctx.moveTo(x+sx*2,y+sy*27);ctx.lineTo(x+sx*2,y+sy*2);
      ctx.lineTo(x+sx*27,y+sy*2);ctx.stroke();
      ctx.fillStyle="#ffc08c";ctx.beginPath();ctx.arc(x+sx*8,y+sy*8,2,0,Math.PI*2);ctx.fill();
    }
    for(const p of particles){
      ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.color;ctx.shadowColor=p.color;ctx.shadowBlur=8;
      ctx.fillRect(p.x,p.y,p.size,p.size);
    }ctx.globalAlpha=1;ctx.shadowBlur=0;
    if(flash>0){ctx.fillStyle="rgba(255,79,132,"+Math.min(.20,flash*.25)+")";ctx.fillRect(0,0,300,600);}
    if(popup){
      ctx.globalAlpha=Math.min(1,popup.life*2);ctx.textAlign="center";
      ctx.font="bold 22px Cinzel, Georgia, serif";ctx.shadowColor="#ff416c";ctx.shadowBlur=20;
      ctx.fillStyle="#ffe0b3";ctx.fillText(popup.text,150,203-(1.35-popup.life)*25);
      ctx.shadowBlur=0;ctx.globalAlpha=1;
    }
    ctx.restore();
  }
  function frame(time){
    raf=requestAnimationFrame(frame);
    const dt=lastFrame?Math.min((time-lastFrame)/1000,.05):0;
    lastFrame=time;
    if(!paused){
      if(started&&!over){
        dropClock+=dt*1000;
        if(dropClock>=delay()){
          dropClock=0;if(fits(piece,0,1))piece.y++;else lock();
        }
      }
      shake=Math.max(0,shake-dt*27);flash=Math.max(0,flash-dt*1.7);
      lightning=Math.max(0,lightning-dt*4);
      if(started&&Math.random()<dt*.07)lightning=.8;
      if(popup){popup.life-=dt;if(popup.life<=0)popup=null;}
      for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=420*dt;p.life-=dt;}
      particles=particles.filter(p=>p.life>0);
    }
    paint(time);
  }
  const commands={left:()=>move(-1),right:()=>move(1),down,rotate:()=>rotate(1),"hard-drop":hardDrop,hold:holdPiece};
  const keys={ArrowLeft:"left",ArrowRight:"right",ArrowDown:"down",ArrowUp:"rotate",KeyX:"rotate",KeyZ:"reverse",Space:"hard-drop",KeyC:"hold",ShiftLeft:"hold",ShiftRight:"hold"};
  window.addEventListener("keydown",e=>{
    const code=e.code;
    if(keys[code]||code==="KeyP"||code==="Escape"||code==="Enter")e.preventDefault();
    if(code==="KeyP"||code==="Escape"){if(!e.repeat)togglePause();return;}
    if(!started||over){if((code==="Enter"||code==="Space")&&!e.repeat)start();return;}
    if(paused){if((code==="Enter"||code==="Space")&&!e.repeat)togglePause();return;}
    if(!keys[code])return;
    if(e.repeat&&!["ArrowLeft","ArrowRight","ArrowDown"].includes(code))return;
    if(code==="KeyZ")rotate(-1);else commands[keys[code]]();
  });
  const repeats=new Map();
  function release(id){
    const r=repeats.get(id);if(!r)return;
    clearTimeout(r.timeout);clearInterval(r.interval);r.button.classList.remove("held");repeats.delete(id);
  }
  document.querySelectorAll("[data-action]").forEach(button=>{
    const action=button.dataset.action;
    button.addEventListener("pointerdown",e=>{
      e.preventDefault();if(!awake())return;
      try{button.setPointerCapture(e.pointerId);}catch(_){}
      commands[action]();button.classList.add("held");
      const r={button,timeout:null,interval:null};repeats.set(e.pointerId,r);
      if(["left","right","down"].includes(action)){
        r.timeout=setTimeout(()=>{r.interval=setInterval(()=>{if(awake())commands[action]();},75);},240);
      }
    });
    for(const ev of ["pointerup","pointercancel","lostpointercapture"])button.addEventListener(ev,e=>release(e.pointerId));
  });
  window.addEventListener("blur",()=>{
    for(const id of [...repeats.keys()])release(id);
    if(started&&!paused&&!over)togglePause();
  });
  document.addEventListener("visibilitychange",()=>{
    if(document.hidden&&started&&!paused&&!over)togglePause();
  });
  let gesture=null;
  canvas.addEventListener("pointerdown",e=>{
    if(!awake())return;
    e.preventDefault();canvas.setPointerCapture(e.pointerId);
    gesture={id:e.pointerId,x:e.clientX,y:e.clientY,originY:e.clientY,moved:false};
  });
  canvas.addEventListener("pointermove",e=>{
    if(!gesture||gesture.id!==e.pointerId||!awake())return;
    e.preventDefault();const unit=canvas.getBoundingClientRect().width/W;
    const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
    if(Math.abs(dx)>unit*.74){
      const dir=dx>0?1:-1;move(dir);gesture.x+=dir*unit*.74;gesture.moved=true;
    }
    if(dy>unit*.98){down();gesture.y+=unit*.98;gesture.moved=true;}
  });
  canvas.addEventListener("pointerup",e=>{
    if(!gesture||gesture.id!==e.pointerId)return;
    if(awake()){
      const travel=e.clientY-gesture.originY;
      if(travel>canvas.getBoundingClientRect().width*.35)hardDrop();
      else if(!gesture.moved)rotate(1);
    }
    gesture=null;
  });
  canvas.addEventListener("pointercancel",()=>gesture=null);
  primary.addEventListener("click",()=>{if(paused&&!over)togglePause();else start();});
  pauseButton.addEventListener("click",togglePause);
  soundButton.addEventListener("click",()=>{
    audioOn=!audioOn;soundButton.setAttribute("aria-pressed",String(audioOn));
    soundButton.setAttribute("aria-label",audioOn?"Désactiver le son":"Activer le son");
    soundButton.innerHTML=audioOn?'♫ <span>SON ON</span>':'♪ <span>SON OFF</span>';
    if(audioOn)sound(620,.09,"sine",.03);
  });
  previews();overlayMode("start");paint(0);raf=requestAnimationFrame(frame);
})();