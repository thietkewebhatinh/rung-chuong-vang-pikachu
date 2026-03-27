import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()
app.use('/assets/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🔔 Rung Chuông Vàng - Pikachu</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script src="https://cdn.tailwindcss.com"></script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html,body{overflow:hidden;height:100%;height:100dvh;width:100vw;font-family:'Nunito',sans-serif;background:#1a0a2e;touch-action:manipulation}
.fredoka{font-family:'Fredoka One',cursive}

/* STARS */
.stars-bg{position:fixed;inset:0;background:linear-gradient(135deg,#1a0a2e 0%,#2d1b69 50%,#1a0a2e 100%);z-index:0;overflow:hidden}
.star{position:absolute;border-radius:50%;animation:twinkle linear infinite}
@keyframes twinkle{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}

/* SCREENS */
.screen{position:fixed;inset:0;z-index:10;display:none;flex-direction:column;align-items:center;justify-content:center;padding:12px;overflow:hidden}
.screen.active{display:flex}

/* ANIMATIONS */
@keyframes pikaBounce{from{transform:translateY(0) scale(1)}to{transform:translateY(-14px) scale(1.05)}}
@keyframes titlePulse{0%,100%{text-shadow:0 0 20px #FFD700,0 0 40px #FFA500}50%{text-shadow:0 0 40px #FFD700,0 0 80px #FFA500,0 0 100px #FF6B35}}
@keyframes bellRing{0%,100%{transform:rotate(-15deg)}50%{transform:rotate(15deg)}}
@keyframes btnPulse{0%,100%{box-shadow:0 8px 30px rgba(255,215,0,.6),0 0 0 0 rgba(255,215,0,.4)}50%{box-shadow:0 8px 30px rgba(255,215,0,.8),0 0 0 18px rgba(255,215,0,0)}}
@keyframes slideIn{to{opacity:1;transform:translateX(0)}}
@keyframes answerPop{from{transform:scale(.3) rotate(-10deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes correctPulse{0%{transform:scale(1)}50%{transform:scale(1.12)}100%{transform:scale(1.05)}}
@keyframes floatPika{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-15px) rotate(5deg)}}
@keyframes fireworkFly{0%{transform:translate(0,0) scale(0);opacity:1}100%{transform:translate(var(--tx),var(--ty)) scale(1);opacity:0}}
@keyframes particleFloat{0%{transform:translateY(100vh) rotate(0deg);opacity:1}100%{transform:translateY(-100px) rotate(720deg);opacity:0}}
@keyframes lightning{0%{opacity:1}100%{opacity:0}}
@keyframes scoreIn{from{transform:scale(0) rotate(-180deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes popupIn{from{transform:scale(.5) translateY(40px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}

.pikachu-bounce{animation:pikaBounce .8s ease-in-out infinite alternate;filter:drop-shadow(0 0 30px #FFD700)}
.title-glow{animation:titlePulse 2s ease-in-out infinite}
.bell-ring{animation:bellRing 1s ease-in-out infinite;display:inline-block;transform-origin:top center}

/* BUTTONS */
.btn-main{background:linear-gradient(135deg,#FFD700,#FFA500);border:3px solid #fff;border-radius:50px;font-family:'Fredoka One',cursive;color:#1a0a2e;cursor:pointer;animation:btnPulse 2s ease-in-out infinite;transition:transform .2s;text-transform:uppercase;letter-spacing:1px}
.btn-main:active{transform:scale(.96)!important}
.btn-nav{background:linear-gradient(135deg,rgba(255,215,0,.18),rgba(255,165,0,.12));border:2px solid rgba(255,215,0,.5);border-radius:50px;color:#FFD700;font-family:'Fredoka One',cursive;cursor:pointer;transition:all .25s;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.btn-nav:active{transform:scale(.96)!important;background:linear-gradient(135deg,rgba(255,215,0,.32),rgba(255,165,0,.22))}

/* RULE CARDS */
.rule-card{background:linear-gradient(135deg,rgba(255,215,0,.13),rgba(255,165,0,.08));border:2px solid rgba(255,215,0,.35);border-radius:16px;display:flex;align-items:center;gap:12px;animation:slideIn .5s ease forwards;opacity:0;transform:translateX(-50px)}

/* GRID */
#screen-grid{justify-content:flex-start;padding:8px 10px}
.grid-wrap{width:100%;max-width:960px;display:flex;flex-direction:column;height:100%;height:100dvh;overflow:hidden}
.grid-header{flex-shrink:0;display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;padding:6px 0 4px}
.grid-actions{flex-shrink:0;display:flex;gap:8px;margin-bottom:6px;flex-wrap:wrap}
.grid-container{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;flex:1;align-content:start;overflow:hidden}
.q-cell{background:linear-gradient(135deg,#FFD700,#FFA500);border:2.5px solid #fff;border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s;font-family:'Fredoka One',cursive;color:#1a0a2e;position:relative;overflow:hidden;padding:6px 4px;min-height:44px;aspect-ratio:auto}
.q-cell:active:not(.done){transform:scale(.95)}
.q-cell.done{background:linear-gradient(135deg,#2e7d32,#1b5e20);border-color:rgba(0,255,136,.5);cursor:pointer;opacity:.9}
.q-cell .q-num{font-size:1rem;font-weight:900;line-height:1}
.q-cell .q-check{position:absolute;top:2px;right:3px;font-size:.7rem;color:#00ff88;display:none}
.q-cell.done .q-check{display:block}
.q-cell.wrong-done{background:linear-gradient(135deg,#c62828,#b71c1c);border-color:rgba(255,100,100,.5)}

/* QUESTION SCREEN */
#screen-question{justify-content:flex-start;padding:6px 10px;overflow-y:auto;overflow-x:hidden}
.q-wrap{width:100%;max-width:880px;display:flex;flex-direction:column;min-height:100%;gap:5px;padding-bottom:8px}
.q-top-bar{flex-shrink:0;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.q-badge{background:linear-gradient(135deg,#FFD700,#FFA500);color:#1a0a2e;border-radius:50px;font-family:'Fredoka One',cursive;padding:5px 16px;font-size:1rem;white-space:nowrap}
.mode-badge{border-radius:50px;font-family:'Fredoka One',cursive;padding:4px 12px;font-size:.8rem;white-space:nowrap}

/* TIMER ROW */
.timer-row{flex-shrink:0;display:flex;align-items:center;gap:8px}
.timer-bar-wrap{flex:1;height:12px;background:rgba(255,255,255,.12);border-radius:10px;overflow:hidden;border:1.5px solid rgba(255,215,0,.25)}
.timer-bar{height:100%;border-radius:10px;transition:width .12s linear;width:100%}
.timer-num{font-family:'Fredoka One',cursive;font-size:1.8rem;color:#FFD700;min-width:28px;text-align:center;line-height:1}

/* QUESTION CARD */
.q-card{background:linear-gradient(135deg,rgba(26,10,46,.97),rgba(45,27,105,.97));border:2.5px solid #FFD700;border-radius:18px;padding:10px 14px;flex-shrink:0;box-shadow:0 0 30px rgba(255,215,0,.2)}
.q-visual-wrap{display:flex;justify-content:center;align-items:center;margin:4px 0}
.q-visual-img{width:auto;height:auto;max-width:min(260px,50vw);max-height:min(200px,30vh);object-fit:contain;border-radius:12px;filter:drop-shadow(0 4px 16px rgba(255,215,0,.4))}
.q-visual-emoji{font-size:clamp(3.5rem,10vw,6rem);text-align:center;line-height:1;filter:drop-shadow(0 4px 12px rgba(255,215,0,.4))}
.q-text-main{font-size:clamp(1rem,2.4vw,1.5rem);color:#fff;font-weight:800;text-align:center;line-height:1.3}
.q-hint{font-size:.82rem;color:rgba(255,215,0,.7);text-align:center;margin-top:2px}

/* CHOICES */
.choices-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;flex-shrink:0}
.choice-btn{background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.04));border:2.5px solid rgba(255,215,0,.35);border-radius:14px;padding:8px 6px;cursor:pointer;transition:all .25s;text-align:center;color:#fff;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:3px;position:relative;min-height:72px}
.choice-btn:active:not(.locked){transform:scale(.96)}
.choice-num-circle{width:30px;height:30px;background:linear-gradient(135deg,#FFD700,#FFA500);color:#1a0a2e;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Fredoka One',cursive;font-size:1.1rem;flex-shrink:0}
.choice-icon{font-size:clamp(1.5rem,3.5vw,2.5rem);line-height:1}
.choice-label{font-size:clamp(.8rem,1.6vw,1rem);font-weight:800;line-height:1.2}
.choice-btn.correct{background:linear-gradient(135deg,#00c851,#007E33)!important;border-color:#00ff88!important;transform:scale(1.04);box-shadow:0 0 28px rgba(0,200,81,.6);animation:correctPulse .5s ease}
.choice-btn.wrong{background:linear-gradient(135deg,#ff4444,#cc0000)!important;border-color:#ff6666!important;opacity:.65}
.choice-btn.selected{background:linear-gradient(135deg,rgba(255,215,0,.28),rgba(255,165,0,.18))!important;border-color:#FFD700!important;transform:translateY(-2px) scale(1.02);box-shadow:0 4px 18px rgba(255,215,0,.45)}
.choice-btn.locked{cursor:default;pointer-events:none}

/* BOTTOM ACTION ROW */
.q-actions{flex-shrink:0;display:flex;gap:6px;justify-content:center;flex-wrap:wrap;padding:2px 0 4px}

/* COUNTDOWN OVERLAY — corner */
#countdown-overlay{position:fixed;bottom:70px;right:10px;z-index:200;display:none;flex-direction:column;align-items:center;gap:4px}
#countdown-overlay.active{display:flex}
#countdown-video{width:clamp(100px,18vw,170px);border-radius:12px;border:3px solid #FFD700;box-shadow:0 0 20px rgba(255,215,0,.6)}

/* ANSWER OVERLAY */
#answer-overlay{position:fixed;inset:0;z-index:300;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.7);backdrop-filter:blur(6px)}
#answer-overlay.active{display:flex}
.answer-card{background:linear-gradient(135deg,#1a0a2e,#2d1b69);border:4px solid #FFD700;border-radius:24px;padding:24px 36px;text-align:center;box-shadow:0 0 60px rgba(255,215,0,.5);animation:answerPop .4s cubic-bezier(.175,.885,.32,1.275);max-width:480px;width:90%;max-height:90vh;overflow-y:auto}
.answer-label{font-family:'Fredoka One',cursive;font-size:1rem;color:rgba(255,215,0,.75);letter-spacing:3px;text-transform:uppercase;margin-bottom:6px}
.answer-text{font-family:'Fredoka One',cursive;font-size:clamp(1.3rem,3.5vw,2.2rem);color:#FFD700;text-shadow:0 0 20px rgba(255,215,0,.8);margin-bottom:10px;line-height:1.3}
.confetti-emoji{font-size:2.2rem;animation:pulse .5s ease-in-out infinite alternate;display:block;margin-bottom:14px}

/* LION POPUP OVERLAY */
#lion-overlay{position:fixed;inset:0;z-index:280;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.75);backdrop-filter:blur(6px)}
#lion-overlay.active{display:flex}
.lion-popup{background:linear-gradient(135deg,#2a0a0a,#4a1010);border:4px solid #FF6B00;border-radius:24px;padding:28px 32px;text-align:center;box-shadow:0 0 60px rgba(255,107,0,.5);animation:popupIn .4s cubic-bezier(.175,.885,.32,1.275);max-width:400px;width:88%}

/* MEDIA OVERLAY (Gummy Bear) */
#media-overlay{position:fixed;inset:0;z-index:260;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.9);flex-direction:column;gap:12px}
#media-overlay.active{display:flex}
#media-video{max-width:min(640px,92vw);max-height:65vh;border-radius:16px;border:4px solid #FFD700}

/* RESULT POPUP */
#result-popup{position:fixed;inset:0;z-index:400;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.8);backdrop-filter:blur(8px)}
#result-popup.active{display:flex}
.result-card{background:linear-gradient(135deg,#1a0a2e,#2d1b69);border:4px solid #FFD700;border-radius:28px;padding:28px 36px;text-align:center;box-shadow:0 0 80px rgba(255,215,0,.5);animation:popupIn .5s cubic-bezier(.175,.885,.32,1.275);max-width:480px;width:90%;max-height:88vh;overflow-y:auto}
.score-ring{width:140px;height:140px;border-radius:50%;background:linear-gradient(135deg,#FFD700,#FFA500);display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 0 40px rgba(255,215,0,.6);animation:scoreIn .8s cubic-bezier(.175,.885,.32,1.275)}
.score-big{font-family:'Fredoka One',cursive;font-size:2.5rem;color:#1a0a2e;line-height:1}
.score-label{font-family:'Fredoka One',cursive;font-size:.85rem;color:#1a0a2e;opacity:.7}

/* FLOATING PIKACHU */
.float-pika{position:fixed;bottom:12px;right:12px;font-size:2.4rem;z-index:50;animation:floatPika 3s ease-in-out infinite;cursor:pointer;filter:drop-shadow(0 5px 12px rgba(255,215,0,.5))}

/* LIGHTNING */
.lightning{position:fixed;inset:0;z-index:500;pointer-events:none;background:rgba(255,215,0,.12);display:none;animation:lightning .15s ease}

/* FIREWORK */
.firework{position:fixed;pointer-events:none;font-size:1.6rem;z-index:60;animation:fireworkFly 2s ease-out forwards}
.particle{position:fixed;pointer-events:none;border-radius:50%;z-index:55;animation:particleFloat linear forwards}

/* MEDIA BUTTON */
.btn-media{background:linear-gradient(135deg,rgba(255,100,0,.3),rgba(255,50,0,.2));border:2.5px solid rgba(255,150,0,.6);border-radius:50px;color:#FFD700;font-family:'Fredoka One',cursive;cursor:pointer;transition:all .25s;display:inline-flex;align-items:center;gap:8px;animation:pulse 2s ease-in-out infinite}
.btn-media:active{transform:scale(.96)}

/* TTS status */
.tts-badge{background:rgba(255,215,0,.12);border:1.5px solid rgba(255,215,0,.3);border-radius:20px;color:rgba(255,215,0,.8);font-size:.72rem;padding:3px 8px;display:inline-flex;align-items:center;gap:3px}

/* SCORE TRACKER */
.score-tracker{background:rgba(255,215,0,.12);border:1.5px solid rgba(255,215,0,.3);border-radius:20px;padding:3px 10px;color:#FFD700;font-family:'Fredoka One',cursive;font-size:.9rem;white-space:nowrap}

/* COUNTDOWN tick sound */
@keyframes countdownPulse{0%{transform:scale(1);color:#FFD700}50%{transform:scale(1.4);color:#FF4444}100%{transform:scale(1);color:#FFD700}}
.timer-num.ticking{animation:countdownPulse .9s ease-in-out}

/* CORRECT/WRONG feedback flash */
@keyframes flashGreen{0%,100%{background:transparent}50%{background:rgba(0,200,80,.25)}}
@keyframes flashRed{0%,100%{background:transparent}50%{background:rgba(255,60,60,.25)}}
.screen-flash-green{animation:flashGreen .5s ease}
.screen-flash-red{animation:flashRed .5s ease}

/* MOBILE RESPONSIVE */
@media(max-width:480px){
  .choices-grid{grid-template-columns:1fr;gap:6px}
  .choice-btn{flex-direction:row;min-height:52px;padding:8px 12px;text-align:left;gap:10px}
  .choice-icon{font-size:1.8rem}
  .choice-label{font-size:.95rem}
  .grid-container{grid-template-columns:repeat(5,1fr);gap:5px}
  .q-visual-img{max-width:min(200px,55vw);max-height:min(150px,28vh)}
  .answer-card{padding:18px 22px}
  .result-card{padding:20px 24px}
  .lion-popup{padding:20px 22px}
  .score-ring{width:120px;height:120px}
  .score-big{font-size:2rem}
  #countdown-overlay{bottom:60px;right:6px}
  #countdown-video{width:clamp(80px,22vw,130px)}
}
@media(max-width:360px){
  .grid-container{grid-template-columns:repeat(5,1fr);gap:4px}
  .q-cell{min-height:38px}
  .q-cell .q-num{font-size:.85rem}
}
</style>
</head>
<body>
<div class="stars-bg" id="stars-bg"></div>
<div class="lightning" id="lightning"></div>

<!-- ===== INTRO ===== -->
<div class="screen active" id="screen-intro">
  <div style="text-align:center;z-index:1;max-width:600px;width:100%;padding:0 8px">
    <div><span class="bell-ring" style="font-size:3rem">🔔</span></div>
    <h2 class="fredoka" style="color:#FFD700;font-size:clamp(.9rem,2.2vw,1.5rem);letter-spacing:3px;text-transform:uppercase;margin:4px 0 2px">Trường Mầm non Bắc Hà</h2>
    <h1 class="fredoka title-glow" style="color:#FFD700;font-size:clamp(1.9rem,5.5vw,4rem);line-height:1.1">RUNG CHUÔNG VÀNG</h1>
    <div class="pikachu-bounce" style="font-size:clamp(4rem,12vw,8rem);line-height:1;margin:6px 0">⚡</div>
    <h2 class="fredoka" style="color:#fff;font-size:clamp(1.1rem,3vw,2.2rem);margin-bottom:4px">🎮 PIKACHU EDITION 🎮</h2>
    <p style="color:rgba(255,255,255,.55);font-size:.9rem;margin-bottom:20px">Trắc nghiệm Tiếng Anh vui nhộn dành cho bé</p>
    <button class="btn-main" style="font-size:clamp(1.1rem,3vw,1.5rem);padding:14px 44px" onclick="showRules()">⚡ BẮT ĐẦU NGAY! ⚡</button>
  </div>
</div>

<!-- ===== RULES ===== -->
<div class="screen" id="screen-rules" style="overflow-y:auto">
  <div style="z-index:1;width:100%;max-width:660px;padding:8px 0">
    <h1 class="fredoka" style="color:#FFD700;font-size:1.9rem;text-align:center;margin-bottom:14px">📋 Luật Chơi</h1>
    <div class="rule-card" style="padding:12px 18px;margin-bottom:8px;animation-delay:.1s"><span style="font-size:1.7rem;flex-shrink:0">❓</span><div><p style="color:#FFD700;font-size:1rem;font-weight:800">30 Câu hỏi Tiếng Anh</p><p style="color:rgba(255,255,255,.65);font-size:.85rem">Màu sắc, con vật, đồ vật, cảm xúc...</p></div></div>
    <div class="rule-card" style="padding:12px 18px;margin-bottom:8px;animation-delay:.2s"><span style="font-size:1.7rem;flex-shrink:0">⏱️</span><div><p style="color:#FFD700;font-size:1rem;font-weight:800">5 giây mỗi câu</p><p style="color:rgba(255,255,255,.65);font-size:.85rem">Đồng hồ đếm ngược ở góc, không che đáp án</p></div></div>
    <div class="rule-card" style="padding:12px 18px;margin-bottom:8px;animation-delay:.3s"><span style="font-size:1.7rem;flex-shrink:0">🖐️</span><div><p style="color:#FFD700;font-size:1rem;font-weight:800">Chọn 1, 2 hoặc 3</p><p style="color:rgba(255,255,255,.65);font-size:.85rem">Giơ bảng đáp án sau khi hết 5 giây</p></div></div>
    <div class="rule-card" style="padding:12px 18px;margin-bottom:8px;animation-delay:.4s"><span style="font-size:1.7rem;flex-shrink:0">🔊</span><div><p style="color:#FFD700;font-size:1rem;font-weight:800">Đọc câu hỏi & đáp án tự động</p><p style="color:rgba(255,255,255,.65);font-size:.85rem">TTS tiếng Anh giúp bé nghe và nhận biết</p></div></div>
    <div class="rule-card" style="padding:12px 18px;margin-bottom:16px;animation-delay:.5s"><span style="font-size:1.7rem;flex-shrink:0">🏆</span><div><p style="color:#FFD700;font-size:1rem;font-weight:800">Chế độ Thi: câu 1→30 tự động</p><p style="color:rgba(255,255,255,.65);font-size:.85rem">Đọc câu, đếm ngược 5s, tính điểm cuối cùng</p></div></div>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn-nav" style="font-size:.95rem;padding:10px 20px" onclick="showIntro()">← Quay lại</button>
      <button class="btn-main" style="font-size:1.1rem;padding:11px 32px;letter-spacing:0" onclick="showGrid()">🎯 VÀO GAME!</button>
    </div>
  </div>
</div>

<!-- ===== QUESTION GRID ===== -->
<div class="screen" id="screen-grid">
  <div class="grid-wrap" style="z-index:1">
    <div class="grid-header">
      <h1 class="fredoka" style="color:#FFD700;font-size:clamp(1rem,2.2vw,1.5rem)">🔔 RUNG CHUÔNG VÀNG</h1>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        <span class="score-tracker" id="progress-text">0/30 câu</span>
        <button class="btn-nav" style="padding:6px 14px;font-size:.85rem" onclick="showIntro()">🏠 Trang chủ</button>
      </div>
    </div>
    <div class="grid-actions">
      <button class="btn-main" style="font-size:.95rem;padding:9px 22px;letter-spacing:0;animation:none" onclick="startCompetition()">🏆 Bắt đầu Thi (1→30)</button>
      <button class="btn-nav" style="font-size:.85rem;padding:7px 16px" onclick="resetProgress()">🔄 Reset</button>
    </div>
    <div class="grid-container" id="question-grid"></div>
  </div>
</div>

<!-- ===== QUESTION ===== -->
<div class="screen" id="screen-question">
  <div class="q-wrap" style="z-index:1">
    <!-- Top bar -->
    <div class="q-top-bar">
      <div class="q-badge" id="q-num-badge">Câu 1/30</div>
      <div class="mode-badge" id="mode-badge" style="background:rgba(255,100,0,.25);border:2px solid rgba(255,150,0,.5);color:#FFA500">📚 Luyện tập</div>
      <div class="score-tracker" id="q-score-live" style="display:none">✅ 0 đúng</div>
      <div style="flex:1;min-width:4px"></div>
      <span class="tts-badge" id="tts-status">🔊 Đọc bài...</span>
      <button class="btn-nav" style="padding:5px 12px;font-size:.82rem" onclick="goBack()">📋 Bảng câu</button>
    </div>

    <!-- Timer row -->
    <div class="timer-row">
      <div class="timer-bar-wrap"><div class="timer-bar" id="timer-bar"></div></div>
      <div class="timer-num" id="timer-display">5</div>
      <button class="btn-nav" id="btn-countdown" style="padding:6px 14px;font-size:.85rem" onclick="startCountdown()">▶ 5s</button>
    </div>

    <!-- Question card -->
    <div class="q-card">
      <div class="q-visual-wrap" id="q-visual-wrap">
        <!-- content injected by JS: either <img> or emoji span -->
      </div>
      <div class="q-text-main" id="q-text-main">Loading...</div>
      <div class="q-hint" id="q-hint"></div>
      <!-- Media buttons (Q26 lion, Q30 gummy) -->
      <div id="media-btn-wrap" style="text-align:center;margin-top:8px;display:none;gap:8px;justify-content:center;flex-wrap:wrap" class="flex">
        <button class="btn-media" style="font-size:.9rem;padding:7px 20px" id="play-media-btn" onclick="playSpecialMedia()">🎵 Nghe / Xem!</button>
      </div>
    </div>

    <!-- Choices -->
    <div class="choices-grid" id="choices-container"></div>

    <!-- Actions -->
    <div class="q-actions">
      <button class="btn-nav" style="padding:7px 16px;font-size:.85rem" onclick="speakQuestion()">🔊 Đọc lại</button>
      <button class="btn-main" style="font-size:1rem;padding:10px 28px;letter-spacing:0;animation:btnPulse 2s ease-in-out infinite" id="btn-action-next" onclick="handleNextBtn()">➡ NEXT</button>
    </div>
  </div>
</div>

<!-- COUNTDOWN corner overlay -->
<div id="countdown-overlay">
  <video id="countdown-video" src="/assets/countdown.mp4" playsinline muted></video>
</div>

<!-- ANSWER OVERLAY -->
<div id="answer-overlay" onclick="nextQuestion()">
  <div class="answer-card" onclick="nextQuestion()" style="cursor:pointer">
    <p class="answer-label">⚡ Đáp án đúng ⚡</p>
    <p class="answer-text" id="answer-text-display"></p>
    <span class="confetti-emoji" id="answer-emoji">🎊</span>
    <p style="color:rgba(255,255,255,.5);font-size:.8rem;margin-bottom:10px">Nhấn bất kỳ để tiếp tục</p>
    <button class="btn-main" style="font-size:1rem;padding:11px 32px;letter-spacing:0" id="btn-next" onclick="event.stopPropagation();nextQuestion()">➡ NEXT</button>
  </div>
</div>

<!-- LION POPUP OVERLAY -->
<div id="lion-overlay" onclick="closeLionPopup()">
  <div class="lion-popup" onclick="event.stopPropagation()">
    <div style="font-size:4rem;margin-bottom:10px;animation:pulse 1s ease-in-out infinite">🦁</div>
    <h2 class="fredoka" style="color:#FF8C00;font-size:1.6rem;margin-bottom:6px">TIẾNG SƯ TỬ!</h2>
    <p style="color:rgba(255,255,255,.75);font-size:.9rem;margin-bottom:16px">Nghe âm thanh — đây là con gì?</p>
    <button class="btn-media" style="font-size:1rem;padding:10px 28px;margin-bottom:14px" onclick="replayLionSound()">🔊 Nghe lại</button>
    <br>
    <button class="btn-nav" style="padding:8px 22px;font-size:.9rem;margin-top:4px;display:inline-flex" onclick="closeLionPopup()">✕ Đóng</button>
  </div>
</div>

<!-- MEDIA OVERLAY (Gummy Bear video) -->
<div id="media-overlay">
  <video id="media-video" controls playsinline style="max-width:min(640px,92vw);max-height:65vh;border-radius:16px;border:4px solid #FFD700"></video>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
    <button class="btn-nav" style="font-size:.95rem;padding:9px 24px" onclick="closeMedia()">✕ Đóng video</button>
    <button class="btn-main" style="font-size:.95rem;padding:9px 24px;letter-spacing:0;animation:none" onclick="revealAnswerFromMedia()">➡ NEXT</button>
  </div>
</div>

<!-- RESULT POPUP -->
<div id="result-popup">
  <div class="result-card">
    <div style="font-size:3rem;margin-bottom:10px;animation:pikaBounce .8s ease-in-out infinite alternate">🏆</div>
    <h1 class="fredoka title-glow" style="color:#FFD700;font-size:clamp(1.5rem,4vw,2.8rem);margin-bottom:12px">KẾT QUẢ!</h1>
    <div class="score-ring">
      <div class="score-big" id="popup-score-num">0/30</div>
      <div class="score-label">CÂU ĐÚNG</div>
    </div>
    <p id="popup-msg" style="color:#fff;font-size:1.1rem;margin-bottom:6px">🎉 Chúc mừng các bé! 🎉</p>
    <p id="popup-sub" style="color:rgba(255,255,255,.6);font-size:.9rem;margin-bottom:20px"></p>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn-nav" style="padding:9px 20px;font-size:.95rem" onclick="closeResultPopup();showGrid()">📋 Xem bảng câu</button>
      <button class="btn-main" style="font-size:1rem;padding:10px 28px;letter-spacing:0" onclick="closeResultPopup();resetGame()">🔄 Chơi lại!</button>
    </div>
  </div>
</div>

<!-- FLOATING PIKACHU -->
<div class="float-pika" onclick="pikachuClick()" title="Pikachu!">⚡</div>

<!-- AUDIO -->
<audio id="audio-intro" src="/assets/intro-music.mp3" loop preload="auto"></audio>
<audio id="audio-lion" src="/assets/lion-sound.mp3" preload="auto"></audio>

<script>
// ====================================================
// QUESTION DATA — 30 questions
// img: path under /assets/images/ (null = use emoji visual)
// ====================================================
const Q = [
  {img:"q1-yellow.png",question:"What color is it?",hint:"Màu gì đây?",choices:[{icon:"🔴",label:"Red"},{icon:"🔵",label:"Blue"},{icon:"🟡",label:"Yellow"}],correct:2,answer:"3. Yellow",speak:"What color is it? One: Red. Two: Blue. Three: Yellow."},
  {img:"q2-orange.png",question:"What fruit is it?",hint:"Đây là quả gì?",choices:[{icon:"🍎",label:"Apple"},{icon:"🍐",label:"Pear"},{icon:"🍊",label:"Orange"}],correct:2,answer:"3. Orange",speak:"What fruit is it? One: Apple. Two: Pear. Three: Orange."},
  {img:"q3-yoyo.png",question:"What toy is it?",hint:"Đây là đồ chơi gì?",choices:[{icon:"🧸",label:"Teddy"},{icon:"🪀",label:"Yo-yo"},{icon:"🤖",label:"Robot"}],correct:1,answer:"2. Yo-yo",speak:"What toy is it? One: Teddy. Two: Yo-yo. Three: Robot."},
  {img:"q4-elephant.png",question:"What animal is it?",hint:"Đây là con gì?",choices:[{icon:"🦁",label:"Lion"},{icon:"🐒",label:"Monkey"},{icon:"🐘",label:"Elephant"}],correct:2,answer:"3. Elephant",speak:"What animal is it? One: Lion. Two: Monkey. Three: Elephant."},
  {img:"q5-pizza.png",question:"What food is it?",hint:"Đây là món gì?",choices:[{icon:"🍕",label:"Pizza"},{icon:"🥪",label:"Sandwich"},{icon:"🍔",label:"Hamburger"}],correct:0,answer:"1. Pizza",speak:"What food is it? One: Pizza. Two: Sandwich. Three: Hamburger."},
  {img:"q6-apple.png",question:"What color is an apple?",hint:"Quả táo màu gì?",choices:[{icon:"⬛",label:"Black"},{icon:"🟡",label:"Yellow"},{icon:"🔴",label:"Red"}],correct:2,answer:"3. Red",speak:"What color is an apple? One: Black. Two: Yellow. Three: Red."},
  {img:"q7-slide.png",question:"What is it?",hint:"Đây là gì ở sân chơi?",choices:[{icon:"🪜",label:"Seesaw"},{icon:"🛝",label:"Slide"},{icon:"🎠",label:"Swing"}],correct:1,answer:"2. Slide",speak:"What is it? One: Seesaw. Two: Slide. Three: Swing."},
  {img:"q8-ten.png",question:"What number is it?",hint:"Đây là số mấy?",choices:[{icon:"🔟",label:"Ten"},{icon:"7️⃣",label:"Seven"},{icon:"9️⃣",label:"Nine"}],correct:0,answer:"1. Ten",speak:"What number is it? One: Ten. Two: Seven. Three: Nine."},
  {img:"q9-boots.png",question:"What are they?",hint:"Đây là gì?",choices:[{icon:"🩳",label:"Shorts"},{icon:"👢",label:"Boots"},{icon:"🧦",label:"Socks"}],correct:1,answer:"2. Boots",speak:"What are they? One: Shorts. Two: Boots. Three: Socks."},
  {img:"q10-happy.png",question:"How are you?",hint:"Bạn cảm thấy thế nào?",choices:[{icon:"😊",label:"Happy"},{icon:"😢",label:"Sad"},{icon:"😠",label:"Angry"}],correct:0,answer:"1. Happy",speak:"How are you? One: Happy. Two: Sad. Three: Angry."},
  {img:"q11-kitchen.png",question:"What room is it?",hint:"Đây là phòng gì?",choices:[{icon:"🚿",label:"Bathroom"},{icon:"🛋️",label:"Living room"},{icon:"🍳",label:"Kitchen"}],correct:2,answer:"3. Kitchen",speak:"What room is it? One: Bathroom. Two: Living room. Three: Kitchen."},
  {img:"q12-teeth.png",question:"What are they?",hint:"Đây là bộ phận nào?",choices:[{icon:"🦶",label:"Feet"},{icon:"🦷",label:"Teeth"},{icon:"👋",label:"Fingers"}],correct:1,answer:"2. Teeth",speak:"What are they? One: Feet. Two: Teeth. Three: Fingers."},
  {img:"q3-triangle.png",question:"What shape is it?",hint:"Đây là hình gì?",choices:[{icon:"🔺",label:"Triangle"},{icon:"⭕",label:"Circle"},{icon:"🟥",label:"Square"}],correct:0,answer:"1. Triangle",speak:"What shape is it? One: Triangle. Two: Circle. Three: Square."},
  {img:"q14-mummy.png",question:"Who is this?",hint:"Đây là ai?",choices:[{icon:"👧",label:"Sister"},{icon:"👩",label:"Mummy"},{icon:"👨",label:"Daddy"}],correct:1,answer:"2. Mummy",speak:"Who is this? One: Sister. Two: Mummy. Three: Daddy."},
  {img:"q15-bananas.png",question:"How many bananas?",hint:"Có bao nhiêu quả chuối?",choices:[{icon:"1️⃣",label:"One"},{icon:"2️⃣",label:"Two"},{icon:"3️⃣",label:"Three"}],correct:2,answer:"3. Three",speak:"How many bananas? One: One. Two: Two. Three: Three."},
  {img:"q16-doctor.png",question:"Who is she?",hint:"Cô ấy làm nghề gì?",choices:[{icon:"👩‍🏫",label:"Teacher"},{icon:"👩‍⚕️",label:"Doctor"},{icon:"👩‍🌾",label:"Farmer"}],correct:1,answer:"2. Doctor",speak:"Who is she? One: Teacher. Two: Doctor. Three: Farmer."},
  {img:"q17-vietnam.png",question:"Where are you from?",hint:"Bạn đến từ đâu?",choices:[{icon:"🇻🇳",label:"Vietnam"},{icon:"🇯🇵",label:"Japan"},{icon:"🇨🇳",label:"China"}],correct:0,answer:"1. Vietnam",speak:"Where are you from? One: Vietnam. Two: Japan. Three: China."},
  {img:"q18-birthday.png",question:"How old are you?",hint:"Bạn bao nhiêu tuổi?",choices:[{icon:"3️⃣",label:"Three"},{icon:"4️⃣",label:"Four"},{icon:"5️⃣",label:"Five"}],correct:2,answer:"3. Five",speak:"How old are you? One: Three. Two: Four. Three: Five."},
  {img:"q19-elephant4legs.png",question:"How many legs does the elephant have?",hint:"Voi có bao nhiêu chân?",choices:[{icon:"4️⃣",label:"Four"},{icon:"1️⃣",label:"One"},{icon:"2️⃣",label:"Two"}],correct:0,answer:"1. Four",speak:"How many legs does the elephant have? One: Four. Two: One. Three: Two."},
  {img:"q20-hungry.png",question:"How does she feel?",hint:"Cô ấy đang cảm thấy gì?",choices:[{icon:"🥤",label:"Thirsty"},{icon:"😴",label:"Sleepy"},{icon:"😋",label:"Hungry"}],correct:2,answer:"3. Hungry",speak:"How does she feel? One: Thirsty. Two: Sleepy. Three: Hungry."},
  {img:"q21-frog-bed.png",question:"Where is Alfie?",hint:"Alfie đang ở đâu?",choices:[{icon:"⬆️",label:"On"},{icon:"⬇️",label:"Under"},{icon:"➡️",label:"In"}],correct:1,answer:"2. Under",speak:"Where is Alfie? One: On. Two: Under. Three: In."},
  {img:"q22-juice.png",question:"Which drink is this?",hint:"Đây là đồ uống gì?",choices:[{icon:"🧃",label:"Juice"},{icon:"💧",label:"Water"},{icon:"🥛",label:"Milk"}],correct:0,answer:"1. Juice",speak:"Which drink is this? One: Juice. Two: Water. Three: Milk."},
  {img:"q23-family.png",question:"How many people in this family?",hint:"Gia đình có bao nhiêu người?",choices:[{icon:"3️⃣",label:"Three"},{icon:"4️⃣",label:"Four"},{icon:"5️⃣",label:"Five"}],correct:1,answer:"2. Four",speak:"How many people in this family? One: Three. Two: Four. Three: Five."},
  {img:"q10-happy.png",question:"How are you?",hint:"Bạn khỏe không?",choices:[{icon:"🔢",label:"I'm six"},{icon:"😁",label:"I'm good"},{icon:"😢",label:"I'm sad"}],correct:1,answer:"2. I'm good!",speak:"How are you? One: I'm six. Two: I'm good. Three: I'm sad."},
  {img:"q25-monkey.png",question:"What animal likes eating bananas?",hint:"Con gì thích ăn chuối?",choices:[{icon:"🐒",label:"Monkey"},{icon:"🐌",label:"Snail"},{icon:"🐍",label:"Snake"}],correct:0,answer:"1. Monkey",speak:"What animal likes eating bananas? One: Monkey. Two: Snail. Three: Snake."},
  {img:null,emoji:"🔊",question:"Listen to the sound. What animal is it?",hint:"Nghe âm thanh — đây là con gì?",choices:[{icon:"🦁",label:"Lion"},{icon:"🐄",label:"Cow"},{icon:"🐶",label:"Dog"}],correct:0,answer:"1. Lion",speak:"Listen to the sound. What animal is it? One: Lion. Two: Cow. Three: Dog.",media:"lion"},
  {img:"q27-sunny.png",question:"How's the weather?",hint:"Thời tiết hôm nay thế nào?",choices:[{icon:"🌧️",label:"Rainy"},{icon:"💨",label:"Windy"},{icon:"☀️",label:"Sunny"}],correct:2,answer:"3. Sunny",speak:"How's the weather? One: Rainy. Two: Windy. Three: Sunny."},
  {img:"q28-teacher.png",question:"Who is this?",hint:"Đây là ai?",choices:[{icon:"👩‍⚕️",label:"Doctor"},{icon:"👩‍🏫",label:"Teacher"},{icon:"👩‍🌾",label:"Farmer"}],correct:1,answer:"2. Teacher",speak:"Who is this? One: Doctor. Two: Teacher. Three: Farmer."},
  {img:null,emoji:"🏫",question:"Which school are you in?",hint:"Bạn học ở trường nào?",choices:[{icon:"🏫",label:"Nguyen Du"},{icon:"🏫",label:"Tri Duc"},{icon:"🏫",label:"Bac Ha"}],correct:2,answer:"3. Bac Ha Kindergarten",speak:"Which school are you in? One: Nguyen Du Kindergarten. Two: Tri Duc Kindergarten. Three: Bac Ha Kindergarten."},
  {img:null,emoji:"🎵",question:"Listen to the song! What song is it?",hint:"Nghe bài hát — đây là bài nào?",choices:[{icon:"🚶",label:"Walking Walking"},{icon:"💃",label:"Head Shoulders"},{icon:"🐻",label:"Gummy Bear"}],correct:2,answer:"3. Gummy Bear",speak:"Listen to the song! What song is it? One: Walking Walking. Two: Head Shoulders Knees and Toes. Three: Gummy Bear.",media:"gummy"}
];

// ====================================================
// STATE
// ====================================================
let currentIdx = 0;
let answered = {};
let timerInterval = null;
let timeLeft = 5;
let countdownRunning = false;
let gameMode = 'practice';
let compScore = 0;
let selectedChoice = -1;
let answerRevealed = false;
let introMusicEnabled = true;

// ====================================================
// STARS
// ====================================================
(function createStars(){
  const bg = document.getElementById('stars-bg');
  for(let i=0;i<60;i++){
    const s=document.createElement('div');
    s.className='star';
    const sz=Math.random()*5+2;
    s.style.cssText=\`width:\${sz}px;height:\${sz}px;left:\${Math.random()*100}%;top:\${Math.random()*100}%;background:\${Math.random()>.5?'#FFD700':'#fff'};animation-duration:\${Math.random()*3+2}s;animation-delay:\${Math.random()*3}s\`;
    bg.appendChild(s);
  }
})();

// ====================================================
// EFFECTS
// ====================================================
function flashLightning(){
  const el=document.getElementById('lightning');
  el.style.display='block';
  setTimeout(()=>el.style.display='none',150);
}
function spawnParticles(x,y,n=10){
  const cols=['#FFD700','#FFA500','#FF6B35','#00ff88','#00bfff','#ff69b4'];
  for(let i=0;i<n;i++){
    const p=document.createElement('div');p.className='particle';
    const sz=Math.random()*10+5,d=Math.random()*2+1.5,c=cols[Math.floor(Math.random()*cols.length)];
    p.style.cssText=\`width:\${sz}px;height:\${sz}px;background:\${c};left:\${x+(Math.random()-.5)*120}px;top:\${y}px;animation-duration:\${d}s\`;
    document.body.appendChild(p);setTimeout(()=>p.remove(),d*1000);
  }
}
function fireworks(n=14){
  const em=['🎊','🎉','⭐','✨','🌟','💛','🟡','⚡'];
  for(let i=0;i<n;i++){
    setTimeout(()=>{
      const el=document.createElement('div');el.className='firework';
      el.textContent=em[Math.floor(Math.random()*em.length)];
      el.style.cssText=\`left:\${Math.random()*100}vw;top:\${Math.random()*100}vh;--tx:\${(Math.random()-.5)*300}px;--ty:\${(Math.random()-.5)*300}px\`;
      document.body.appendChild(el);setTimeout(()=>el.remove(),2000);
    },i*80);
  }
}
function screenFlash(type){
  const bg=document.getElementById('stars-bg');
  bg.classList.add(type==='correct'?'screen-flash-green':'screen-flash-red');
  setTimeout(()=>bg.classList.remove('screen-flash-green','screen-flash-red'),550);
}

// ====================================================
// AUDIO
// ====================================================
function playIntroMusic(){
  if(!introMusicEnabled)return;
  const a=document.getElementById('audio-intro');
  a.volume=0.4;a.play().catch(()=>{});
}
function stopIntroMusic(){
  const a=document.getElementById('audio-intro');
  a.pause();a.currentTime=0;
}
function playLionSound(){
  const a=document.getElementById('audio-lion');
  a.volume=0.9;a.currentTime=0;a.play().catch(()=>{});
}
function stopLionSound(){
  const a=document.getElementById('audio-lion');
  a.pause();a.currentTime=0;
}
function replayLionSound(){
  playLionSound();
}
function playBeep(freq1,freq2,dur){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(freq1,ctx.currentTime);
    if(freq2)osc.frequency.setValueAtTime(freq2,ctx.currentTime+dur*.5);
    gain.gain.setValueAtTime(0.22,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
    osc.start();osc.stop(ctx.currentTime+dur);
  }catch(e){}
}
function playCountdownTick(){
  // Short tick sound for countdown
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type='sine';
    osc.connect(gain);gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(800,ctx.currentTime);
    gain.gain.setValueAtTime(0.18,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+.12);
    osc.start();osc.stop(ctx.currentTime+.12);
  }catch(e){}
}
function playCountdownEnd(){
  // End buzzer when time runs out
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type='sawtooth';
    osc.connect(gain);gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(440,ctx.currentTime);
    osc.frequency.setValueAtTime(300,ctx.currentTime+.2);
    osc.frequency.setValueAtTime(200,ctx.currentTime+.4);
    gain.gain.setValueAtTime(0.3,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+.6);
    osc.start();osc.stop(ctx.currentTime+.6);
  }catch(e){}
}
function playCorrect(){
  // Happy ascending fanfare
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const notes=[523,659,784,1047];
    notes.forEach((freq,i)=>{
      setTimeout(()=>{
        const osc=ctx.createOscillator(),gain=ctx.createGain();
        osc.type='sine';osc.connect(gain);gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(freq,ctx.currentTime);
        gain.gain.setValueAtTime(0.28,ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+.25);
        osc.start();osc.stop(ctx.currentTime+.25);
      },i*120);
    });
  }catch(e){}
}
function playWrong(){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type='sawtooth';osc.connect(gain);gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(220,ctx.currentTime);
    osc.frequency.setValueAtTime(140,ctx.currentTime+.28);
    gain.gain.setValueAtTime(0.25,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+.55);
    osc.start();osc.stop(ctx.currentTime+.55);
  }catch(e){}
}

// ====================================================
// TTS
// ====================================================
let ttsEnabled = !!window.speechSynthesis;
function speakText(text, onEnd){
  if(!ttsEnabled||!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const utt=new SpeechSynthesisUtterance(text);
  utt.lang='en-US';utt.rate=0.85;utt.pitch=1.1;utt.volume=1;
  const voices=window.speechSynthesis.getVoices();
  const en=voices.find(v=>v.lang.startsWith('en')&&v.name.toLowerCase().includes('female'))
          ||voices.find(v=>v.lang.startsWith('en-US'))
          ||voices.find(v=>v.lang.startsWith('en'));
  if(en)utt.voice=en;
  utt.onend=()=>{ setTTSStatus('✅ Đã đọc xong'); if(onEnd)onEnd(); };
  utt.onerror=()=>{ setTTSStatus('🔇 TTS lỗi'); };
  window.speechSynthesis.speak(utt);
  setTTSStatus('🔊 Đang đọc...');
}
function speakQuestion(){ if(currentQ())speakText(currentQ().speak); }
function stopTTS(){ if(window.speechSynthesis)window.speechSynthesis.cancel(); setTTSStatus('🔊 Sẵn sàng'); }
function setTTSStatus(txt){ const el=document.getElementById('tts-status'); if(el)el.textContent=txt; }
function currentQ(){ return Q[currentIdx]; }

// voices preload
if(window.speechSynthesis){
  window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();
  window.speechSynthesis.getVoices();
}

// ====================================================
// SCREENS
// ====================================================
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function showIntro(){
  clearTimer();stopTTS();closeAnswer();closeLionPopup();closeMedia();
  showScreen('screen-intro');
  introMusicEnabled=true;
  playIntroMusic();
}
function showRules(){
  stopIntroMusic();introMusicEnabled=false;stopTTS();
  showScreen('screen-rules');
}
function showGrid(){
  clearTimer();stopTTS();closeAnswer();
  buildGrid();
  showScreen('screen-grid');
  updateProgress();
}
function goBack(){
  clearTimer();stopTTS();closeLionPopup();closeMedia();
  showGrid();
}

// ====================================================
// GRID
// ====================================================
function buildGrid(){
  const grid=document.getElementById('question-grid');
  grid.innerHTML='';
  Q.forEach((q,i)=>{
    const done=answered.hasOwnProperty(i);
    const correct=answered[i]===true;
    const cell=document.createElement('div');
    cell.className='q-cell'+(done?(correct?' done':' done wrong-done'):'');
    cell.id='qcell-'+i;
    cell.innerHTML=\`<span class="q-num">\${i+1}</span><span class="q-check">\${correct?'✓':'✗'}</span>\`;
    cell.title='Câu '+(i+1)+': '+q.question;
    cell.onclick=()=>{ gameMode='practice'; openQuestion(i); };
    grid.appendChild(cell);
  });
}
function updateProgress(){
  const done=Object.keys(answered).length;
  const correct=Object.values(answered).filter(v=>v===true).length;
  document.getElementById('progress-text').textContent=done+'/30 | ✅'+correct;
}

// ====================================================
// COMPETITION MODE
// ====================================================
function startCompetition(){
  answered={};compScore=0;
  gameMode='competition';
  currentIdx=0;
  buildGrid();updateProgress();
  openQuestion(0);
}
function resetProgress(){
  answered={};compScore=0;gameMode='practice';
  buildGrid();updateProgress();
}

// ====================================================
// OPEN QUESTION
// ====================================================
function openQuestion(idx){
  currentIdx=idx;
  selectedChoice=-1;
  answerRevealed=false;
  clearTimer();stopTTS();closeAnswer();
  const q=Q[idx];

  // badges
  document.getElementById('q-num-badge').textContent='Câu '+(idx+1)+'/30';
  if(gameMode==='competition'){
    document.getElementById('mode-badge').textContent='🏆 Thi đấu';
    document.getElementById('mode-badge').style.cssText='background:rgba(0,200,80,.25);border:2px solid rgba(0,255,130,.5);color:#00ff88';
    document.getElementById('q-score-live').style.display='';
    document.getElementById('q-score-live').textContent='✅ '+compScore+' đúng';
  } else {
    document.getElementById('mode-badge').textContent='📚 Luyện tập';
    document.getElementById('mode-badge').style.cssText='background:rgba(255,100,0,.25);border:2px solid rgba(255,150,0,.5);color:#FFA500';
    document.getElementById('q-score-live').style.display='none';
  }

  // Visual: image or emoji
  const vWrap=document.getElementById('q-visual-wrap');
  if(q.img){
    vWrap.innerHTML=\`<img class="q-visual-img" src="/assets/images/\${q.img}" alt="question image" onerror="this.style.display='none';this.nextSibling.style.display='block'" loading="eager"><span class="q-visual-emoji" style="display:none">\${q.emoji||'❓'}</span>\`;
  } else {
    vWrap.innerHTML=\`<span class="q-visual-emoji">\${q.emoji||'❓'}</span>\`;
  }

  // text
  document.getElementById('q-text-main').textContent=q.question;
  document.getElementById('q-hint').textContent='('+q.hint+')';

  // media buttons
  const mw=document.getElementById('media-btn-wrap');
  const mb=document.getElementById('play-media-btn');
  if(q.media==='lion'){ mw.style.display='flex';mb.innerHTML='🦁 Nghe tiếng sư tử!'; }
  else if(q.media==='gummy'){ mw.style.display='flex';mb.innerHTML='🐻 Xem Gummy Bear!'; }
  else { mw.style.display='none'; }

  // choices
  const cont=document.getElementById('choices-container');
  cont.innerHTML='';
  q.choices.forEach((ch,i)=>{
    const btn=document.createElement('div');
    btn.className='choice-btn';
    btn.id='choice-'+i;
    btn.innerHTML=\`
      <div class="choice-num-circle">\${i+1}</div>
      <div class="choice-icon">\${ch.icon}</div>
      <div class="choice-label">\${ch.label}</div>
    \`;
    btn.onclick=()=>selectChoice(i);
    cont.appendChild(btn);
  });

  // timer reset
  timeLeft=5;countdownRunning=false;
  updateTimerBar();
  document.getElementById('btn-countdown').textContent='▶ 5s';
  setTTSStatus('🔊 Đang đọc...');
  // reset bottom NEXT button label
  const actionBtn=document.getElementById('btn-action-next');
  if(actionBtn) actionBtn.textContent='➡ NEXT';

  showScreen('screen-question');

  // Competition mode: auto TTS then auto-start countdown
  if(gameMode==='competition'){
    setTimeout(()=>{
      speakText(q.speak, ()=>{
        // after TTS done, auto start countdown
        setTimeout(()=>startCountdown(), 400);
      });
    }, 300);
  } else {
    // Practice: just TTS
    setTimeout(()=>speakText(q.speak), 300);
  }
}

// ====================================================
// TIMER
// ====================================================
let lastTickSecond = 6;
function startCountdown(){
  if(countdownRunning)return;
  countdownRunning=true;
  clearTimer();
  timeLeft=5;
  lastTickSecond=5;
  updateTimerBar();
  document.getElementById('btn-countdown').textContent='⏳';

  // Countdown video
  const ov=document.getElementById('countdown-overlay');
  const vid=document.getElementById('countdown-video');
  ov.classList.add('active');
  vid.currentTime=0;vid.play().catch(()=>{});

  timerInterval=setInterval(()=>{
    timeLeft-=0.1;
    const secNow=Math.ceil(timeLeft);
    if(secNow<lastTickSecond && secNow>=0){
      lastTickSecond=secNow;
      playCountdownTick();
      // pulse animation on timer number
      const td=document.getElementById('timer-display');
      td.classList.remove('ticking');
      void td.offsetWidth; // reflow
      td.classList.add('ticking');
    }
    if(timeLeft<=0){
      timeLeft=0;clearTimer();countdownRunning=false;
      updateTimerBar();
      document.getElementById('btn-countdown').textContent='✅';
      ov.classList.remove('active');vid.pause();
      playCountdownEnd();
      // In competition mode, auto-reveal after small delay
      if(gameMode==='competition'&&!answerRevealed){
        setTimeout(()=>revealAnswer(),500);
      }
    }
    updateTimerBar();
  },100);

  setTimeout(()=>{ ov.classList.remove('active');vid.pause(); },6000);
}
function clearTimer(){
  if(timerInterval){clearInterval(timerInterval);timerInterval=null;}
  document.getElementById('countdown-overlay').classList.remove('active');
  const vid=document.getElementById('countdown-video');
  if(vid)vid.pause();
}
function updateTimerBar(){
  const pct=Math.max(0,(timeLeft/5)*100);
  const bar=document.getElementById('timer-bar');
  bar.style.width=pct+'%';
  if(pct>60) bar.style.background='linear-gradient(90deg,#00c851,#69ff47)';
  else if(pct>25) bar.style.background='linear-gradient(90deg,#FFD700,#FFA500)';
  else bar.style.background='linear-gradient(90deg,#ff4444,#cc0000)';
  document.getElementById('timer-display').textContent=Math.max(0,Math.ceil(timeLeft));
}

// ====================================================
// CHOICE SELECT
// ====================================================
function selectChoice(i){
  if(answerRevealed)return;
  selectedChoice=i;
  document.querySelectorAll('.choice-btn').forEach((b,j)=>{
    b.classList.remove('selected');
    if(j===i)b.classList.add('selected');
  });
  flashLightning();
  
  // In competition mode, selecting auto-reveals after 0.4s
  if(gameMode==='competition'){
    clearTimer();
    setTimeout(()=>revealAnswer(),400);
  }
}

// ====================================================
// REVEAL ANSWER
// ====================================================
function revealAnswer(){
  if(answerRevealed)return;
  answerRevealed=true;
  const q=currentQ();
  clearTimer();stopTTS();
  
  const btns=document.querySelectorAll('.choice-btn');
  btns.forEach((b,i)=>{
    b.classList.remove('selected');
    b.classList.add('locked');
    if(i===q.correct) b.classList.add('correct');
    else if(i===selectedChoice) b.classList.add('wrong');
    else b.classList.add('wrong');
  });

  const isCorrect=(selectedChoice===q.correct);
  answered[currentIdx]=isCorrect;
  if(gameMode==='competition'&&isCorrect) compScore++;
  updateProgress();

  // update cell
  const cell=document.getElementById('qcell-'+currentIdx);
  if(cell){
    cell.classList.add('done');
    if(!isCorrect)cell.classList.add('wrong-done');
    cell.querySelector('.q-check').textContent=isCorrect?'✓':'✗';
    cell.style.display='';
  }

  // score live
  if(gameMode==='competition'){
    document.getElementById('q-score-live').textContent='✅ '+compScore+' đúng';
  }

  // sound & effects
  if(isCorrect){
    playCorrect();
    screenFlash('correct');
    spawnParticles(window.innerWidth/2,window.innerHeight*.4,16);
    fireworks(10);
  } else {
    playWrong();
    screenFlash('wrong');
  }

  // show answer overlay
  document.getElementById('answer-text-display').textContent=q.answer;
  document.getElementById('answer-emoji').textContent=isCorrect?'🎊':'😅';
  const isLast=currentIdx>=Q.length-1;
  const nextLabel=isLast&&gameMode==='competition'?'🏁 KẾT THÚC':'➡ NEXT';
  document.getElementById('btn-next').textContent=nextLabel;
  // Also update bottom action button
  const actionBtn=document.getElementById('btn-action-next');
  if(actionBtn) actionBtn.textContent=nextLabel;
  document.getElementById('answer-overlay').classList.add('active');

  // speak answer
  setTimeout(()=>speakText('The answer is: '+q.answer),300);
}

function closeAnswer(){
  document.getElementById('answer-overlay').classList.remove('active');
}

// handleNextBtn: called by the bottom NEXT button
// - If answer not yet revealed => reveal it
// - If already revealed => go to next question
function handleNextBtn(){
  if(!answerRevealed){
    revealAnswer();
  } else {
    nextQuestion();
  }
}

function nextQuestion(){
  // Guard: prevent double-call if overlay already hidden
  const overlay=document.getElementById('answer-overlay');
  if(!overlay.classList.contains('active') && answerRevealed){
    // overlay already closed, just navigate
  }
  closeAnswer();stopTTS();
  if(gameMode==='competition'){
    const next=currentIdx+1;
    if(next>=Q.length){ showResultPopup(); return; }
    openQuestion(next);
  } else {
    let next=currentIdx+1;
    if(next>=Q.length){ showGrid(); return; }
    openQuestion(next);
  }
}

// ====================================================
// SPECIAL MEDIA
// ====================================================
function playSpecialMedia(){
  const q=currentQ();
  if(q.media==='lion'){
    // Show lion popup
    openLionPopup();
  } else if(q.media==='gummy'){
    const ov=document.getElementById('media-overlay');
    const vid=document.getElementById('media-video');
    vid.src='/assets/gummy-bear.mp4';
    ov.classList.add('active');
    vid.play().catch(()=>{});
  }
}
function openLionPopup(){
  document.getElementById('lion-overlay').classList.add('active');
  playLionSound();
}
function closeLionPopup(){
  document.getElementById('lion-overlay').classList.remove('active');
  stopLionSound(); // Stop lion audio when popup closes
}
function closeMedia(){
  const ov=document.getElementById('media-overlay');
  document.getElementById('media-video').pause();
  ov.classList.remove('active');
}
function revealAnswerFromMedia(){
  closeMedia();
  revealAnswer();
}

// ====================================================
// RESULT POPUP
// ====================================================
function showResultPopup(){
  clearTimer();stopTTS();closeAnswer();
  const total=Q.length;
  const correct=Object.values(answered).filter(v=>v===true).length;
  document.getElementById('popup-score-num').textContent=correct+'/'+total;
  const pct=Math.round((correct/total)*100);
  let msg='🎉 Chúc mừng các bé! 🎉',sub='';
  if(pct>=80){msg='🌟 Xuất sắc! Giỏi lắm! 🌟';sub='Bé đã trả lời đúng '+correct+' câu — Tuyệt vời!';}
  else if(pct>=50){msg='👏 Tốt lắm! Cố gắng thêm nhé!';sub='Bé đã trả lời đúng '+correct+' câu!';}
  else{msg='💪 Cố gắng lên nhé bé ơi!';sub='Luyện tập thêm để tiến bộ hơn!';}
  document.getElementById('popup-msg').textContent=msg;
  document.getElementById('popup-sub').textContent=sub;
  document.getElementById('result-popup').classList.add('active');
  fireworks(20);
  setTimeout(()=>fireworks(15),800);
  speakText('Game over! You answered '+correct+' out of '+total+' questions correctly. '+(pct>=80?'Excellent work!':pct>=50?'Good job!':'Keep practicing!'));
}
function closeResultPopup(){
  document.getElementById('result-popup').classList.remove('active');
}
function resetGame(){
  answered={};compScore=0;gameMode='practice';
  clearTimer();stopTTS();
  buildGrid();
  showGrid();
}

// ====================================================
// PIKACHU EASTER EGG
// ====================================================
function pikachuClick(){
  flashLightning();
  spawnParticles(window.innerWidth-50,window.innerHeight-60,12);
  playBeep(640,880,.4);
  const el=document.querySelector('.float-pika');
  el.style.transform='scale(2.2) rotate(20deg)';
  setTimeout(()=>el.style.transform='',500);
}

// ====================================================
// INIT
// ====================================================
// Auto play intro music
setTimeout(()=>playIntroMusic(), 300);

// countdown overlay click to dismiss
document.getElementById('countdown-overlay').addEventListener('click',function(){
  this.classList.remove('active');
  document.getElementById('countdown-video').pause();
});

// Keyboard shortcuts
document.addEventListener('keydown',e=>{
  const onQ=document.getElementById('screen-question').classList.contains('active');
  if(e.key==='Escape'){
    closeAnswer();closeMedia();closeLionPopup();closeResultPopup();
    document.getElementById('countdown-overlay').classList.remove('active');
  }
  if(e.key===' '&&onQ){e.preventDefault();startCountdown();}
  if(e.key==='Enter'&&onQ){e.preventDefault();revealAnswer();}
  if((e.key==='r'||e.key==='R')&&onQ){speakQuestion();}
  if(e.key==='Backspace'&&onQ){goBack();}
  if(e.key==='1'&&onQ)selectChoice(0);
  if(e.key==='2'&&onQ)selectChoice(1);
  if(e.key==='3'&&onQ)selectChoice(2);
});
</script>
</body>
</html>`)
})

export default app
