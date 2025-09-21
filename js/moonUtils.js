// --- Black Hole Video + JoJo Sound + GSAP ---
const blackHoleBtn = document.getElementById('blackHoleBtn');
const blackHoleWrapper = document.getElementById('blackHoleWrapper');
const blackHoleVideo = document.getElementById('blackHoleVideo');

const blackHoleSound = new Audio("./assets/sounds/appear-c-moon.mp3");
blackHoleSound.loop = true;

blackHoleBtn.onclick = () => {
  // Show wrapper and reset scale
  blackHoleWrapper.style.display = 'block';
  gsap.set(blackHoleWrapper, { scale: 0, opacity: 1 });

  // Play video and audio
  blackHoleVideo.currentTime = 0;
  blackHoleVideo.loop = true; // loop if shorter than 20s
  blackHoleVideo.play().catch(err => console.log('Video play blocked:', err));

  blackHoleSound.currentTime = 0;
  blackHoleSound.play().catch(err => console.log('Audio play blocked:', err));

  // GSAP zoom animation
  gsap.to(blackHoleWrapper, {
    scale: 6,
    duration: 1.5,
    ease: "power2.in",
    opacity: 0.96
  });

  // After 20 seconds, stop everything
  setTimeout(() => {
    fadeOutAudio(blackHoleSound, 1500);
    blackHoleVideo.pause();

    gsap.to(blackHoleWrapper, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        blackHoleWrapper.style.display = 'none';
      }
    });

    document.body.classList.add('nebula-bg');
  }, 20000);
};

// Helper function: fade out audio
function fadeOutAudio(audio, duration) {
  let step = 50;
  let fadeInterval = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= 0.05;
    } else {
      audio.pause();
      audio.volume = 1; // reset for next time
      clearInterval(fadeInterval);
    }
  }, step);
}

// --- Starfield Animation ---
const starCanvas = document.getElementById('starfield');
const ctx = starCanvas.getContext('2d');

function resizeStars() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeStars);
resizeStars();

const stars = [];
for (let i = 0; i < 700; i++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 1.5,
    alpha: Math.random(),
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2
  });
}

function animateStars() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.globalAlpha = 1;
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,255,${s.alpha})`;
    ctx.fill();
    s.x += s.dx; s.y += s.dy;
    if (s.x < 0 || s.x > window.innerWidth) s.dx *= -1;
    if (s.y < 0 || s.y > window.innerHeight) s.dy *= -1;
  }
  requestAnimationFrame(animateStars);
}
animateStars();

// --- Moon Phase Logic ---
const phases = [
  { name: "New Moon", img: "./assets/moon-phase/new_moon.png", illum: "0%" },
  { name: "Waxing Crescent", img: "./assets/moon-phase/waxing_crescent.png", illum: "25%" },
  { name: "First Quarter", img: "./assets/moon-phase/
