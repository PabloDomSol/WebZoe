const images = document.querySelectorAll('.carousel-images img');
const texts = [
  "Texto asociado a la imagen 1",
  "Texto asociado a la imagen 2",
  "Texto asociado a la imagen 3",
  "Texto asociado a la imagen 4",
  "Texto asociado a la imagen 5"
];
const progress = document.querySelector('.carousel-progress');
const carouselText = document.querySelector('.carousel-text');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;
let isAnimating = false;
let autoTimer = null;

// 🔹 Actualiza estado de los botones
function updateButtons() {
  prevBtn.disabled = currentIndex === 0 || isAnimating;
  nextBtn.disabled = currentIndex === images.length - 1 || isAnimating;
}

// 🔹 Muestra imagen con animación
function showImage(nextIndex, direction = 'next') {
  if (isAnimating) return;
  isAnimating = true;
  updateButtons();

  const total = images.length;
  const currentImage = images[currentIndex];
  const nextImage = images[nextIndex];

  // Reset estilos base
  images.forEach((img, i) => {
    img.classList.remove('previous', 'active');
    img.style.transition = 'none';

    if (i !== currentIndex && i !== nextIndex) {
      img.style.left = '100%'; // fuera de pantalla
    }
  });

  currentImage.classList.add('active');
  currentImage.style.left = '0';
  nextImage.classList.add('active');

  let animatedElement;

  if (direction === 'next') {
    // ➡️ Nueva entra desde la derecha
    nextImage.style.left = '100%';
    void nextImage.offsetWidth;
    nextImage.style.transition = 'left 1s ease';
    nextImage.style.left = '0';
    animatedElement = nextImage;
  } else {
    // ⬅️ Actual se desliza a la derecha, la nueva queda fija
    nextImage.style.left = '0';
    void nextImage.offsetWidth;
    currentImage.style.transition = 'left 1s ease';
    currentImage.style.left = '100%';
    animatedElement = currentImage;
  }

  // Fin de la animación
  const handleTransitionEnd = () => {
    animatedElement.removeEventListener('transitionend', handleTransitionEnd);

    currentImage.classList.remove('active');
    currentImage.classList.add('previous');

    currentIndex = nextIndex;
    carouselText.textContent = texts[nextIndex];
    progress.textContent = `${nextIndex + 1} - ${total}`;

    isAnimating = false;
    updateButtons();
  };

  animatedElement.addEventListener('transitionend', handleTransitionEnd);
  resetAutoSlide(); // reiniciar temporizador
}

// 🔹 Botones
nextBtn.addEventListener('click', () => {
  if (isAnimating || currentIndex >= images.length - 1) return;
  showImage(currentIndex + 1, 'next');
});

prevBtn.addEventListener('click', () => {
  if (isAnimating || currentIndex <= 0) return;
  showImage(currentIndex - 1, 'prev');
});

// 🔹 Cambio automático cada 10s (solo si no se ha llegado al final)
function startAutoSlide() {
  autoTimer = setInterval(() => {
    if (!isAnimating && currentIndex < images.length - 1) {
      showImage(currentIndex + 1, 'next');
    }
  }, 10000);
}

function resetAutoSlide() {
  clearInterval(autoTimer);
  startAutoSlide();
}

// 🔹 Inicialización
function initCarousel() {
  images.forEach(img => {
    img.style.transition = 'none';
    img.style.left = '100%';
  });

  images[0].style.left = '0';
  images[0].classList.add('active');

  carouselText.textContent = texts[0];
  progress.textContent = `1 - ${images.length}`;

  updateButtons();
  startAutoSlide();
}

initCarousel();


const reveals = document.querySelectorAll('.scroll-section .reveal');

let currentIndexx = 0;

function revealNext() {
  if (currentIndexx >= reveals.length) return;

  const el = reveals[currentIndexx];
  const rect = el.getBoundingClientRect();

  // Activar cuando la parte superior del elemento esté cerca del centro de la pantalla
  if (rect.top < window.innerHeight * 0.75) {
    el.classList.add('visible');
    currentIndexx++;
  }
}

window.addEventListener('scroll', revealNext);
window.addEventListener('load', revealNext);
