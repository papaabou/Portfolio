let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoplayInterval;
let isAutoplayActive = true;

function showSlide(index) {
  // Wrap around
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  // Update slides
  slides.forEach((slide, i) => {
      slide.classList.toggle('opacity-100', i === currentSlide);
      slide.classList.toggle('opacity-0', i !== currentSlide);
  });

  // Update dots
  dots.forEach((dot, i) => {
      if (i === currentSlide) {
          dot.classList.remove('bg-white/50');
          dot.classList.add('bg-white');
      } else {
          dot.classList.remove('bg-white');
          dot.classList.add('bg-white/50');
      }
  });
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

function goToSlide(index) {
  showSlide(index);
}

function startAutoplay() {
  autoplayInterval = setInterval(() => {
      changeSlide(1);
  }, 4000);
  isAutoplayActive = true;
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
  isAutoplayActive = false;
}

function toggleAutoplay() {
  const text = document.getElementById('autoplay-text');
  if (isAutoplayActive) {
      stopAutoplay();
      text.textContent = '▶ Démarrer Auto-play';
  } else {
      startAutoplay();
      text.textContent = '⏸ Pause Auto-play';
  }
}

// Start autoplay on load
startAutoplay();

// Pause on hover
const sliderContainer = document.querySelector('.relative.overflow-hidden');
sliderContainer.addEventListener('mouseenter', () => {
  if (isAutoplayActive) stopAutoplay();
});
sliderContainer.addEventListener('mouseleave', () => {
  if (isAutoplayActive) startAutoplay();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
});
