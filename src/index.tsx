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
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    font-family: 'Nunito', sans-serif;
    background: #1a0a2e;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }

  .fredoka { font-family: 'Fredoka One', cursive; }

  /* ========== STARS BACKGROUND ========== */
  .stars-bg {
    position: fixed; inset: 0;
    background: linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #1a0a2e 100%);
    overflow: hidden;
    z-index: 0;
  }
  .star {
    position: absolute;
    border-radius: 50%;
    animation: twinkle linear infinite;
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  /* ========== SCREENS ========== */
  .screen {
    position: fixed; inset: 0; z-index: 10;
    display: none; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 20px;
  }
  .screen.active { display: flex; }

  /* ========== INTRO SCREEN ========== */
  #screen-intro {
    background: transparent;
  }
  .pikachu-bounce {
    animation: pikaBounce 0.8s ease-in-out infinite alternate;
    filter: drop-shadow(0 0 30px #FFD700);
  }
  @keyframes pikaBounce {
    from { transform: translateY(0) scale(1); }
    to { transform: translateY(-20px) scale(1.05); }
  }
  .title-glow {
    text-shadow: 0 0 20px #FFD700, 0 0 40px #FFA500, 0 0 60px #FF6B35;
    animation: titlePulse 2s ease-in-out infinite;
  }
  @keyframes titlePulse {
    0%, 100% { text-shadow: 0 0 20px #FFD700, 0 0 40px #FFA500; }
    50% { text-shadow: 0 0 40px #FFD700, 0 0 80px #FFA500, 0 0 100px #FF6B35; }
  }
  .bell-ring {
    animation: bellRing 1s ease-in-out infinite;
    display: inline-block;
    transform-origin: top center;
  }
  @keyframes bellRing {
    0%, 100% { transform: rotate(-15deg); }
    50% { transform: rotate(15deg); }
  }
  .btn-start {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    border: 4px solid #fff;
    border-radius: 50px;
    padding: 18px 60px;
    font-size: 1.8rem;
    font-family: 'Fredoka One', cursive;
    color: #1a0a2e;
    cursor: pointer;
    box-shadow: 0 8px 30px rgba(255,215,0,0.6), 0 0 0 0 rgba(255,215,0,0.4);
    animation: btnPulse 2s ease-in-out infinite;
    transition: transform 0.2s;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .btn-start:hover { transform: scale(1.08); }
  @keyframes btnPulse {
    0%, 100% { box-shadow: 0 8px 30px rgba(255,215,0,0.6), 0 0 0 0 rgba(255,215,0,0.4); }
    50% { box-shadow: 0 8px 30px rgba(255,215,0,0.8), 0 0 0 20px rgba(255,215,0,0); }
  }

  /* ========== RULES SCREEN ========== */
  #screen-rules {
    background: rgba(10, 5, 30, 0.95);
  }
  .rule-card {
    background: linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.1));
    border: 2px solid rgba(255,215,0,0.4);
    border-radius: 20px;
    padding: 20px 30px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 20px;
    animation: slideIn 0.5s ease forwards;
    opacity: 0;
    transform: translateX(-50px);
  }
  @keyframes slideIn {
    to { opacity: 1; transform: translateX(0); }
  }

  /* ========== QUESTION GRID SCREEN ========== */
  #screen-grid {
    background: transparent;
    padding: 10px;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    width: 100%;
    max-width: 900px;
  }
  .q-cell {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    border: 3px solid #fff;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    aspect-ratio: 1.2;
    font-family: 'Fredoka One', cursive;
    font-size: 1.4rem;
    color: #1a0a2e;
    position: relative;
    box-shadow: 0 4px 15px rgba(255,215,0,0.4);
    overflow: hidden;
  }
  .q-cell:hover:not(.answered) {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 8px 30px rgba(255,215,0,0.8);
    z-index: 2;
  }
  .q-cell.answered {
    background: linear-gradient(135deg, #4a4a6a, #2a2a4a);
    border-color: rgba(255,255,255,0.2);
    cursor: default;
    opacity: 0.5;
  }
  .q-cell.answered .q-num { opacity: 0.3; }
  .q-cell .q-num { font-size: 1.6rem; font-weight: 900; }
  .q-cell .checkmark {
    position: absolute;
    font-size: 2rem;
    color: #00ff88;
    display: none;
  }
  .q-cell.answered .checkmark { display: block; }

  /* ========== QUESTION SCREEN ========== */
  #screen-question {
    background: transparent;
    padding: 15px;
  }
  .question-card {
    background: linear-gradient(135deg, rgba(26,10,46,0.98), rgba(45,27,105,0.98));
    border: 3px solid #FFD700;
    border-radius: 30px;
    padding: 30px;
    width: 100%;
    max-width: 900px;
    box-shadow: 0 0 50px rgba(255,215,0,0.3);
  }
  .q-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
  }
  .q-badge {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: #1a0a2e;
    padding: 8px 24px;
    border-radius: 50px;
    font-family: 'Fredoka One', cursive;
    font-size: 1.3rem;
  }
  .q-text {
    background: rgba(255,255,255,0.08);
    border: 2px solid rgba(255,215,0,0.3);
    border-radius: 20px;
    padding: 25px;
    margin-bottom: 25px;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .q-text p {
    font-size: 1.7rem;
    color: #fff;
    text-align: center;
    font-weight: 800;
    line-height: 1.4;
  }
  .choices-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
  .choice-btn {
    background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.05));
    border: 2.5px solid rgba(255,215,0,0.4);
    border-radius: 18px;
    padding: 18px 15px;
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;
    color: #fff;
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.3;
  }
  .choice-btn:hover:not(.revealed) {
    background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.15));
    border-color: #FFD700;
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(255,215,0,0.3);
  }
  .choice-btn .choice-num {
    display: inline-flex;
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: #1a0a2e;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-family: 'Fredoka One', cursive;
    font-size: 1.3rem;
    margin-bottom: 8px;
    font-weight: 900;
  }
  .choice-btn.correct {
    background: linear-gradient(135deg, #00c851, #007E33) !important;
    border-color: #00ff88 !important;
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0,200,81,0.6);
    animation: correctPulse 0.5s ease;
  }
  .choice-btn.wrong {
    background: linear-gradient(135deg, #ff4444, #cc0000) !important;
    border-color: #ff6666 !important;
    opacity: 0.7;
  }
  @keyframes correctPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1.05); }
  }
  .choice-btn.revealed { cursor: default; }

  /* ========== COUNTDOWN OVERLAY ========== */
  #countdown-overlay {
    position: fixed; inset: 0; z-index: 100;
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(5px);
  }
  #countdown-overlay.active { display: flex; }
  #countdown-video {
    max-width: 400px;
    width: 90%;
    border-radius: 20px;
    border: 4px solid #FFD700;
    box-shadow: 0 0 50px rgba(255,215,0,0.5);
  }

  /* ========== ANSWER OVERLAY ========== */
  #answer-overlay {
    position: fixed; inset: 0; z-index: 90;
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(3px);
  }
  #answer-overlay.active { display: flex; }
  .answer-card {
    background: linear-gradient(135deg, #1a0a2e, #2d1b69);
    border: 4px solid #FFD700;
    border-radius: 30px;
    padding: 40px 60px;
    text-align: center;
    box-shadow: 0 0 80px rgba(255,215,0,0.5);
    animation: answerPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  @keyframes answerPop {
    from { transform: scale(0.3) rotate(-10deg); opacity: 0; }
    to { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  .answer-label {
    font-family: 'Fredoka One', cursive;
    font-size: 1.4rem;
    color: rgba(255,215,0,0.7);
    margin-bottom: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .answer-text {
    font-family: 'Fredoka One', cursive;
    font-size: 2.5rem;
    color: #FFD700;
    text-shadow: 0 0 20px rgba(255,215,0,0.8);
    margin-bottom: 15px;
    line-height: 1.3;
  }
  .confetti-emoji {
    font-size: 3rem;
    animation: confettiSpin 0.5s ease-in-out infinite alternate;
    display: block;
  }
  @keyframes confettiSpin {
    from { transform: rotate(-10deg) scale(1); }
    to { transform: rotate(10deg) scale(1.2); }
  }

  /* ========== TIMER BAR ========== */
  .timer-bar-container {
    width: 100%;
    height: 12px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .timer-bar {
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(90deg, #00c851, #FFD700, #ff4444);
    transition: width 0.1s linear;
    width: 100%;
  }
  .timer-text {
    font-family: 'Fredoka One', cursive;
    font-size: 2rem;
    color: #FFD700;
    text-align: center;
  }

  /* ========== SPECIAL QUESTION OVERLAYS ========== */
  #media-overlay {
    position: fixed; inset: 0; z-index: 85;
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.85);
    flex-direction: column;
    gap: 20px;
  }
  #media-overlay.active { display: flex; }
  #media-video {
    max-width: 600px; max-height: 400px;
    width: 90%;
    border-radius: 20px;
    border: 4px solid #FFD700;
  }
  .close-media-btn {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    border: none;
    border-radius: 50px;
    padding: 12px 40px;
    font-family: 'Fredoka One', cursive;
    font-size: 1.2rem;
    color: #1a0a2e;
    cursor: pointer;
  }

  /* ========== NAV BUTTONS ========== */
  .nav-btn {
    background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.15));
    border: 2px solid rgba(255,215,0,0.5);
    border-radius: 50px;
    padding: 10px 25px;
    color: #FFD700;
    font-family: 'Fredoka One', cursive;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .nav-btn:hover {
    background: linear-gradient(135deg, rgba(255,215,0,0.35), rgba(255,165,0,0.25));
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(255,215,0,0.3);
  }

  /* ========== FLOATING PIKACHU ========== */
  .float-pika {
    position: fixed;
    bottom: 20px; right: 20px;
    font-size: 3rem;
    z-index: 20;
    animation: floatPika 3s ease-in-out infinite;
    cursor: pointer;
    filter: drop-shadow(0 5px 15px rgba(255,215,0,0.5));
  }
  @keyframes floatPika {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
  }

  /* ========== LIGHTNING EFFECT ========== */
  .lightning {
    position: fixed; inset: 0; z-index: 200;
    pointer-events: none;
    background: rgba(255,215,0,0.15);
    display: none;
    animation: lightning 0.15s ease;
  }
  @keyframes lightning {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

  /* ========== COMPLETION SCREEN ========== */
  #screen-complete {
    background: transparent;
    text-align: center;
  }
  .firework {
    position: fixed;
    pointer-events: none;
    font-size: 2rem;
    animation: fireworkFly 2s ease-out forwards;
  }
  @keyframes fireworkFly {
    0% { transform: translate(0, 0) scale(0); opacity: 1; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0; }
  }

  /* ========== RESPONSIVE ========== */
  @media (max-width: 640px) {
    .choices-grid { grid-template-columns: 1fr; }
    .grid-container { grid-template-columns: repeat(5, 1fr); gap: 6px; }
    .q-cell .q-num { font-size: 1.1rem; }
    .q-text p { font-size: 1.2rem; }
    .answer-text { font-size: 1.8rem; }
    .question-card { padding: 20px; }
  }

  /* ========== PARTICLES ========== */
  .particle {
    position: fixed;
    pointer-events: none;
    border-radius: 50%;
    z-index: 5;
    animation: particleFloat linear forwards;
  }
  @keyframes particleFloat {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
  }

  /* scroll lock */
  html { overflow: hidden; }
</style>
</head>
<body>

<!-- Stars Background -->
<div class="stars-bg" id="stars-bg"></div>

<!-- Lightning Flash -->
<div class="lightning" id="lightning"></div>

<!-- ==================== INTRO SCREEN ==================== -->
<div class="screen active" id="screen-intro">
  <div style="text-align:center; z-index:1;">
    <div style="margin-bottom:10px;">
      <span class="bell-ring" style="font-size:4rem;">🔔</span>
    </div>
    <h2 class="fredoka" style="color:#FFD700; font-size:clamp(1.2rem,3vw,2rem); letter-spacing:4px; text-transform:uppercase; margin-bottom:5px;">
      Trường Mầm non Bắc Hà
    </h2>
    <h1 class="fredoka title-glow" style="color:#FFD700; font-size:clamp(2.5rem,6vw,5rem); line-height:1.1; margin-bottom:5px;">
      RUNG CHUÔNG VÀNG
    </h1>
    <div class="pikachu-bounce" style="font-size:clamp(6rem,15vw,12rem); line-height:1; margin: 10px 0;">⚡</div>
    <h2 class="fredoka" style="color:#fff; font-size:clamp(1.5rem,4vw,3rem); margin-bottom:25px;">
      🎮 PIKACHU EDITION 🎮
    </h2>
    <p style="color:rgba(255,255,255,0.6); font-size:1rem; margin-bottom:30px;">
      Trắc nghiệm Tiếng Anh vui nhộn dành cho bé
    </p>
    <button class="btn-start" onclick="showRules()">
      ⚡ BẮT ĐẦU NGAY! ⚡
    </button>
  </div>
</div>

<!-- ==================== RULES SCREEN ==================== -->
<div class="screen" id="screen-rules">
  <div style="z-index:1; width:100%; max-width:700px;">
    <h1 class="fredoka" style="color:#FFD700; font-size:2.5rem; text-align:center; margin-bottom:25px;">
      📋 Luật Chơi
    </h1>
    <div class="rule-card" style="animation-delay:0.1s">
      <span style="font-size:2.5rem;">❓</span>
      <div>
        <p style="color:#FFD700; font-size:1.2rem; font-weight:800;">30 Câu hỏi</p>
        <p style="color:rgba(255,255,255,0.7); font-size:0.95rem;">Các câu hỏi về Tiếng Anh thú vị</p>
      </div>
    </div>
    <div class="rule-card" style="animation-delay:0.2s">
      <span style="font-size:2.5rem;">⏱️</span>
      <div>
        <p style="color:#FFD700; font-size:1.2rem; font-weight:800;">5 giây mỗi câu</p>
        <p style="color:rgba(255,255,255,0.7); font-size:0.95rem;">Nhanh tay giơ đáp án trước khi hết giờ!</p>
      </div>
    </div>
    <div class="rule-card" style="animation-delay:0.3s">
      <span style="font-size:2.5rem;">🖐️</span>
      <div>
        <p style="color:#FFD700; font-size:1.2rem; font-weight:800;">Chọn 1, 2 hoặc 3</p>
        <p style="color:rgba(255,255,255,0.7); font-size:0.95rem;">Giơ bảng đáp án sau khi đếm ngược 5 giây</p>
      </div>
    </div>
    <div class="rule-card" style="animation-delay:0.4s">
      <span style="font-size:2.5rem;">🏆</span>
      <div>
        <p style="color:#FFD700; font-size:1.2rem; font-weight:800;">Ai còn lại cuối cùng thắng!</p>
        <p style="color:rgba(255,255,255,0.7); font-size:0.95rem;">Trả lời sai thì ngồi xuống nhé!</p>
      </div>
    </div>
    <div style="text-align:center; margin-top:25px; display:flex; gap:15px; justify-content:center; flex-wrap:wrap;">
      <button class="nav-btn" onclick="showIntro()">← Quay lại</button>
      <button class="btn-start" onclick="showGrid()" style="font-size:1.3rem; padding:14px 40px;">
        🎯 VÀO GAME!
      </button>
    </div>
  </div>
</div>

<!-- ==================== QUESTION GRID SCREEN ==================== -->
<div class="screen" id="screen-grid">
  <div style="z-index:1; width:100%; max-width:1000px;">
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
      <h1 class="fredoka" style="color:#FFD700; font-size:clamp(1.3rem,3vw,2rem);">
        🔔 RUNG CHUÔNG VÀNG
      </h1>
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="color:rgba(255,255,255,0.6); font-size:0.9rem;" id="progress-text">0/30 câu</span>
        <button class="nav-btn" onclick="showIntro()">🏠 Trang chủ</button>
      </div>
    </div>
    
    <div class="grid-container" id="question-grid">
      <!-- Generated by JS -->
    </div>
  </div>
</div>

<!-- ==================== QUESTION SCREEN ==================== -->
<div class="screen" id="screen-question">
  <div style="z-index:1; width:100%; max-width:900px;">
    
    <!-- Timer bar -->
    <div class="timer-bar-container">
      <div class="timer-bar" id="timer-bar"></div>
    </div>
    
    <!-- Question Card -->
    <div class="question-card">
      <div class="q-header">
        <div class="q-badge" id="q-num-badge">Câu 1</div>
        <div style="display:flex; gap:10px; align-items:center;">
          <div class="timer-text" id="timer-display">5</div>
          <button class="nav-btn" id="btn-start-countdown" onclick="startCountdown()">▶ Đếm ngược</button>
        </div>
        <button class="nav-btn" onclick="showGrid()">📋 Bảng câu hỏi</button>
      </div>
      
      <!-- Question Text -->
      <div class="q-text" id="q-text-area">
        <p id="q-text">Loading...</p>
      </div>

      <!-- Special media button for Q26, Q30 -->
      <div id="media-btn-area" style="text-align:center; margin-bottom:15px; display:none;">
        <button class="btn-start" style="font-size:1.1rem; padding:10px 30px;" id="play-media-btn" onclick="playSpecialMedia()">
          🎵 Nghe/Xem ngay!
        </button>
      </div>
      
      <!-- Choices -->
      <div class="choices-grid" id="choices-container">
        <!-- Generated by JS -->
      </div>

      <!-- Reveal Answer Button -->
      <div style="text-align:center;">
        <button class="btn-start" style="font-size:1.1rem; padding:12px 40px;" onclick="revealAnswer()">
          ✨ XEM ĐÁP ÁN
        </button>
      </div>
    </div>
  </div>
</div>

<!-- ==================== COMPLETION SCREEN ==================== -->
<div class="screen" id="screen-complete">
  <div style="z-index:1; text-align:center;">
    <div style="font-size:5rem; margin-bottom:20px; animation: pikaBounce 0.8s ease-in-out infinite alternate;">🏆</div>
    <h1 class="fredoka title-glow" style="color:#FFD700; font-size:clamp(2rem,5vw,4rem); margin-bottom:15px;">
      HOÀN THÀNH RỒI!
    </h1>
    <p style="color:#fff; font-size:1.3rem; margin-bottom:10px;">
      🎉 Chúc mừng tất cả các bé! 🎉
    </p>
    <p style="color:rgba(255,255,255,0.7); font-size:1rem; margin-bottom:30px;">
      Đã hoàn thành 30 câu hỏi Rung Chuông Vàng
    </p>
    <div style="font-size:3rem; margin-bottom:30px;">⚡🌟⚡</div>
    <button class="btn-start" onclick="resetGame()">🔄 Chơi lại!</button>
  </div>
</div>

<!-- ==================== COUNTDOWN OVERLAY ==================== -->
<div id="countdown-overlay">
  <video id="countdown-video" src="/assets/countdown.mp4" playsinline></video>
</div>

<!-- ==================== ANSWER OVERLAY ==================== -->
<div id="answer-overlay" onclick="closeAnswer()">
  <div class="answer-card" onclick="event.stopPropagation()">
    <p class="answer-label">⚡ Đáp án đúng ⚡</p>
    <p class="answer-text" id="answer-text-display"></p>
    <span class="confetti-emoji">🎊</span>
    <div style="margin-top:20px; display:flex; gap:15px; justify-content:center; flex-wrap:wrap;">
      <button class="nav-btn" onclick="closeAnswer()">❌ Đóng</button>
      <button class="btn-start" style="font-size:1rem; padding:10px 30px;" onclick="nextQuestion()">➡ Câu tiếp</button>
    </div>
  </div>
</div>

<!-- ==================== MEDIA OVERLAY ==================== -->
<div id="media-overlay">
  <video id="media-video" controls playsinline></video>
  <button class="close-media-btn" onclick="closeMedia()">✕ Đóng</button>
</div>

<!-- Floating Pikachu -->
<div class="float-pika" onclick="pikachu()" title="Click Pikachu!">⚡</div>

<!-- Audio Elements -->
<audio id="audio-intro" src="/assets/intro-music.mp3" loop></audio>
<audio id="audio-lion" src="/assets/lion-sound.mp3"></audio>
<audio id="audio-correct" preload="auto"></audio>
<audio id="audio-wrong" preload="auto"></audio>

<script>
// ============================================================
//  GAME DATA - All 30 Questions
// ============================================================
const QUESTIONS = [
  {
    id: 1,
    question: "What color is it? 🎨",
    hint: "(Màu gì đây?)",
    choices: ["🔴 Red", "🔵 Blue", "🟡 Yellow"],
    correct: 2, // 0-indexed
    answer: "3. Yellow 🟡"
  },
  {
    id: 2,
    question: "What fruit is it? 🍊",
    hint: "(Đây là quả gì?)",
    choices: ["🍎 Apple", "🍐 Pear", "🍊 Orange"],
    correct: 2,
    answer: "3. Orange 🍊"
  },
  {
    id: 3,
    question: "What toy is it? 🪀",
    hint: "(Đây là đồ chơi gì?)",
    choices: ["🧸 Teddy", "🪀 Yo-yo", "🤖 Robot"],
    correct: 1,
    answer: "2. Yo-yo 🪀"
  },
  {
    id: 4,
    question: "What animal is it? 🐘",
    hint: "(Đây là con gì?)",
    choices: ["🦁 Lion", "🐒 Monkey", "🐘 Elephant"],
    correct: 2,
    answer: "3. Elephant 🐘"
  },
  {
    id: 5,
    question: "What food is it? 🍕",
    hint: "(Đây là món gì?)",
    choices: ["🍕 Pizza", "🥪 Sandwich", "🍔 Hamburger"],
    correct: 0,
    answer: "1. Pizza 🍕"
  },
  {
    id: 6,
    question: "What color is an apple? 🍎",
    hint: "(Quả táo màu gì?)",
    choices: ["⬛ Black", "🟡 Yellow", "🔴 Red"],
    correct: 2,
    answer: "3. Red 🔴"
  },
  {
    id: 7,
    question: "What is it? 🛝",
    hint: "(Đây là gì ở sân chơi?)",
    choices: ["🪜 Seesaw", "🛝 Slide", "🎠 Swing"],
    correct: 1,
    answer: "2. Slide 🛝"
  },
  {
    id: 8,
    question: "What number is it? 🔢",
    hint: "(Đây là số mấy?)",
    choices: ["🔟 Ten", "7️⃣ Seven", "9️⃣ Nine"],
    correct: 0,
    answer: "1. Ten 🔟"
  },
  {
    id: 9,
    question: "What are they? 👢",
    hint: "(Đây là gì?)",
    choices: ["🩳 Shorts", "👢 Boots", "🧦 Socks"],
    correct: 1,
    answer: "2. Boots 👢"
  },
  {
    id: 10,
    question: "How are you? 😊",
    hint: "(Bạn cảm thấy thế nào?)",
    choices: ["😊 Happy", "😢 Sad", "😠 Angry"],
    correct: 0,
    answer: "1. Happy 😊"
  },
  {
    id: 11,
    question: "What room is it? 🍳",
    hint: "(Đây là phòng gì?)",
    choices: ["🚿 Bathroom", "🛋️ Living room", "🍳 Kitchen"],
    correct: 2,
    answer: "3. Kitchen 🍳"
  },
  {
    id: 12,
    question: "What are they? 🦷",
    hint: "(Đây là bộ phận nào?)",
    choices: ["🦶 Feet", "🦷 Teeth", "👋 Fingers"],
    correct: 1,
    answer: "2. Teeth 🦷"
  },
  {
    id: 13,
    question: "What shape is it? 🔺",
    hint: "(Đây là hình gì?)",
    choices: ["🔺 Triangle", "⭕ Circle", "🟥 Square"],
    correct: 0,
    answer: "1. Triangle 🔺"
  },
  {
    id: 14,
    question: "Who is this? 👩",
    hint: "(Đây là ai?)",
    choices: ["👧 Sister", "👩 Mummy", "👨 Daddy"],
    correct: 1,
    answer: "2. Mummy 👩"
  },
  {
    id: 15,
    question: "How many bananas? 🍌🍌🍌",
    hint: "(Có bao nhiêu quả chuối?)",
    choices: ["1️⃣ One", "2️⃣ Two", "3️⃣ Three"],
    correct: 2,
    answer: "3. Three 🍌🍌🍌"
  },
  {
    id: 16,
    question: "Who is she? 👩‍⚕️",
    hint: "(Cô ấy làm nghề gì?)",
    choices: ["👩‍🏫 Teacher", "👩‍⚕️ Doctor", "👩‍🌾 Farmer"],
    correct: 1,
    answer: "2. Doctor 👩‍⚕️"
  },
  {
    id: 17,
    question: "Where are you from? 🇻🇳",
    hint: "(Bạn đến từ đâu?)",
    choices: ["🇻🇳 Vietnam", "🇯🇵 Japan", "🇨🇳 China"],
    correct: 0,
    answer: "1. I'm from Vietnam 🇻🇳"
  },
  {
    id: 18,
    question: "How old are you? 🎂",
    hint: "(Bạn bao nhiêu tuổi?)",
    choices: ["3️⃣ Three", "4️⃣ Four", "5️⃣ Five"],
    correct: 2,
    answer: "3. I'm five 🎂"
  },
  {
    id: 19,
    question: "How many legs does the elephant have? 🐘",
    hint: "(Voi có bao nhiêu chân?)",
    choices: ["4️⃣ Four", "1️⃣ One", "2️⃣ Two"],
    correct: 0,
    answer: "1. Four 🐘🦵🦵🦵🦵"
  },
  {
    id: 20,
    question: "How does she feel? 😋",
    hint: "(Cô ấy đang cảm thấy gì?)",
    choices: ["🥤 Thirsty", "😴 Sleepy", "😋 Hungry"],
    correct: 2,
    answer: "3. Hungry 😋"
  },
  {
    id: 21,
    question: "Where is Alfie? 🐱",
    hint: "(Alfie đang ở đâu?)",
    choices: ["⬆️ On", "⬇️ Under", "➡️ In"],
    correct: 1,
    answer: "2. Under ⬇️"
  },
  {
    id: 22,
    question: "Which drink is this? 🧃",
    hint: "(Đây là đồ uống gì?)",
    choices: ["🧃 Juice", "💧 Water", "🥛 Milk"],
    correct: 0,
    answer: "1. Juice 🧃"
  },
  {
    id: 23,
    question: "How many people in this family? 👨‍👩‍👧‍👦",
    hint: "(Gia đình có bao nhiêu người?)",
    choices: ["3️⃣ Three", "4️⃣ Four", "5️⃣ Five"],
    correct: 1,
    answer: "2. Four 👨‍👩‍👧‍👦"
  },
  {
    id: 24,
    question: "How are you? 😁",
    hint: "(Bạn khỏe không?)",
    choices: ["🔢 I'm six", "😁 I'm good", "😢 I'm sad"],
    correct: 1,
    answer: "2. I'm good! 😁"
  },
  {
    id: 25,
    question: "What animal likes eating bananas? 🐒",
    hint: "(Con gì thích ăn chuối?)",
    choices: ["🐒 Monkey", "🐌 Snail", "🐍 Snake"],
    correct: 0,
    answer: "1. Monkey 🐒"
  },
  {
    id: 26,
    question: "🔊 Listen to the sound. What animal is it?",
    hint: "(Nghe âm thanh - đây là con gì?)",
    choices: ["🦁 Lion", "🐄 Cow", "🐶 Dog"],
    correct: 0,
    answer: "1. Lion 🦁",
    media: "lion"
  },
  {
    id: 27,
    question: "How's the weather? ☀️",
    hint: "(Thời tiết hôm nay thế nào?)",
    choices: ["🌧️ Rainy", "💨 Windy", "☀️ Sunny"],
    correct: 2,
    answer: "3. Sunny ☀️"
  },
  {
    id: 28,
    question: "Who is this? 👩‍🏫",
    hint: "(Đây là ai?)",
    choices: ["👩‍⚕️ Doctor", "👩‍🏫 Teacher", "👩‍🌾 Farmer"],
    correct: 1,
    answer: "2. Teacher 👩‍🏫"
  },
  {
    id: 29,
    question: "Which school are you in? 🏫",
    hint: "(Bạn học ở trường nào?)",
    choices: ["Nguyen Du Kindergarten", "Tri Duc Kindergarten", "Bac Ha Kindergarten"],
    correct: 2,
    answer: "3. Bac Ha Kindergarten 🏫"
  },
  {
    id: 30,
    question: "🎵 Listen to the song! What song is it?",
    hint: "(Nghe bài hát - đây là bài nào?)",
    choices: ["🚶 Walking Walking", "💃 Head Shoulders Knees and Toes", "🐻 Gummy Bear"],
    correct: 2,
    answer: "3. Gummy Bear 🐻",
    media: "gummy"
  }
];

// ============================================================
//  GAME STATE
// ============================================================
let currentQuestion = null;
let answered = new Set();
let timerInterval = null;
let timeLeft = 5;
let countdownEnded = false;

// ============================================================
//  STARS BACKGROUND
// ============================================================
function createStars() {
  const bg = document.getElementById('stars-bg');
  const emojis = ['⭐','✨','🌟','💫'];
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 6 + 2;
    star.style.cssText = \`
      width: \${size}px; height: \${size}px;
      left: \${Math.random()*100}%;
      top: \${Math.random()*100}%;
      background: \${Math.random() > 0.5 ? '#FFD700' : '#fff'};
      animation-duration: \${Math.random()*3+2}s;
      animation-delay: \${Math.random()*3}s;
    \`;
    bg.appendChild(star);
  }
}

// ============================================================
//  PARTICLES
// ============================================================
function spawnParticles(x, y, count = 12) {
  const colors = ['#FFD700','#FFA500','#FF6B35','#00ff88','#00bfff','#ff69b4'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 12 + 6;
    const color = colors[Math.floor(Math.random()*colors.length)];
    const duration = Math.random() * 2 + 1.5;
    p.style.cssText = \`
      width:\${size}px; height:\${size}px;
      background:\${color};
      left:\${x + (Math.random()-0.5)*100}px;
      top:\${y}px;
      animation-duration:\${duration}s;
    \`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), duration * 1000);
  }
}

function fireworks() {
  const emojis = ['🎊','🎉','⭐','✨','🌟','💛','🟡'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'firework';
      el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      el.style.cssText = \`
        left:\${Math.random()*100}vw;
        top:\${Math.random()*100}vh;
        --tx:\${(Math.random()-0.5)*300}px;
        --ty:\${(Math.random()-0.5)*300}px;
      \`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }, i * 100);
  }
}

// ============================================================
//  LIGHTNING FLASH
// ============================================================
function flashLightning() {
  const el = document.getElementById('lightning');
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 150);
}

// ============================================================
//  AUDIO HELPERS
// ============================================================
function playIntroMusic() {
  const audio = document.getElementById('audio-intro');
  audio.volume = 0.5;
  audio.play().catch(() => {});
}
function stopIntroMusic() {
  const audio = document.getElementById('audio-intro');
  audio.pause();
  audio.currentTime = 0;
}
function playLionSound() {
  const audio = document.getElementById('audio-lion');
  audio.volume = 0.8;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function playCorrectSound() {
  // Generate beep via Web Audio API
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
    osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  } catch(e) {}
}

function playWrongSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.setValueAtTime(150, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch(e) {}
}

// ============================================================
//  SCREEN NAVIGATION
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showIntro() {
  clearTimerInterval();
  showScreen('screen-intro');
  playIntroMusic();
}

function showRules() {
  stopIntroMusic();
  showScreen('screen-rules');
}

function showGrid() {
  clearTimerInterval();
  closeAnswer();
  buildGrid();
  showScreen('screen-grid');
  updateProgress();
}

function showQuestion(qIndex) {
  currentQuestion = QUESTIONS[qIndex];
  clearTimerInterval();
  
  // Set question badge
  document.getElementById('q-num-badge').textContent = \`Câu \${currentQuestion.id}/30\`;
  
  // Set question text
  document.getElementById('q-text').textContent = \`\${currentQuestion.question}\\n\${currentQuestion.hint}\`;
  
  // Build choices
  const container = document.getElementById('choices-container');
  container.innerHTML = '';
  currentQuestion.choices.forEach((choice, i) => {
    const btn = document.createElement('div');
    btn.className = 'choice-btn';
    btn.innerHTML = \`
      <div>
        <span class="choice-num">\${i+1}</span>
        <p style="margin-top:5px;">\${choice}</p>
      </div>
    \`;
    btn.onclick = () => highlightChoice(i);
    container.appendChild(btn);
  });
  
  // Special media button
  const mediaBtnArea = document.getElementById('media-btn-area');
  const playMediaBtn = document.getElementById('play-media-btn');
  if (currentQuestion.media === 'lion') {
    mediaBtnArea.style.display = 'block';
    playMediaBtn.innerHTML = '🔊 Nghe âm thanh con vật!';
  } else if (currentQuestion.media === 'gummy') {
    mediaBtnArea.style.display = 'block';
    playMediaBtn.innerHTML = '🎵 Xem video bài hát!';
  } else {
    mediaBtnArea.style.display = 'none';
  }
  
  // Reset timer
  timeLeft = 5;
  countdownEnded = false;
  updateTimerDisplay();
  
  showScreen('screen-question');
}

// ============================================================
//  QUESTION GRID
// ============================================================
function buildGrid() {
  const grid = document.getElementById('question-grid');
  grid.innerHTML = '';
  QUESTIONS.forEach((q, i) => {
    const cell = document.createElement('div');
    cell.className = 'q-cell' + (answered.has(i) ? ' answered' : '');
    cell.id = \`q-cell-\${i}\`;
    cell.innerHTML = \`
      <span class="q-num">\${q.id}</span>
      <span class="checkmark">✓</span>
    \`;
    if (!answered.has(i)) {
      cell.onclick = () => { showQuestion(i); };
    }
    grid.appendChild(cell);
  });
}

function updateProgress() {
  document.getElementById('progress-text').textContent = \`\${answered.size}/30 câu\`;
}

// ============================================================
//  COUNTDOWN TIMER
// ============================================================
function startCountdown() {
  if (countdownEnded) return;
  clearTimerInterval();
  
  // Play countdown video overlay
  const overlay = document.getElementById('countdown-overlay');
  const video = document.getElementById('countdown-video');
  overlay.classList.add('active');
  video.currentTime = 0;
  video.play().catch(() => {});
  
  // Start timer
  timeLeft = 5;
  updateTimerDisplay();
  
  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    if (timeLeft <= 0) {
      timeLeft = 0;
      clearTimerInterval();
      countdownEnded = true;
      updateTimerDisplay();
      
      // Close countdown overlay
      setTimeout(() => {
        overlay.classList.remove('active');
        video.pause();
      }, 500);
    }
    updateTimerDisplay();
  }, 100);
  
  // Auto close video after 5.5s
  setTimeout(() => {
    overlay.classList.remove('active');
    video.pause();
  }, 5500);
}

function clearTimerInterval() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function updateTimerDisplay() {
  const t = Math.max(0, Math.ceil(timeLeft));
  document.getElementById('timer-display').textContent = t;
  const pct = (timeLeft / 5) * 100;
  document.getElementById('timer-bar').style.width = pct + '%';
  
  // Color change
  const bar = document.getElementById('timer-bar');
  if (pct > 60) bar.style.background = 'linear-gradient(90deg, #00c851, #69ff47)';
  else if (pct > 30) bar.style.background = 'linear-gradient(90deg, #FFD700, #FFA500)';
  else bar.style.background = 'linear-gradient(90deg, #ff4444, #cc0000)';
}

// ============================================================
//  HIGHLIGHT CHOICE
// ============================================================
function highlightChoice(index) {
  const btns = document.querySelectorAll('.choice-btn');
  btns.forEach((btn, i) => {
    btn.classList.remove('correct', 'wrong', 'revealed');
    if (i === index) {
      btn.classList.add('revealed');
      btn.style.background = 'linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,165,0,0.2))';
      btn.style.borderColor = '#FFD700';
      btn.style.transform = 'translateY(-4px) scale(1.03)';
      btn.style.boxShadow = '0 8px 25px rgba(255,215,0,0.4)';
    }
  });
  // Flash lightning 
  flashLightning();
}

// ============================================================
//  REVEAL ANSWER
// ============================================================
function revealAnswer() {
  if (!currentQuestion) return;
  
  const btns = document.querySelectorAll('.choice-btn');
  btns.forEach((btn, i) => {
    btn.classList.add('revealed');
    if (i === currentQuestion.correct) {
      btn.classList.add('correct');
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.transform = '';
      btn.style.boxShadow = '';
    } else {
      btn.classList.add('wrong');
      btn.style.background = '';
      btn.style.borderColor = '';
    }
  });
  
  // Show answer overlay
  document.getElementById('answer-text-display').textContent = currentQuestion.answer;
  document.getElementById('answer-overlay').classList.add('active');
  
  // Particles
  spawnParticles(window.innerWidth/2, window.innerHeight/2, 20);
  playCorrectSound();
  fireworks();
  
  // Mark as answered
  const qIndex = QUESTIONS.indexOf(currentQuestion);
  answered.add(qIndex);
  updateProgress();
}

function closeAnswer() {
  document.getElementById('answer-overlay').classList.remove('active');
}

function nextQuestion() {
  closeAnswer();
  const qIndex = QUESTIONS.indexOf(currentQuestion);
  
  // Find next unanswered question
  let next = -1;
  for (let i = qIndex + 1; i < QUESTIONS.length; i++) {
    if (!answered.has(i)) { next = i; break; }
  }
  if (next === -1) {
    for (let i = 0; i < qIndex; i++) {
      if (!answered.has(i)) { next = i; break; }
    }
  }
  
  if (next === -1) {
    // All done!
    showComplete();
  } else {
    showQuestion(next);
  }
}

// ============================================================
//  SPECIAL MEDIA
// ============================================================
function playSpecialMedia() {
  if (!currentQuestion) return;
  if (currentQuestion.media === 'lion') {
    playLionSound();
    // Flash
    flashLightning();
  } else if (currentQuestion.media === 'gummy') {
    const overlay = document.getElementById('media-overlay');
    const video = document.getElementById('media-video');
    video.src = '/assets/gummy-bear.mp4';
    overlay.classList.add('active');
    video.play().catch(() => {});
  }
}

function closeMedia() {
  const overlay = document.getElementById('media-overlay');
  const video = document.getElementById('media-video');
  overlay.classList.remove('active');
  video.pause();
}

// ============================================================
//  COMPLETE SCREEN
// ============================================================
function showComplete() {
  clearTimerInterval();
  showScreen('screen-complete');
  fireworks();
  setTimeout(fireworks, 1000);
  setTimeout(fireworks, 2000);
}

function resetGame() {
  answered.clear();
  currentQuestion = null;
  clearTimerInterval();
  showIntro();
}

// ============================================================
//  PIKACHU CLICK EASTER EGG
// ============================================================
function pikachu() {
  flashLightning();
  spawnParticles(window.innerWidth - 80, window.innerHeight - 80, 15);
  playCorrectSound();
  // Bounce effect
  const el = document.querySelector('.float-pika');
  el.style.transform = 'scale(2) rotate(20deg)';
  setTimeout(() => { el.style.transform = ''; }, 500);
}

// ============================================================
//  INIT
// ============================================================
createStars();
playIntroMusic();

// Close countdown overlay on click
document.getElementById('countdown-overlay').addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.remove('active');
    document.getElementById('countdown-video').pause();
    clearTimerInterval();
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeAnswer();
    closeMedia();
    document.getElementById('countdown-overlay').classList.remove('active');
  }
  if (e.key === ' ' && document.getElementById('screen-question').classList.contains('active')) {
    e.preventDefault();
    startCountdown();
  }
  if (e.key === 'Enter' && document.getElementById('screen-question').classList.contains('active')) {
    revealAnswer();
  }
  if (e.key === 'h' || e.key === 'H') {
    if (document.getElementById('screen-question').classList.contains('active')) showGrid();
    else if (document.getElementById('screen-grid').classList.contains('active')) showIntro();
  }
});
</script>
</body>
</html>`)
})

export default app
