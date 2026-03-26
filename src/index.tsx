import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()
app.use('/assets/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🔔 Rung Chuông Vàng - Pikachu</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script src="https://cdn.tailwindcss.com"></script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow:hidden;height:100vh;width:100vw;font-family:'Nunito',sans-serif;background:#1a0a2e}
.fredoka{font-family:'Fredoka One',cursive}

/* STARS */
.stars-bg{position:fixed;inset:0;background:linear-gradient(135deg,#1a0a2e 0%,#2d1b69 50%,#1a0a2e 100%);z-index:0;overflow:hidden}
.star{position:absolute;border-radius:50%;animation:twinkle linear infinite}
@keyframes twinkle{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}

/* SCREENS */
.screen{position:fixed;inset:0;z-index:10;display:none;flex-direction:column;align-items:center;justify-content:center;padding:16px}
.screen.active{display:flex}

/* ANIMATIONS */
@keyframes pikaBounce{from{transform:translateY(0) scale(1)}to{transform:translateY(-18px) scale(1.05)}}
@keyframes titlePulse{0%,100%{text-shadow:0 0 20px #FFD700,0 0 40px #FFA500}50%{text-shadow:0 0 40px #FFD700,0 0 80px #FFA500,0 0 100px #FF6B35}}
@keyframes bellRing{0%,100%{transform:rotate(-15deg)}50%{transform:rotate(15deg)}}
@keyframes btnPulse{0%,100%{box-shadow:0 8px 30px rgba(255,215,0,.6),0 0 0 0 rgba(255,215,0,.4)}50%{box-shadow:0 8px 30px rgba(255,215,0,.8),0 0 0 18px rgba(255,215,0,0)}}
@keyframes slideIn{to{opacity:1;transform:translateX(0)}}
@keyframes answerPop{from{transform:scale(.3) rotate(-10deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes correctPulse{0%{transform:scale(1)}50%{transform:scale(1.12)}100%{transform:scale(1.05)}}
@keyframes confettiSpin{from{transform:rotate(-10deg) scale(1)}to{transform:rotate(10deg) scale(1.2)}}
@keyframes floatPika{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-15px) rotate(5deg)}}
@keyframes fireworkFly{0%{transform:translate(0,0) scale(0);opacity:1}100%{transform:translate(var(--tx),var(--ty)) scale(1);opacity:0}}
@keyframes particleFloat{0%{transform:translateY(100vh) rotate(0deg);opacity:1}100%{transform:translateY(-100px) rotate(720deg);opacity:0}}
@keyframes lightning{0%{opacity:1}100%{opacity:0}}
@keyframes scoreIn{from{transform:scale(0) rotate(-180deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}

.pikachu-bounce{animation:pikaBounce .8s ease-in-out infinite alternate;filter:drop-shadow(0 0 30px #FFD700)}
.title-glow{animation:titlePulse 2s ease-in-out infinite}
.bell-ring{animation:bellRing 1s ease-in-out infinite;display:inline-block;transform-origin:top center}

/* BUTTONS */
.btn-main{background:linear-gradient(135deg,#FFD700,#FFA500);border:3px solid #fff;border-radius:50px;font-family:'Fredoka One',cursive;color:#1a0a2e;cursor:pointer;animation:btnPulse 2s ease-in-out infinite;transition:transform .2s;text-transform:uppercase;letter-spacing:1px}
.btn-main:hover{transform:scale(1.07)}
.btn-nav{background:linear-gradient(135deg,rgba(255,215,0,.18),rgba(255,165,0,.12));border:2px solid rgba(255,215,0,.5);border-radius:50px;color:#FFD700;font-family:'Fredoka One',cursive;cursor:pointer;transition:all .25s;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.btn-nav:hover{background:linear-gradient(135deg,rgba(255,215,0,.32),rgba(255,165,0,.22));transform:translateY(-2px);box-shadow:0 4px 16px rgba(255,215,0,.3)}

/* RULE CARDS */
.rule-card{background:linear-gradient(135deg,rgba(255,215,0,.13),rgba(255,165,0,.08));border:2px solid rgba(255,215,0,.35);border-radius:16px;display:flex;align-items:center;gap:16px;animation:slideIn .5s ease forwards;opacity:0;transform:translateX(-50px)}

/* GRID */
#screen-grid{background:transparent;justify-content:flex-start;padding-top:10px}
.grid-wrap{width:100%;max-width:960px;display:flex;flex-direction:column;height:100vh;overflow:hidden}
.grid-header{flex-shrink:0;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:8px 0 8px}
.grid-actions{flex-shrink:0;display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap}
.grid-container{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;flex:1;align-content:start}
.q-cell{background:linear-gradient(135deg,#FFD700,#FFA500);border:2.5px solid #fff;border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s;font-family:'Fredoka One',cursive;color:#1a0a2e;position:relative;overflow:hidden;padding:8px 4px;min-height:52px}
.q-cell:hover:not(.done){transform:scale(1.1) rotate(1deg);box-shadow:0 6px 24px rgba(255,215,0,.8);z-index:2}
.q-cell.done{background:linear-gradient(135deg,#2e7d32,#1b5e20);border-color:rgba(0,255,136,.5);cursor:pointer;opacity:.85}
.q-cell .q-num{font-size:1.1rem;font-weight:900;line-height:1}
.q-cell .q-check{position:absolute;top:2px;right:4px;font-size:.75rem;color:#00ff88;display:none}
.q-cell.done .q-check{display:block}

/* QUESTION SCREEN */
#screen-question{background:transparent;justify-content:flex-start;padding-top:8px}
.q-wrap{width:100%;max-width:900px;display:flex;flex-direction:column;height:100vh;overflow:hidden;gap:6px}
.q-top-bar{flex-shrink:0;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.q-badge{background:linear-gradient(135deg,#FFD700,#FFA500);color:#1a0a2e;border-radius:50px;font-family:'Fredoka One',cursive;padding:6px 18px;font-size:1.1rem;white-space:nowrap}
.mode-badge{border-radius:50px;font-family:'Fredoka One',cursive;padding:5px 14px;font-size:.85rem;white-space:nowrap}

/* TIMER ROW — always visible, never covers choices */
.timer-row{flex-shrink:0;display:flex;align-items:center;gap:10px}
.timer-bar-wrap{flex:1;height:14px;background:rgba(255,255,255,.12);border-radius:10px;overflow:hidden;border:1.5px solid rgba(255,215,0,.25)}
.timer-bar{height:100%;border-radius:10px;transition:width .12s linear;width:100%}
.timer-num{font-family:'Fredoka One',cursive;font-size:2rem;color:#FFD700;min-width:32px;text-align:center;line-height:1}

/* QUESTION CARD */
.q-card{background:linear-gradient(135deg,rgba(26,10,46,.97),rgba(45,27,105,.97));border:2.5px solid #FFD700;border-radius:22px;padding:14px 18px;flex-shrink:0;box-shadow:0 0 40px rgba(255,215,0,.25)}
.q-visual{font-size:clamp(4rem,10vw,7rem);text-align:center;line-height:1;margin:4px 0;filter:drop-shadow(0 4px 12px rgba(255,215,0,.4))}
.q-text-main{font-size:clamp(1.1rem,2.5vw,1.6rem);color:#fff;font-weight:800;text-align:center;line-height:1.3}
.q-hint{font-size:.85rem;color:rgba(255,215,0,.7);text-align:center;margin-top:3px}

/* CHOICES */
.choices-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;flex-shrink:0}
.choice-btn{background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.04));border:2.5px solid rgba(255,215,0,.35);border-radius:16px;padding:10px 8px;cursor:pointer;transition:all .25s;text-align:center;color:#fff;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:4px}
.choice-btn:hover:not(.locked){background:linear-gradient(135deg,rgba(255,215,0,.18),rgba(255,165,0,.12));border-color:#FFD700;transform:translateY(-3px);box-shadow:0 5px 18px rgba(255,215,0,.3)}
.choice-num-circle{width:34px;height:34px;background:linear-gradient(135deg,#FFD700,#FFA500);color:#1a0a2e;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Fredoka One',cursive;font-size:1.2rem;flex-shrink:0}
.choice-icon{font-size:clamp(1.8rem,4vw,2.8rem);line-height:1}
.choice-label{font-size:clamp(.85rem,1.8vw,1.1rem);font-weight:800;line-height:1.2}
.choice-btn.correct{background:linear-gradient(135deg,#00c851,#007E33)!important;border-color:#00ff88!important;transform:scale(1.04);box-shadow:0 0 28px rgba(0,200,81,.6);animation:correctPulse .5s ease}
.choice-btn.wrong{background:linear-gradient(135deg,#ff4444,#cc0000)!important;border-color:#ff6666!important;opacity:.65}
.choice-btn.selected{background:linear-gradient(135deg,rgba(255,215,0,.28),rgba(255,165,0,.18))!important;border-color:#FFD700!important;transform:translateY(-3px) scale(1.02);box-shadow:0 6px 22px rgba(255,215,0,.45)}
.choice-btn.locked{cursor:default}

/* BOTTOM ACTION ROW */
.q-actions{flex-shrink:0;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;padding-bottom:6px}

/* COUNTDOWN OVERLAY — small corner, does NOT cover choices */
#countdown-overlay{position:fixed;bottom:80px;right:16px;z-index:200;display:none;flex-direction:column;align-items:center;gap:6px}
#countdown-overlay.active{display:flex}
#countdown-video{width:clamp(120px,20vw,200px);border-radius:14px;border:3px solid #FFD700;box-shadow:0 0 30px rgba(255,215,0,.6)}

/* ANSWER OVERLAY */
#answer-overlay{position:fixed;inset:0;z-index:300;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.65);backdrop-filter:blur(4px)}
#answer-overlay.active{display:flex}
.answer-card{background:linear-gradient(135deg,#1a0a2e,#2d1b69);border:4px solid #FFD700;border-radius:28px;padding:32px 48px;text-align:center;box-shadow:0 0 80px rgba(255,215,0,.5);animation:answerPop .4s cubic-bezier(.175,.885,.32,1.275);max-width:500px;width:90%}
.answer-label{font-family:'Fredoka One',cursive;font-size:1.2rem;color:rgba(255,215,0,.75);letter-spacing:3px;text-transform:uppercase;margin-bottom:8px}
.answer-text{font-family:'Fredoka One',cursive;font-size:clamp(1.5rem,4vw,2.4rem);color:#FFD700;text-shadow:0 0 20px rgba(255,215,0,.8);margin-bottom:12px;line-height:1.3}
.confetti-emoji{font-size:2.5rem;animation:confettiSpin .5s ease-in-out infinite alternate;display:block;margin-bottom:16px}

/* MEDIA OVERLAY */
#media-overlay{position:fixed;inset:0;z-index:250;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.88);flex-direction:column;gap:16px}
#media-overlay.active{display:flex}
#media-video{max-width:min(640px,90vw);max-height:70vh;border-radius:18px;border:4px solid #FFD700}

/* FLOATING PIKACHU */
.float-pika{position:fixed;bottom:16px;right:16px;font-size:2.8rem;z-index:50;animation:floatPika 3s ease-in-out infinite;cursor:pointer;filter:drop-shadow(0 5px 12px rgba(255,215,0,.5))}

/* LIGHTNING */
.lightning{position:fixed;inset:0;z-index:400;pointer-events:none;background:rgba(255,215,0,.14);display:none;animation:lightning .15s ease}

/* COMPLETE SCREEN */
#screen-complete{background:transparent;text-align:center}
.score-ring{width:160px;height:160px;border-radius:50%;background:linear-gradient(135deg,#FFD700,#FFA500);display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 0 50px rgba(255,215,0,.6);animation:scoreIn .8s cubic-bezier(.175,.885,.32,1.275)}
.score-big{font-family:'Fredoka One',cursive;font-size:3rem;color:#1a0a2e;line-height:1}
.score-label{font-family:'Fredoka One',cursive;font-size:.95rem;color:#1a0a2e;opacity:.7}

/* FIREWORK */
.firework{position:fixed;pointer-events:none;font-size:1.8rem;animation:fireworkFly 2s ease-out forwards}
.particle{position:fixed;pointer-events:none;border-radius:50%;z-index:5;animation:particleFloat linear forwards}

/* MEDIA BUTTON */
.btn-media{background:linear-gradient(135deg,rgba(255,100,0,.3),rgba(255,50,0,.2));border:2.5px solid rgba(255,150,0,.6);border-radius:50px;color:#FFD700;font-family:'Fredoka One',cursive;cursor:pointer;transition:all .25s;display:inline-flex;align-items:center;gap:8px;animation:pulse 2s ease-in-out infinite}
.btn-media:hover{background:linear-gradient(135deg,rgba(255,100,0,.5),rgba(255,50,0,.4));transform:scale(1.05)}

/* TTS status */
.tts-badge{background:rgba(255,215,0,.15);border:1.5px solid rgba(255,215,0,.3);border-radius:20px;color:rgba(255,215,0,.8);font-size:.75rem;padding:3px 10px;display:inline-flex;align-items:center;gap:4px}

/* SCORE TRACKER */
.score-tracker{background:rgba(255,215,0,.12);border:1.5px solid rgba(255,215,0,.3);border-radius:20px;padding:4px 12px;color:#FFD700;font-family:'Fredoka One',cursive;font-size:.95rem;white-space:nowrap}

@media(max-width:640px){
  .choices-grid{grid-template-columns:1fr}
  .grid-container{grid-template-columns:repeat(5,1fr)}
  .answer-card{padding:24px 28px}
}
</style>
</head>
<body>
<div class="stars-bg" id="stars-bg"></div>
<div class="lightning" id="lightning"></div>

<!-- ===== INTRO ===== -->
<div class="screen active" id="screen-intro">
  <div style="text-align:center;z-index:1">
    <div><span class="bell-ring" style="font-size:3.5rem">🔔</span></div>
    <h2 class="fredoka" style="color:#FFD700;font-size:clamp(1rem,2.5vw,1.7rem);letter-spacing:3px;text-transform:uppercase;margin:6px 0 2px">Trường Mầm non Bắc Hà</h2>
    <h1 class="fredoka title-glow" style="color:#FFD700;font-size:clamp(2.2rem,6vw,4.5rem);line-height:1.1">RUNG CHUÔNG VÀNG</h1>
    <div class="pikachu-bounce" style="font-size:clamp(5rem,14vw,10rem);line-height:1;margin:8px 0">⚡</div>
    <h2 class="fredoka" style="color:#fff;font-size:clamp(1.3rem,3.5vw,2.5rem);margin-bottom:6px">🎮 PIKACHU EDITION 🎮</h2>
    <p style="color:rgba(255,255,255,.55);font-size:.95rem;margin-bottom:24px">Trắc nghiệm Tiếng Anh vui nhộn dành cho bé</p>
    <button class="btn-main" style="font-size:1.6rem;padding:16px 50px" onclick="showRules()">⚡ BẮT ĐẦU NGAY! ⚡</button>
  </div>
</div>

<!-- ===== RULES ===== -->
<div class="screen" id="screen-rules">
  <div style="z-index:1;width:100%;max-width:680px">
    <h1 class="fredoka" style="color:#FFD700;font-size:2.2rem;text-align:center;margin-bottom:18px">📋 Luật Chơi</h1>
    <div class="rule-card" style="padding:14px 22px;margin-bottom:10px;animation-delay:.1s"><span style="font-size:2rem">❓</span><div><p style="color:#FFD700;font-size:1.1rem;font-weight:800">30 Câu hỏi Tiếng Anh</p><p style="color:rgba(255,255,255,.65);font-size:.9rem">Các chủ đề: màu sắc, con vật, đồ vật, cảm xúc...</p></div></div>
    <div class="rule-card" style="padding:14px 22px;margin-bottom:10px;animation-delay:.2s"><span style="font-size:2rem">⏱️</span><div><p style="color:#FFD700;font-size:1.1rem;font-weight:800">5 giây mỗi câu</p><p style="color:rgba(255,255,255,.65);font-size:.9rem">Đồng hồ đếm ngược hiện góc màn hình, không che đáp án</p></div></div>
    <div class="rule-card" style="padding:14px 22px;margin-bottom:10px;animation-delay:.3s"><span style="font-size:2rem">🖐️</span><div><p style="color:#FFD700;font-size:1.1rem;font-weight:800">Chọn 1, 2 hoặc 3</p><p style="color:rgba(255,255,255,.65);font-size:.9rem">Giơ bảng đáp án sau khi hết 5 giây</p></div></div>
    <div class="rule-card" style="padding:14px 22px;margin-bottom:10px;animation-delay:.4s"><span style="font-size:2rem">🔊</span><div><p style="color:#FFD700;font-size:1.1rem;font-weight:800">Đọc câu hỏi & đáp án tự động</p><p style="color:rgba(255,255,255,.65);font-size:.9rem">Text-to-Speech tiếng Anh giúp bé nghe và nhận biết</p></div></div>
    <div class="rule-card" style="padding:14px 22px;margin-bottom:18px;animation-delay:.5s"><span style="font-size:2rem">🏆</span><div><p style="color:#FFD700;font-size:1.1rem;font-weight:800">Ai còn lại cuối cùng thắng!</p><p style="color:rgba(255,255,255,.65);font-size:.9rem">Chế độ Thi: 30 câu theo thứ tự + tính điểm tổng kết</p></div></div>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <button class="btn-nav" style="font-size:1rem;padding:10px 22px" onclick="showIntro()">← Quay lại</button>
      <button class="btn-main" style="font-size:1.2rem;padding:12px 36px" onclick="showGrid()">🎯 VÀO GAME!</button>
    </div>
  </div>
</div>

<!-- ===== QUESTION GRID ===== -->
<div class="screen" id="screen-grid">
  <div class="grid-wrap" style="z-index:1">
    <div class="grid-header">
      <h1 class="fredoka" style="color:#FFD700;font-size:clamp(1.1rem,2.5vw,1.7rem)">🔔 RUNG CHUÔNG VÀNG</h1>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <span class="score-tracker" id="progress-text">0/30 câu</span>
        <span class="score-tracker" id="score-display" style="display:none">Điểm: 0</span>
        <button class="btn-nav" style="padding:7px 16px;font-size:.9rem" onclick="showIntro()">🏠 Trang chủ</button>
      </div>
    </div>
    <div class="grid-actions">
      <button class="btn-main" style="font-size:1rem;padding:10px 28px;letter-spacing:0" onclick="startCompetition()">🏆 Bắt đầu Thi (Câu 1→30)</button>
      <button class="btn-nav" style="font-size:.9rem;padding:8px 18px" onclick="resetProgress()">🔄 Reset tiến độ</button>
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
      <div style="flex:1"></div>
      <div class="tts-badge" id="tts-status">🔊 Đọc bài...</div>
      <button class="btn-nav" style="padding:6px 14px;font-size:.85rem" onclick="goBack()">📋 Bảng câu</button>
    </div>

    <!-- Timer row (ALWAYS visible, separate from choices) -->
    <div class="timer-row">
      <div class="timer-bar-wrap"><div class="timer-bar" id="timer-bar"></div></div>
      <div class="timer-num" id="timer-display">5</div>
      <button class="btn-nav" id="btn-countdown" style="padding:7px 16px;font-size:.9rem" onclick="startCountdown()">▶ 5s</button>
    </div>

    <!-- Question card: visual + text -->
    <div class="q-card">
      <div class="q-visual" id="q-visual">❓</div>
      <div class="q-text-main" id="q-text-main">Loading...</div>
      <div class="q-hint" id="q-hint"></div>
      <!-- Special media (Q26 lion, Q30 gummy) -->
      <div id="media-btn-wrap" style="text-align:center;margin-top:8px;display:none">
        <button class="btn-media" style="font-size:.95rem;padding:8px 22px" id="play-media-btn" onclick="playSpecialMedia()">🎵 Nghe / Xem!</button>
      </div>
    </div>

    <!-- Choices -->
    <div class="choices-grid" id="choices-container"></div>

    <!-- Actions -->
    <div class="q-actions">
      <button class="btn-nav" style="padding:8px 18px;font-size:.9rem" onclick="speakQuestion()">🔊 Đọc lại</button>
      <button class="btn-main" style="font-size:1rem;padding:10px 28px;letter-spacing:0" onclick="revealAnswer()">✨ Xem đáp án</button>
    </div>
  </div>
</div>

<!-- ===== COMPLETE ===== -->
<div class="screen" id="screen-complete">
  <div style="z-index:1;text-align:center;max-width:500px;width:90%">
    <div style="font-size:3.5rem;margin-bottom:12px;animation:pikaBounce .8s ease-in-out infinite alternate">🏆</div>
    <h1 class="fredoka title-glow" style="color:#FFD700;font-size:clamp(1.8rem,5vw,3.5rem);margin-bottom:8px">HOÀN THÀNH!</h1>
    <div class="score-ring" id="final-score-ring">
      <div class="score-big" id="final-score-num">0/30</div>
      <div class="score-label">CÂU ĐÚNG</div>
    </div>
    <p id="final-msg" style="color:#fff;font-size:1.2rem;margin-bottom:8px">🎉 Chúc mừng các bé! 🎉</p>
    <p id="final-sub" style="color:rgba(255,255,255,.6);font-size:.9rem;margin-bottom:24px"></p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <button class="btn-nav" style="padding:10px 22px;font-size:1rem" onclick="showGrid()">📋 Xem bảng câu</button>
      <button class="btn-main" style="font-size:1.1rem;padding:12px 32px;letter-spacing:0" onclick="resetGame()">🔄 Chơi lại!</button>
    </div>
  </div>
</div>

<!-- COUNTDOWN (corner, non-blocking) -->
<div id="countdown-overlay">
  <video id="countdown-video" src="/assets/countdown.mp4" playsinline muted></video>
</div>

<!-- ANSWER OVERLAY -->
<div id="answer-overlay" onclick="closeAnswer()">
  <div class="answer-card" onclick="event.stopPropagation()">
    <p class="answer-label">⚡ Đáp án đúng ⚡</p>
    <p class="answer-text" id="answer-text-display"></p>
    <span class="confetti-emoji">🎊</span>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <button class="btn-nav" style="padding:8px 18px;font-size:.95rem" onclick="closeAnswer()">✕ Đóng</button>
      <button class="btn-main" style="font-size:.95rem;padding:10px 26px;letter-spacing:0" id="btn-next" onclick="nextQuestion()">➡ Câu tiếp</button>
    </div>
  </div>
</div>

<!-- MEDIA OVERLAY -->
<div id="media-overlay">
  <video id="media-video" controls playsinline style="max-width:min(640px,90vw);max-height:70vh;border-radius:18px;border:4px solid #FFD700"></video>
  <button class="btn-main" style="font-size:1rem;padding:10px 30px;letter-spacing:0" onclick="closeMedia()">✕ Đóng video</button>
</div>

<!-- FLOATING PIKACHU -->
<div class="float-pika" onclick="pikachuClick()" title="Pikachu!">⚡</div>

<!-- AUDIO -->
<audio id="audio-intro" src="/assets/intro-music.mp3" loop></audio>
<audio id="audio-lion" src="/assets/lion-sound.mp3" preload="auto"></audio>

<script>
// ====================================================
// GAME DATA — 30 questions, each has:
//   visual: big emoji shown prominently
//   question: English text read by TTS
//   hint: Vietnamese hint
//   choices: [{icon, label}]  — icon shown big, label = text
//   correct: 0-indexed
//   answer: display string
//   speak: full TTS script
// ====================================================
const Q = [
  {visual:"🟡",question:"What color is it?",hint:"Màu gì đây?",choices:[{icon:"🔴",label:"Red"},{icon:"🔵",label:"Blue"},{icon:"🟡",label:"Yellow"}],correct:2,answer:"3. Yellow 🟡",speak:"What color is it? One: Red. Two: Blue. Three: Yellow."},
  {visual:"🍊",question:"What fruit is it?",hint:"Đây là quả gì?",choices:[{icon:"🍎",label:"Apple"},{icon:"🍐",label:"Pear"},{icon:"🍊",label:"Orange"}],correct:2,answer:"3. Orange 🍊",speak:"What fruit is it? One: Apple. Two: Pear. Three: Orange."},
  {visual:"🪀",question:"What toy is it?",hint:"Đây là đồ chơi gì?",choices:[{icon:"🧸",label:"Teddy"},{icon:"🪀",label:"Yo-yo"},{icon:"🤖",label:"Robot"}],correct:1,answer:"2. Yo-yo 🪀",speak:"What toy is it? One: Teddy. Two: Yo-yo. Three: Robot."},
  {visual:"🐘",question:"What animal is it?",hint:"Đây là con gì?",choices:[{icon:"🦁",label:"Lion"},{icon:"🐒",label:"Monkey"},{icon:"🐘",label:"Elephant"}],correct:2,answer:"3. Elephant 🐘",speak:"What animal is it? One: Lion. Two: Monkey. Three: Elephant."},
  {visual:"🍕",question:"What food is it?",hint:"Đây là món gì?",choices:[{icon:"🍕",label:"Pizza"},{icon:"🥪",label:"Sandwich"},{icon:"🍔",label:"Hamburger"}],correct:0,answer:"1. Pizza 🍕",speak:"What food is it? One: Pizza. Two: Sandwich. Three: Hamburger."},
  {visual:"🍎",question:"What color is an apple?",hint:"Quả táo màu gì?",choices:[{icon:"⬛",label:"Black"},{icon:"🟡",label:"Yellow"},{icon:"🔴",label:"Red"}],correct:2,answer:"3. Red 🔴",speak:"What color is an apple? One: Black. Two: Yellow. Three: Red."},
  {visual:"🛝",question:"What is it?",hint:"Đây là gì ở sân chơi?",choices:[{icon:"🪜",label:"Seesaw"},{icon:"🛝",label:"Slide"},{icon:"🎠",label:"Swing"}],correct:1,answer:"2. Slide 🛝",speak:"What is it? One: Seesaw. Two: Slide. Three: Swing."},
  {visual:"🔟",question:"What number is it?",hint:"Đây là số mấy?",choices:[{icon:"🔟",label:"Ten"},{icon:"7️⃣",label:"Seven"},{icon:"9️⃣",label:"Nine"}],correct:0,answer:"1. Ten 🔟",speak:"What number is it? One: Ten. Two: Seven. Three: Nine."},
  {visual:"👢",question:"What are they?",hint:"Đây là gì?",choices:[{icon:"🩳",label:"Shorts"},{icon:"👢",label:"Boots"},{icon:"🧦",label:"Socks"}],correct:1,answer:"2. Boots 👢",speak:"What are they? One: Shorts. Two: Boots. Three: Socks."},
  {visual:"😊",question:"How are you?",hint:"Bạn cảm thấy thế nào?",choices:[{icon:"😊",label:"Happy"},{icon:"😢",label:"Sad"},{icon:"😠",label:"Angry"}],correct:0,answer:"1. Happy 😊",speak:"How are you? One: Happy. Two: Sad. Three: Angry."},
  {visual:"🍳",question:"What room is it?",hint:"Đây là phòng gì?",choices:[{icon:"🚿",label:"Bathroom"},{icon:"🛋️",label:"Living room"},{icon:"🍳",label:"Kitchen"}],correct:2,answer:"3. Kitchen 🍳",speak:"What room is it? One: Bathroom. Two: Living room. Three: Kitchen."},
  {visual:"🦷",question:"What are they?",hint:"Đây là bộ phận nào?",choices:[{icon:"🦶",label:"Feet"},{icon:"🦷",label:"Teeth"},{icon:"👋",label:"Fingers"}],correct:1,answer:"2. Teeth 🦷",speak:"What are they? One: Feet. Two: Teeth. Three: Fingers."},
  {visual:"🔺",question:"What shape is it?",hint:"Đây là hình gì?",choices:[{icon:"🔺",label:"Triangle"},{icon:"⭕",label:"Circle"},{icon:"🟥",label:"Square"}],correct:0,answer:"1. Triangle 🔺",speak:"What shape is it? One: Triangle. Two: Circle. Three: Square."},
  {visual:"👩",question:"Who is this?",hint:"Đây là ai?",choices:[{icon:"👧",label:"Sister"},{icon:"👩",label:"Mummy"},{icon:"👨",label:"Daddy"}],correct:1,answer:"2. Mummy 👩",speak:"Who is this? One: Sister. Two: Mummy. Three: Daddy."},
  {visual:"🍌🍌🍌",question:"How many bananas?",hint:"Có bao nhiêu quả chuối?",choices:[{icon:"1️⃣",label:"One"},{icon:"2️⃣",label:"Two"},{icon:"3️⃣",label:"Three"}],correct:2,answer:"3. Three 🍌",speak:"How many bananas? One: One. Two: Two. Three: Three."},
  {visual:"👩‍⚕️",question:"Who is she?",hint:"Cô ấy làm nghề gì?",choices:[{icon:"👩‍🏫",label:"Teacher"},{icon:"👩‍⚕️",label:"Doctor"},{icon:"👩‍🌾",label:"Farmer"}],correct:1,answer:"2. Doctor 👩‍⚕️",speak:"Who is she? One: Teacher. Two: Doctor. Three: Farmer."},
  {visual:"🇻🇳",question:"Where are you from?",hint:"Bạn đến từ đâu?",choices:[{icon:"🇻🇳",label:"Vietnam"},{icon:"🇯🇵",label:"Japan"},{icon:"🇨🇳",label:"China"}],correct:0,answer:"1. Vietnam 🇻🇳",speak:"Where are you from? One: Vietnam. Two: Japan. Three: China."},
  {visual:"🎂",question:"How old are you?",hint:"Bạn bao nhiêu tuổi?",choices:[{icon:"3️⃣",label:"Three"},{icon:"4️⃣",label:"Four"},{icon:"5️⃣",label:"Five"}],correct:2,answer:"3. Five 🎂",speak:"How old are you? One: Three. Two: Four. Three: Five."},
  {visual:"🐘",question:"How many legs does the elephant have?",hint:"Voi có bao nhiêu chân?",choices:[{icon:"4️⃣",label:"Four"},{icon:"1️⃣",label:"One"},{icon:"2️⃣",label:"Two"}],correct:0,answer:"1. Four 🦵🦵🦵🦵",speak:"How many legs does the elephant have? One: Four. Two: One. Three: Two."},
  {visual:"😋",question:"How does she feel?",hint:"Cô ấy đang cảm thấy gì?",choices:[{icon:"🥤",label:"Thirsty"},{icon:"😴",label:"Sleepy"},{icon:"😋",label:"Hungry"}],correct:2,answer:"3. Hungry 😋",speak:"How does she feel? One: Thirsty. Two: Sleepy. Three: Hungry."},
  {visual:"🐱",question:"Where is Alfie?",hint:"Alfie đang ở đâu?",choices:[{icon:"⬆️",label:"On"},{icon:"⬇️",label:"Under"},{icon:"➡️",label:"In"}],correct:1,answer:"2. Under ⬇️",speak:"Where is Alfie? One: On. Two: Under. Three: In."},
  {visual:"🧃",question:"Which drink is this?",hint:"Đây là đồ uống gì?",choices:[{icon:"🧃",label:"Juice"},{icon:"💧",label:"Water"},{icon:"🥛",label:"Milk"}],correct:0,answer:"1. Juice 🧃",speak:"Which drink is this? One: Juice. Two: Water. Three: Milk."},
  {visual:"👨‍👩‍👧‍👦",question:"How many people in this family?",hint:"Gia đình có bao nhiêu người?",choices:[{icon:"3️⃣",label:"Three"},{icon:"4️⃣",label:"Four"},{icon:"5️⃣",label:"Five"}],correct:1,answer:"2. Four 👨‍👩‍👧‍👦",speak:"How many people in this family? One: Three. Two: Four. Three: Five."},
  {visual:"😁",question:"How are you?",hint:"Bạn khỏe không?",choices:[{icon:"🔢",label:"I'm six"},{icon:"😁",label:"I'm good"},{icon:"😢",label:"I'm sad"}],correct:1,answer:"2. I'm good! 😁",speak:"How are you? One: I'm six. Two: I'm good. Three: I'm sad."},
  {visual:"🐒",question:"What animal likes eating bananas?",hint:"Con gì thích ăn chuối?",choices:[{icon:"🐒",label:"Monkey"},{icon:"🐌",label:"Snail"},{icon:"🐍",label:"Snake"}],correct:0,answer:"1. Monkey 🐒",speak:"What animal likes eating bananas? One: Monkey. Two: Snail. Three: Snake."},
  {visual:"🔊",question:"Listen to the sound. What animal is it?",hint:"Nghe âm thanh — đây là con gì?",choices:[{icon:"🦁",label:"Lion"},{icon:"🐄",label:"Cow"},{icon:"🐶",label:"Dog"}],correct:0,answer:"1. Lion 🦁",speak:"Listen to the sound. What animal is it? One: Lion. Two: Cow. Three: Dog.",media:"lion"},
  {visual:"☀️",question:"How's the weather?",hint:"Thời tiết hôm nay thế nào?",choices:[{icon:"🌧️",label:"Rainy"},{icon:"💨",label:"Windy"},{icon:"☀️",label:"Sunny"}],correct:2,answer:"3. Sunny ☀️",speak:"How's the weather? One: Rainy. Two: Windy. Three: Sunny."},
  {visual:"👩‍🏫",question:"Who is this?",hint:"Đây là ai?",choices:[{icon:"👩‍⚕️",label:"Doctor"},{icon:"👩‍🏫",label:"Teacher"},{icon:"👩‍🌾",label:"Farmer"}],correct:1,answer:"2. Teacher 👩‍🏫",speak:"Who is this? One: Doctor. Two: Teacher. Three: Farmer."},
  {visual:"🏫",question:"Which school are you in?",hint:"Bạn học ở trường nào?",choices:[{icon:"🏫",label:"Nguyen Du"},{icon:"🏫",label:"Tri Duc"},{icon:"🏫",label:"Bac Ha"}],correct:2,answer:"3. Bac Ha Kindergarten 🏫",speak:"Which school are you in? One: Nguyen Du Kindergarten. Two: Tri Duc Kindergarten. Three: Bac Ha Kindergarten."},
  {visual:"🎵",question:"Listen to the song! What song is it?",hint:"Nghe bài hát — đây là bài nào?",choices:[{icon:"🚶",label:"Walking Walking"},{icon:"💃",label:"Head Shoulders Knees and Toes"},{icon:"🐻",label:"Gummy Bear"}],correct:2,answer:"3. Gummy Bear 🐻",speak:"Listen to the song! What song is it? One: Walking Walking. Two: Head Shoulders Knees and Toes. Three: Gummy Bear.",media:"gummy"}
];

// ====================================================
// STATE
// ====================================================
let currentIdx = 0;
let answered = {};      // { idx: true/false (correct?) }
let timerInterval = null;
let timeLeft = 5;
let countdownRunning = false;
let gameMode = 'practice'; // 'practice' | 'competition'
let compScore = 0;
let ttsUtterance = null;

// ====================================================
// STARS
// ====================================================
(function createStars(){
  const bg = document.getElementById('stars-bg');
  for(let i=0;i<60;i++){
    const s=document.createElement('div');
    s.className='star';
    const sz=Math.random()*6+2;
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
function spawnParticles(x,y,n=12){
  const cols=['#FFD700','#FFA500','#FF6B35','#00ff88','#00bfff','#ff69b4'];
  for(let i=0;i<n;i++){
    const p=document.createElement('div');p.className='particle';
    const sz=Math.random()*12+6,d=Math.random()*2+1.5,c=cols[Math.floor(Math.random()*cols.length)];
    p.style.cssText=\`width:\${sz}px;height:\${sz}px;background:\${c};left:\${x+(Math.random()-.5)*120}px;top:\${y}px;animation-duration:\${d}s\`;
    document.body.appendChild(p);setTimeout(()=>p.remove(),d*1000);
  }
}
function fireworks(n=16){
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

// ====================================================
// AUDIO / TTS
// ====================================================
function playIntroMusic(){
  const a=document.getElementById('audio-intro');
  a.volume=0.45;a.play().catch(()=>{});
}
function stopIntroMusic(){
  const a=document.getElementById('audio-intro');
  a.pause();a.currentTime=0;
}
function playLionSound(){
  const a=document.getElementById('audio-lion');
  a.volume=0.85;a.currentTime=0;a.play().catch(()=>{});
}
function playBeep(freq1,freq2,dur){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(freq1,ctx.currentTime);
    if(freq2)osc.frequency.setValueAtTime(freq2,ctx.currentTime+dur/2);
    gain.gain.setValueAtTime(0.25,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
    osc.start();osc.stop(ctx.currentTime+dur);
  }catch(e){}
}
function playCorrect(){ playBeep(523,784,.6); }
function playWrong(){ 
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type='sawtooth';osc.connect(gain);gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(220,ctx.currentTime);
    osc.frequency.setValueAtTime(150,ctx.currentTime+.25);
    gain.gain.setValueAtTime(0.25,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+.5);
    osc.start();osc.stop(ctx.currentTime+.5);
  }catch(e){}
}

// TTS
function speakText(text, onEnd){
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const utt=new SpeechSynthesisUtterance(text);
  utt.lang='en-US';utt.rate=0.88;utt.pitch=1.1;utt.volume=1;
  if(onEnd)utt.onend=onEnd;
  ttsUtterance=utt;
  // pick english voice if available
  const voices=window.speechSynthesis.getVoices();
  const en=voices.find(v=>v.lang.startsWith('en')&&v.name.toLowerCase().includes('female'))
          ||voices.find(v=>v.lang.startsWith('en-US'))
          ||voices.find(v=>v.lang.startsWith('en'));
  if(en)utt.voice=en;
  window.speechSynthesis.speak(utt);
  document.getElementById('tts-status').textContent='🔊 Đang đọc...';
  utt.onend=()=>{ document.getElementById('tts-status').textContent='✅ Đã đọc xong'; if(onEnd)onEnd(); };
  utt.onerror=()=>{ document.getElementById('tts-status').textContent='🔇 TTS không khả dụng'; };
}
function speakQuestion(){
  if(!currentQ())return;
  speakText(currentQ().speak);
}
function stopTTS(){
  if(window.speechSynthesis)window.speechSynthesis.cancel();
  document.getElementById('tts-status').textContent='🔊 Sẵn sàng';
}

function currentQ(){ return Q[currentIdx]; }

// ====================================================
// SCREENS
// ====================================================
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function showIntro(){
  clearTimer();stopTTS();closeAnswer();
  showScreen('screen-intro');
  playIntroMusic();
}
function showRules(){
  stopIntroMusic();stopTTS();
  showScreen('screen-rules');
}
function showGrid(){
  clearTimer();stopTTS();closeAnswer();
  buildGrid();
  showScreen('screen-grid');
  updateProgress();
}
function goBack(){
  clearTimer();stopTTS();
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
    cell.className='q-cell'+(done?' done':'');
    cell.id='qcell-'+i;
    cell.innerHTML=\`<span class="q-num">\${i+1}</span><span class="q-check">\${correct?'✓':'✗'}</span>\`;
    cell.title='Câu '+(i+1)+': '+q.question;
    cell.onclick=()=>{ gameMode='practice'; openQuestion(i); };
    grid.appendChild(cell);
  });
  // score display
  const scoreEl=document.getElementById('score-display');
  if(gameMode==='competition'){
    scoreEl.style.display='';
    scoreEl.textContent='Điểm: '+compScore;
  } else {
    scoreEl.style.display='none';
  }
}
function updateProgress(){
  const done=Object.keys(answered).length;
  document.getElementById('progress-text').textContent=done+'/30 câu';
}

// ====================================================
// COMPETITION MODE
// ====================================================
function startCompetition(){
  // reset answered for competition
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
  clearTimer();stopTTS();
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

  // visual & text
  document.getElementById('q-visual').textContent=q.visual;
  document.getElementById('q-text-main').textContent=q.question;
  document.getElementById('q-hint').textContent='('+q.hint+')';

  // media button
  const mw=document.getElementById('media-btn-wrap');
  const mb=document.getElementById('play-media-btn');
  if(q.media==='lion'){ mw.style.display='';mb.innerHTML='🦁 Nghe tiếng sư tử!'; }
  else if(q.media==='gummy'){ mw.style.display='';mb.innerHTML='🐻 Xem Gummy Bear!'; }
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
  document.getElementById('tts-status').textContent='🔊 Đang đọc...';

  showScreen('screen-question');

  // auto TTS after slight delay
  setTimeout(()=>{ speakText(q.speak); }, 350);
}

// ====================================================
// TIMER
// ====================================================
function startCountdown(){
  if(countdownRunning)return;
  countdownRunning=true;
  clearTimer();
  timeLeft=5;
  updateTimerBar();
  document.getElementById('btn-countdown').textContent='⏳';

  // Play countdown video in corner
  const ov=document.getElementById('countdown-overlay');
  const vid=document.getElementById('countdown-video');
  ov.classList.add('active');
  vid.currentTime=0;
  vid.play().catch(()=>{});

  timerInterval=setInterval(()=>{
    timeLeft-=0.1;
    if(timeLeft<=0){
      timeLeft=0;clearTimer();countdownRunning=false;
      updateTimerBar();
      document.getElementById('btn-countdown').textContent='✅';
      // close video
      ov.classList.remove('active');vid.pause();
    }
    updateTimerBar();
  },100);

  // safety: close video after 5.8s
  setTimeout(()=>{ ov.classList.remove('active');vid.pause(); },5800);
}
function clearTimer(){
  if(timerInterval){clearInterval(timerInterval);timerInterval=null;}
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
let selectedChoice=-1;
function selectChoice(i){
  selectedChoice=i;
  document.querySelectorAll('.choice-btn').forEach((b,j)=>{
    b.classList.remove('selected');
    b.style.cssText='';
    if(j===i) b.classList.add('selected');
  });
  flashLightning();
}

// ====================================================
// REVEAL ANSWER
// ====================================================
function revealAnswer(){
  const q=currentQ();
  clearTimer();stopTTS();
  const btns=document.querySelectorAll('.choice-btn');
  btns.forEach((b,i)=>{
    b.classList.remove('selected');
    b.classList.add('locked');
    b.style.cssText='';
    if(i===q.correct) b.classList.add('correct');
    else b.classList.add('wrong');
  });

  const isCorrect=(selectedChoice===q.correct);
  // track
  answered[currentIdx]=isCorrect;
  if(gameMode==='competition'&&isCorrect) compScore++;
  updateProgress();

  // update cell in grid
  const cell=document.getElementById('qcell-'+currentIdx);
  if(cell){
    cell.classList.add('done');
    cell.querySelector('.q-check').textContent=isCorrect?'✓':'✗';
  }

  // score live
  if(gameMode==='competition'){
    document.getElementById('q-score-live').textContent='✅ '+compScore+' đúng';
  }

  // overlay
  document.getElementById('answer-text-display').textContent=q.answer;
  document.getElementById('answer-overlay').classList.add('active');

  // Next btn label
  const isLast=(currentIdx>=Q.length-1)||(gameMode==='competition'&&currentIdx>=Q.length-1);
  document.getElementById('btn-next').textContent=isLast&&gameMode==='competition'?'🏁 Kết thúc':'➡ Câu tiếp';

  if(isCorrect){ playCorrect();spawnParticles(window.innerWidth/2,window.innerHeight/2,18);fireworks(12); }
  else { playWrong(); }

  // speak answer
  setTimeout(()=>speakText('The answer is: '+q.answer.replace(/[0-9.🟡🔴🔵🍊🍕🦁🐒🐘🪀🧸🤖👢🧦🩳🔟😊😢😠🍳🚿🛋️🦷🦶👋🔺⭕🟥👩👧👨🍌🍎🛝🎠🪜👩‍⚕️👩‍🏫👩‍🌾🇻🇳🇯🇵🇨🇳🎂🦵🥤😴😋⬆️⬇️➡️🧃💧🥛👨‍👩‍👧‍👦😁🐒🐌🐍🔊🌧️💨☀️🏫🚶💃🐻]/g,'').trim()),300);
}

function closeAnswer(){
  document.getElementById('answer-overlay').classList.remove('active');
}

function nextQuestion(){
  closeAnswer();stopTTS();
  if(gameMode==='competition'){
    const next=currentIdx+1;
    if(next>=Q.length){ showComplete(); return; }
    openQuestion(next);
  } else {
    // practice: find next unanswered or just next
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
    playLionSound();flashLightning();
    spawnParticles(window.innerWidth/2,window.innerHeight*.6,10);
  } else if(q.media==='gummy'){
    const ov=document.getElementById('media-overlay');
    const vid=document.getElementById('media-video');
    vid.src='/assets/gummy-bear.mp4';
    ov.classList.add('active');
    vid.play().catch(()=>{});
  }
}
function closeMedia(){
  const ov=document.getElementById('media-overlay');
  document.getElementById('media-video').pause();
  ov.classList.remove('active');
}

// ====================================================
// COMPLETE
// ====================================================
function showComplete(){
  clearTimer();stopTTS();closeAnswer();
  const total=Q.length;
  const correct=Object.values(answered).filter(v=>v===true).length;
  document.getElementById('final-score-num').textContent=correct+'/'+total;
  const pct=Math.round((correct/total)*100);
  let msg='🎉 Chúc mừng các bé! 🎉',sub='';
  if(pct>=80){msg='🌟 Xuất sắc! Giỏi lắm! 🌟';sub='Bé đã trả lời đúng '+correct+' câu — Tuyệt vời!';}
  else if(pct>=50){msg='👏 Tốt lắm! Cố gắng thêm nhé!';sub='Bé đã trả lời đúng '+correct+' câu!';}
  else{msg='💪 Cố gắng lên nhé bé ơi!';sub='Luyện tập thêm để tiến bộ hơn!';}
  document.getElementById('final-msg').textContent=msg;
  document.getElementById('final-sub').textContent=sub;
  showScreen('screen-complete');
  fireworks(20);setTimeout(()=>fireworks(15),800);
  speakText('Game over! You answered '+correct+' out of '+total+' questions correctly. '+
    (pct>=80?'Excellent work!':pct>=50?'Good job!':'Keep practicing!'));
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
  spawnParticles(window.innerWidth-70,window.innerHeight-70,15);
  playBeep(640,880,.4);
  const el=document.querySelector('.float-pika');
  el.style.transform='scale(2.2) rotate(20deg)';
  setTimeout(()=>el.style.transform='',500);
}

// ====================================================
// INIT
// ====================================================
playIntroMusic();

// load TTS voices
if(window.speechSynthesis){
  window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();
  window.speechSynthesis.getVoices();
}

// countdown overlay click to dismiss
document.getElementById('countdown-overlay').addEventListener('click',function(){
  this.classList.remove('active');
  document.getElementById('countdown-video').pause();
});

// keyboard
document.addEventListener('keydown',e=>{
  const onQ=document.getElementById('screen-question').classList.contains('active');
  if(e.key==='Escape'){closeAnswer();closeMedia();document.getElementById('countdown-overlay').classList.remove('active');}
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
