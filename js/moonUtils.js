// --- Black Hole Animation with GSAP ---
const blackHoleBtn = document.getElementById('blackHoleBtn');
const blackHoleOverlay = document.getElementById('blackHoleOverlay');

blackHoleBtn.onclick = () => {
  blackHoleOverlay.style.display = 'block';
  blackHoleOverlay.style.opacity = '1';
  blackHoleOverlay.style.transform = 'scale(0)';

  gsap.to(blackHoleOverlay, {
    scale: 6,
    duration: 1.5,
    ease: "power2.in",
    opacity: 0.96,
    onComplete: () => {
      blackHoleOverlay.style.display = 'none';
      document.body.classList.add('nebula-bg');
      // Reset for next time
      gsap.set(blackHoleOverlay, {scale: 0, opacity: 1});
    }
  });
};

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
  { name: "New Moon", img: "assets/moon-phase/new_moon.png", illum: "0%" },
  { name: "Waxing Crescent", img: "assets/moon-phase/waxing_crescent.png", illum: "25%" },
  { name: "First Quarter", img: "assets/moon-phase/first_quarter.png", illum: "50%" },
  { name: "Waxing Gibbous", img: "assets/moon-phase/waxing_gibbous.png", illum: "75%" },
  { name: "Full Moon", img: "assets/moon-phase/full_moon.png", illum: "100%" },
  { name: "Waning Gibbous", img: "assets/moon-phase/waning_gibbous.png", illum: "75%" },
  { name: "Last Quarter", img: "assets/moon-phase/last_quarter.png", illum: "50%" },
  { name: "Waning Crescent", img: "assets/moon-phase/waning_crescent.png", illum: "25%" }
];
let offsetDays = 0;
const phaseTitle = document.getElementById('phaseTitle');
const phaseName = document.getElementById('phaseName');
const illumination = document.getElementById('illumination');
const riseSet = document.getElementById('riseSet');
const moonImg = document.getElementById('moonImg');

function getMoonAge(date) {
  const known = new Date(Date.UTC(2000, 0, 6, 18, 14));
  const diff = (date - known) / (1000 * 60 * 60 * 24);
  return ((diff % 29.53) + 29.53) % 29.53;
}
function getMoonPhase(age) {
  if (age < 1.8457 || age > 28.7) return phases[0];
  if (age < 7.4) return phases[1];
  if (age < 9.3) return phases[2];
  if (age < 14.8) return phases[3];
  if (age < 16.6) return phases[4];
  if (age < 22) return phases[5];
  if (age < 24) return phases[6];
  return phases[7];
}
function getRiseSet(date) {
  return "Rise: ~6:00 PM / Set: ~6:00 AM";
}
function updateMoon(date) {
  const age = getMoonAge(date);
  const phase = getMoonPhase(age);
  moonImg.src = phase.img;
  phaseTitle.innerText = phase.name + ' (' + date.toDateString() + ')';
  phaseName.innerText = phase.name;
  illumination.innerText = 'Illumination: ' + phase.illum;
  riseSet.innerText = getRiseSet(date);
}
function update() {
  const date = new Date(Date.now() + offsetDays * 86400000);
  updateMoon(date);
}
document.getElementById('prevBtn').onclick = () => { offsetDays--; update(); };
document.getElementById('nextBtn').onclick = () => { offsetDays++; update(); };
update();
