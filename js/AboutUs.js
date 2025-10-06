// ===============================
// 🔹 Selecciones principales
// ===============================
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
const carousel = document.querySelector('.carousel'); // Contenedor principal del carrusel

let currentIndex = 0;
let isAnimating = false;
let autoTimer = null;
let isCarouselVisible = false; // 🔹 Solo avanzar si está visible

// ===============================
// 🔹 Funciones
// ===============================

// Actualiza estado de los botones
function updateButtons() {
  prevBtn.disabled = isAnimating;
  nextBtn.disabled = isAnimating;
}

// Muestra imagen con animación (circular)
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
    if (i !== currentIndex && i !== nextIndex) img.style.left = '100%';
  });

  currentImage.classList.add('active');
  currentImage.style.left = '0';
  nextImage.classList.add('active');

  let animatedElement;

  if (direction === 'next') {
    nextImage.style.left = '100%';
    void nextImage.offsetWidth;
    nextImage.style.transition = 'left 1s ease';
    nextImage.style.left = '0';
    animatedElement = nextImage;
  } else {
    nextImage.style.left = '0';
    void nextImage.offsetWidth;
    currentImage.style.transition = 'left 1s ease';
    currentImage.style.left = '100%';
    animatedElement = currentImage;
  }

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
  resetAutoSlide();
}

// Auto-slide (solo si el carrusel es visible)
function startAutoSlide() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    if (isCarouselVisible && !isAnimating) {
      const nextIndex = (currentIndex + 1) % images.length; // 🔹 loop circular
      showImage(nextIndex, 'next');
    }
  }, 10000);
}

// Reinicia el auto-slide
function resetAutoSlide() {
  clearInterval(autoTimer);
  startAutoSlide();
}

// Inicialización
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

// ===============================
// 🔹 Botones (circular)
// ===============================
nextBtn.addEventListener('click', () => {
  if (isAnimating) return;
  const nextIndex = (currentIndex + 1) % images.length;
  showImage(nextIndex, 'next');
});

prevBtn.addEventListener('click', () => {
  if (isAnimating) return;
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(prevIndex, 'prev');
});

// ===============================
// 🔹 IntersectionObserver para auto-slide
// ===============================
if (carousel) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        isCarouselVisible = entry.isIntersecting;
        if (isCarouselVisible) resetAutoSlide();
      });
    },
    { threshold: 0.5 } // 50% visible
  );
  observer.observe(carousel);
}

// ===============================
// 🔹 Drag horizontal para cambiar imágenes
// ===============================
let isDown = false;
let startX = 0;
let dragDistance = 0;

carousel.addEventListener('mousedown', (e) => {
  if (e.target.closest('.next') || e.target.closest('.prev')) return;
  isDown = true;
  startX = e.pageX;
  dragDistance = 0;
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  dragDistance = e.pageX - startX;
});

carousel.addEventListener('mouseup', (e) => {
  if (!isDown) return;
  isDown = false;

  if (dragDistance > 50) {
    // arrastre hacia la derecha → prev
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(prevIndex, 'prev');
  } else if (dragDistance < -50) {
    // arrastre hacia la izquierda → next
    const nextIndex = (currentIndex + 1) % images.length;
    showImage(nextIndex, 'next');
  }
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
});


















const wrapper = document.querySelector('.carousel-wrapper');
let scrollLeft;
let isDragging = false;

// Evitar arrastrar imágenes de forma nativa
const imagess = document.querySelectorAll('.carousel-slide img');
imagess.forEach(img => {
  img.setAttribute('draggable', 'false');
  img.addEventListener('dragstart', e => e.preventDefault());
});

// Drag horizontal
wrapper.addEventListener('mousedown', (e) => {
  // no bloquear botones
  if (e.target.closest('.carousel-btn')) return;

  isDown = true;
  isDragging = false;
  wrapper.classList.add('active');
  startX = e.pageX;
  scrollLeft = wrapper.scrollLeft;
});

wrapper.addEventListener('mouseup', (e) => {
  if (!isDown) return;
  isDown = false;
  wrapper.classList.remove('active');

  // Detectar clic sin arrastre en imagen
  if (!isDragging) {
    const img = e.target.closest('.carousel-slide img');
    if (img) openLightbox(img.src);
  }
});

wrapper.addEventListener('mouseleave', () => {
  isDown = false;
  wrapper.classList.remove('active');
});

wrapper.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  isDragging = true;
  const x = e.pageX;
  const walk = x - startX;
  wrapper.scrollLeft = scrollLeft - walk;
});

// --- Botones carrusel ---
const prevBtnn = document.querySelector('.carousel-btn.prev');
const nextBtnn = document.querySelector('.carousel-btn.next');
const slide = document.querySelector('.carousel-slide');

if (prevBtnn && nextBtnn && slide) {
  const slideWidth = slide.offsetWidth + 15; // ancho + gap

  prevBtnn.addEventListener('click', () => {
    wrapper.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  });

  nextBtnn.addEventListener('click', () => {
    wrapper.scrollBy({ left: slideWidth, behavior: 'smooth' });
  });
}