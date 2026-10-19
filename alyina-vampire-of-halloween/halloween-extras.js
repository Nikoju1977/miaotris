/* Alyina — Halloween illustrations & original procedural soundtrack.
 * No images, samples or music files: every asset is hand-drawn or synthesized.
 */
(function () {
  "use strict";

  const TAU = Math.PI * 2;
  function drawIcon(g, size, id) {
    // Hand-drawn vector icons remain sharp in both the playfield and the previews.
    g.save();
    g.scale(size / 30, size / 30);
    g.lineJoin = "round";
    g.lineCap = "round";
    g.shadowBlur = 2;
    g.shadowColor = "rgba(12,5,18,.85)";
    const path = () => g.beginPath();
    const stroke = (color, width=1) => {g.strokeStyle=color;g.lineWidth=width;g.stroke();};
    const fill = (color) => {g.fillStyle=color;g.fill();};
    switch(id) {
      case 1: { // Bat with scalloped leather wings and ruby eyes
        path();
        g.moveTo(15,12);g.lineTo(11,9);g.bezierCurveTo(6,6,3,9,2,5);
        g.quadraticCurveTo(1,13,3,19);g.quadraticCurveTo(6,15,8,19);
        g.quadraticCurveTo(10,15,12,20);g.lineTo(15,23);
        g.lineTo(18,20);g.quadraticCurveTo(20,15,22,19);
        g.quadraticCurveTo(24,15,27,19);g.quadraticCurveTo(29,13,28,5);
        g.bezierCurveTo(25,9,22,6,19,9);g.closePath();fill("#170b26");
        path();g.moveTo(12,12);g.lineTo(13,8);g.lineTo(15,11);g.lineTo(17,8);g.lineTo(18,12);fill("#170b26");
        g.fillStyle="#ffec93";g.fillRect(12,14,2,2);g.fillRect(16,14,2,2);
        path();g.moveTo(15,17);g.lineTo(13,20);g.lineTo(17,20);g.closePath();fill("#c6405c");
        break;
      }
      case 2: { // Smiling jack-o-lantern
        path();g.ellipse(15,16,11,9.4,0,0,TAU);fill("#9b3715");
        path();g.ellipse(15,15.5,9.8,9.2,0,0,TAU);fill("#ffac37");
        path();g.ellipse(10.8,15.7,3.0,8.2,0,0,TAU);stroke("#dc741a",1.2);
        path();g.ellipse(19.1,15.7,3.0,8.2,0,0,TAU);stroke("#dc741a",1.2);
        path();g.moveTo(15,7.5);g.lineTo(15.8,3.9);g.lineTo(18,3.7);g.lineTo(17.3,8.2);stroke("#547028",2.8);
        path();g.moveTo(9,14);g.lineTo(12,10.5);g.lineTo(13,14);g.closePath();fill("#39202a");
        path();g.moveTo(17,14);g.lineTo(20,10.5);g.lineTo(22,14);g.closePath();fill("#39202a");
        path();g.moveTo(7.8,18);g.quadraticCurveTo(15,25.7,22.2,18);
        g.lineTo(20.1,22);g.lineTo(17.1,21.6);g.lineTo(15,23.2);g.lineTo(12.8,21.6);
        g.lineTo(9.6,22);g.closePath();fill("#3f1d20");
        g.shadowColor="#ffdb5b";g.shadowBlur=4;
        path();g.moveTo(9,13);g.lineTo(12,11.3);g.lineTo(11.5,13.1);g.closePath();fill("#ffe477");
        path();g.moveTo(19,11.3);g.lineTo(21,13);g.lineTo(18.5,13.1);g.closePath();fill("#ffe477");
        break;
      }
      case 3: { // Black cat, pointed ears, emerald eyes, whiskers and tail
        path();g.moveTo(9.5,12);g.lineTo(6.3,4.5);g.lineTo(13.3,8.7);
        g.quadraticCurveTo(15,8.3,16.7,8.7);g.lineTo(23.7,4.5);g.lineTo(20.5,12);
        g.bezierCurveTo(25,23.4,5,25.4,9.5,12);g.closePath();fill("#100b1b");
        path();g.moveTo(8.5,9.4);g.lineTo(7.9,7.1);g.lineTo(11.2,9.3);
        g.moveTo(18.9,9.3);g.lineTo(22,7.1);g.lineTo(21.5,9.4);stroke("#8e456c",1.05);
        path();g.ellipse(11.7,16.3,2.65,2.25,-.16,0,TAU);fill("#b5fa60");
        path();g.ellipse(18.4,16.3,2.65,2.25,.16,0,TAU);fill("#b5fa60");
        path();g.moveTo(11.8,14.8);g.lineTo(11.8,17.9);g.moveTo(18.4,14.8);g.lineTo(18.4,17.9);stroke("#160c1b",1.1);
        path();g.moveTo(14,20);g.lineTo(16.1,20);g.lineTo(15,21.2);g.closePath();fill("#ff9cae");
        path();g.moveTo(8.5,21.2);g.lineTo(3.6,19.5);g.moveTo(8.5,23);g.lineTo(3.6,23.5);
        g.moveTo(21.5,21.2);g.lineTo(26.4,19.5);g.moveTo(21.5,23);g.lineTo(26.4,23.5);stroke("#eac0cc",.75);
        break;
      }
      case 4: { // Bone skull with engraved teeth
        path();g.arc(15,13.3,8.6,Math.PI,.0);
        g.lineTo(23,17.3);g.quadraticCurveTo(22,20.5,20,20.7);
        g.lineTo(20,24);g.quadraticCurveTo(15,27,10,24);
        g.lineTo(10,20.7);g.quadraticCurveTo(8,20.5,7,17.3);g.closePath();fill("#fff3db");
        path();g.ellipse(11.1,16.3,3,3.4,.12,0,TAU);
        g.ellipse(18.9,16.3,3,3.4,-.12,0,TAU);fill("#272035");
        path();g.moveTo(15,18.1);g.lineTo(13,21.1);g.lineTo(17,21.1);g.closePath();fill("#403046");
        path();g.moveTo(12.1,23);g.lineTo(12.1,25.7);g.moveTo(15,23);g.lineTo(15,26.2);g.moveTo(17.9,23);g.lineTo(17.9,25.7);
        stroke("#aa8f96",.85);
        break;
      }
      case 5: { // Pearly ghost
        path();g.moveTo(7,16);g.arc(15,14.8,8,-Math.PI,0);
        g.lineTo(23,24.5);g.quadraticCurveTo(20,21,18,24.7);
        g.quadraticCurveTo(15,21,13,24.7);g.quadraticCurveTo(10,21,7,24.5);g.closePath();fill("#effaff");
        path();g.ellipse(12.2,15.2,1.8,2.6,0,0,TAU);g.ellipse(17.8,15.2,1.8,2.6,0,0,TAU);fill("#352044");
        path();g.ellipse(15,20,1.5,2.2,0,0,TAU);fill("#745b9d");
        path();g.moveTo(8.2,9.5);g.quadraticCurveTo(14,4.4,20.5,10);stroke("#ffffff",1.5);
        break;
      }
      case 6: { // Golden crescent with tiny stars
        path();g.arc(14.5,15,10,-1.32,1.42,true);
        g.quadraticCurveTo(18.3,21.3,19.8,15.2);
        g.quadraticCurveTo(20.6,9.1,14.5,5.3);g.closePath();fill("#ffe6a1");
        path();g.moveTo(23,5.4);g.lineTo(24.1,8);g.lineTo(26.6,9.1);g.lineTo(24.1,10.1);
        g.lineTo(23,12.8);g.lineTo(22.1,10.1);g.lineTo(19.6,9.1);g.lineTo(22.1,8);g.closePath();fill("#fff7d4");
        break;
      }
      case 7: { // Eight-legged spider on a silvery web
        g.shadowBlur=0;
        path();g.moveTo(15,1);g.lineTo(15,9);stroke("rgba(231,219,252,.8)",.8);
        for(let i=0;i<4;i++){
          const y=13+i*3;
          path();g.moveTo(12,y);g.lineTo(7,y-3);g.lineTo(4,y+(!i?-5:0));
          g.moveTo(18,y);g.lineTo(23,y-3);g.lineTo(26,y+(!i?-5:0));
          stroke("#16101e",2.1);
        }
        path();g.ellipse(15,19,5.1,6.5,0,0,TAU);fill("#130f1b");
        path();g.ellipse(15,11.5,4,3.9,0,0,TAU);fill("#130f1b");
        path();g.arc(13.6,11.4,.9,0,TAU);g.arc(16.4,11.4,.9,0,TAU);fill("#ff455e");
        path();g.moveTo(15,16);g.lineTo(14,20);g.lineTo(16,20);g.closePath();fill("#805ca3");
        break;
      }
    }
    g.restore();
  }

  // Original haunting score: four-bar minor-key progression, drones, synth bell,
  // granular-sounding pulse, rolling ostinato and a restrained stereo echo.
  // Instrument voices scheduled on the Web Audio clock to avoid timer jitter.
  const BAR=2.48, BEAT=BAR/4;
  const chords=[
    {root:110.00,third:261.63,fifth:329.63,melody:[659.25,523.25,493.88,440]},
    {root:87.31,third:220.00,fifth:261.63,melody:[698.46,523.25,440,392]},
    {root:73.42,third:174.61,fifth:220.00,melody:[587.33,440,349.23,293.66]},
    {root:82.41,third:207.65,fifth:246.94,melody:[659.25,493.88,415.3,329.63]}
  ];
  let context=null,master=null,delay=null,feedback=null,send=null;
  let ticker=null,playing=false,nextTime=0,barIndex=0,desiredMusic=true;
  function initAudio() {
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    if(!AudioContext)return false;
    if(context)return true;
    try{
      context=new AudioContext();
      master=context.createGain();master.gain.value=0;
      master.connect(context.destination);
      delay=context.createDelay(.75);delay.delayTime.value=.325;
      feedback=context.createGain();feedback.gain.value=.19;
      send=context.createGain();send.gain.value=.10;
      send.connect(delay);delay.connect(feedback);feedback.connect(delay);
      delay.connect(master);
      return true;
    }catch(_){context=null;return false;}
  }
  function voice(freq,t,duration,volume,wave="sine",detune=0,echo=false) {
    if(!context||!master)return;
    const osc=context.createOscillator(),amp=context.createGain();
    osc.type=wave;osc.frequency.setValueAtTime(freq,t);osc.detune.value=detune;
    const attack=wave==="sine"?.09:.014,release=Math.max(.06,duration*.48);
    amp.gain.setValueAtTime(.0001,t);
    amp.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),t+attack);
    amp.gain.setValueAtTime(Math.max(.0002,volume*.68),Math.max(t+attack,t+duration-release));
    amp.gain.exponentialRampToValueAtTime(.0001,t+duration);
    osc.connect(amp);amp.connect(master);
    if(echo)amp.connect(send);
    osc.start(t);osc.stop(t+duration+.03);
    osc.onended=()=>{osc.disconnect();amp.disconnect();};
  }
  function scheduleBar(t,i) {
    const chord=chords[i%4];
    // Choir-like pads; overlapping, detuned harmonics.
    voice(chord.root*2,t,BAR+.25,.038,"sine",-5);
    voice(chord.third,t,BAR+.25,.024,"triangle",4);
    voice(chord.fifth,t,BAR+.25,.019,"sine",-6);
    voice(chord.root,t,BAR*.92,.036,"sine");
    // Heartbeat low pulse.
    voice(chord.root/2,t,BEAT*.86,.080,"triangle");
    voice(chord.root/2,t+BEAT*2,BEAT*.57,.051,"triangle");
    // Music-box lead: a recognizable, dark, four-bar melody.
    chord.melody.forEach((freq,k)=>{
      if(k===3&&i%4===3)return;
      voice(freq,t+BEAT*(k+.23),BEAT*.59,.024,"sine",0,true);
      voice(freq/2,t+BEAT*(k+.23),BEAT*.46,.011,"triangle",0,true);
    });
    // Spectral ticking / ghostly high arpeggios.
    for(let n=0;n<8;n++){
      const pitches=[chord.root*4,chord.fifth*2,chord.third*2,chord.fifth*2];
      voice(pitches[n%4],t+BEAT*n/2+BEAT*.08,BEAT*.24,.0058,"triangle",0,true);
    }
    if(i%4===3){voice(987.77,t+BAR-BEAT*.5,BEAT*.44,.018,"sine",0,true);}
  }
  function tick(){
    if(!playing||!context)return;
    while(nextTime<context.currentTime+.3){
      scheduleBar(nextTime,barIndex++);nextTime+=BAR;
    }
  }
  function startMusic(){
    desiredMusic=true;
    if(playing||!initAudio())return;
    try{
      const promise=context.resume();
      if(promise&&typeof promise.catch==="function")promise.catch(()=>{});
      const now=context.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(.72,now,.12);
      playing=true;
      nextTime=now+.08;
      tick();
      ticker=window.setInterval(tick,95);
    }catch(_){}
  }
  function stopMusic(){
    playing=false;
    if(ticker!==null){window.clearInterval(ticker);ticker=null;}
    if(context&&master){
      const now=context.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(0,now,.055);
    }
  }
  function setMusicEnabled(enabled){
    desiredMusic=Boolean(enabled);
    if(!desiredMusic)stopMusic();
  }
  window.AlyinaHalloween=Object.freeze({
    drawIcon,startMusic,stopMusic,setMusicEnabled,
    isMusicEnabled:()=>desiredMusic
  });
})();
