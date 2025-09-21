// --- Black Hole Video + JoJo Sound + GSAP + Temporary Nebula ---
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

    // Apply temporary nebula effect
    if (!document.body.classList.contains('nebula-bg')) {
      document.body.classList.add('nebula-bg');
      // Remove after 3 seconds
      setTimeout(() => {
        document.body.classList.remove('nebula-bg');
      }, 3000);
    }
  }, 20000);
};

// Helper function: fade out audio smoothly
function fadeOutAudio(audio, duration) {
  const step = 50;
  const fadeInterval = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= 0.05;
    } else {
      audio.pause();
      audio.volume = 1; // reset for next time
      clearInterval(fadeInterval);
    }
  }, step);
}
