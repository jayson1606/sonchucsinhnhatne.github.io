const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const intro=$("#intro"), exp=$("#experience"), openBtn=$("#openBtn");
let audioOn=false, audioCtx=null, wishClicks=0;

function sound(freq=520,dur=.08){
 if(!audioOn)return;
 audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();
 const o=audioCtx.createOscillator(), g=audioCtx.createGain();
 o.frequency.value=freq;o.type="sine";g.gain.setValueAtTime(.0001,audioCtx.currentTime);
 g.gain.exponentialRampToValueAtTime(.06,audioCtx.currentTime+.01);
 g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+dur);
 o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+dur);
}
$("#soundBtn").onclick=()=>{audioOn=!audioOn;$("#soundBtn").innerHTML=audioOn?"♫ <span>Âm thanh: Bật</span>":"♪ <span>Âm thanh: Tắt</span>";if(audioOn)sound(660,.12)};

openBtn.onclick=()=>{
 sound(520,.12); intro.classList.add("done"); exp.classList.remove("hidden");
 setTimeout(()=>{intro.style.display="none"; document.body.classList.add("started");},1000);
 burst(55); toast("✨ Chào mừng đến với bữa tiệc của Sơn!");
 setTimeout(()=>observeReveal(),250);
};

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
function observeReveal(){$$(".reveal").forEach(x=>io.observe(x))}
observeReveal();

$("#wishBtn").onclick=()=>{
 document.querySelector(".wish-section").scrollIntoView({behavior:"smooth"});
 setTimeout(()=>$("#unlockWish").click(),700);
};
$("#unlockWish").onclick=()=>{
 sound(720,.15); $("#wishCard").classList.add("open"); burst(28);
 toast("💌 Mở được rồi — hãy đọc thật chậm nhé.");
};

$$(".memory-card").forEach(card=>card.onclick=()=>{
 sound(440,.08);
 $("#modalImage").src=card.querySelector("img").src;
 $("#modalCaption").textContent=card.dataset.caption;
 $("#memoryModal").classList.add("show");
 burst(12);
});
$("#modalClose").onclick=()=>$("#memoryModal").classList.remove("show");
$(".modal-backdrop").onclick=()=>$("#memoryModal").classList.remove("show");
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#memoryModal").classList.remove("show")});

let cakeCount=0;
$("#cake").onclick=()=>{
 cakeCount++;sound(300+cakeCount*80,.08);
 if(cakeCount>=5){$("#cake").classList.add("off");$("#cakeHint").textContent="Điều ước đã được gửi đi ✦";burst(90);toast("🌟 Ước nguyện đã bay lên!");}
 else toast(["🕯️ Nhấn thêm một chút…","✨ Gần được rồi…","🎂 Thêm một lần nữa!","💫 Phép màu sắp xảy ra…"][cakeCount-1]);
};
$("#magicBtn").onclick=()=>{cakeCount=5;$("#cake").classList.add("off");$("#cakeHint").textContent="Điều ước đã được gửi đi ✦";sound(880,.25);burst(100);toast("🎉 BÙM! Chúc điều ước thành hiện thực!");};

$("#againBtn").onclick=()=>{
 burst(160);sound(980,.3);toast("🎊 Sinh nhật vui vẻ! Nhấn nữa nếu bạn vẫn chưa bất ngờ.");
 document.querySelector(".final-card").animate([{transform:"scale(1)"},{transform:"scale(1.025)"},{transform:"scale(1)"}],{duration:700});
};

function burst(n){
 const layer=$("#confetti");
 for(let i=0;i<n;i++){
  const el=document.createElement("i");el.className="confetti";
  el.style.setProperty("--x",Math.random()*100+"vw");
  el.style.setProperty("--drift",(Math.random()*240-120)+"px");
  el.style.setProperty("--t",(2.5+Math.random()*3)+"s");
  el.style.setProperty("--h",Math.floor(Math.random()*360));
  el.style.setProperty("--r",Math.random()*360+"deg");
  el.style.width=(5+Math.random()*7)+"px";el.style.height=(8+Math.random()*12)+"px";
  layer.appendChild(el);setTimeout(()=>el.remove(),6000);
 }
}
function toast(text){
 const t=$("#toast");t.textContent=text;t.classList.add("show");clearTimeout(window.toastTimer);
 window.toastTimer=setTimeout(()=>t.classList.remove("show"),2400);
}

const glow=$("#cursorGlow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
window.addEventListener("click",()=>{wishClicks++; if(wishClicks===8)burst(45)});

for(let i=0;i<18;i++){
 const p=document.createElement("span");p.textContent=["✦","•","♡"][Math.floor(Math.random()*3)];
 p.style.position="absolute";p.style.left=Math.random()*100+"%";p.style.top="-30px";
 p.style.color=["#ff6fae","#ffd37a","#a978ff"][i%3];p.style.opacity=.2+Math.random()*.5;
 p.style.fontSize=8+Math.random()*12+"px";
 p.style.animation=`fall ${6+Math.random()*7}s linear ${Math.random()*5}s infinite`;
 $("#petals").appendChild(p);
}
