// =======================================================
// 🎞 CARRUSEL PRINCIPAL (con auto-slide y animaciones)
// =======================================================

const carousel = document.querySelector('.carousel');
if (carousel) {
  const images = carousel.querySelectorAll('.carousel-images img');
  const texts = [
    "Texto asociado a la imagen 1",
    "Texto asociado a la imagen 2",
    "Texto asociado a la imagen 3",
    "Texto asociado a la imagen 4",
    "Texto asociado a la imagen 5"
  ];
  const progress = carousel.querySelector('.carousel-progress');
  const carouselText = carousel.querySelector('.carousel-text');
  const nextBtn = carousel.querySelector('.next');
  const prevBtn = carousel.querySelector('.prev');

  let currentIndex = 0;
  let isAnimating = false;
  let autoTimer = null;
  let isCarouselVisible = false;

  // Actualiza botones
  function updateButtons() {
    prevBtn.disabled = isAnimating;
    nextBtn.disabled = isAnimating;
  }

  // Muestra imagen con animación fluida
  function showImage(nextIndex, direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;
    updateButtons();

    const total = images.length;
    const currentImage = images[currentIndex];
    const nextImage = images[nextIndex];

    images.forEach((img, i) => {
      img.style.transition = 'none';
      img.style.left = i === currentIndex ? '0' : '100%';
    });

    nextImage.style.left = direction === 'next' ? '100%' : '-100%';
    void nextImage.offsetWidth;

    nextImage.style.transition = 'left 0.9s ease-in-out';
    currentImage.style.transition = 'left 0.9s ease-in-out';

    currentImage.style.left = direction === 'next' ? '-100%' : '100%';
    nextImage.style.left = '0';

    nextImage.addEventListener('transitionend', function handleTransition() {
      nextImage.removeEventListener('transitionend', handleTransition);
      currentIndex = nextIndex;
      carouselText.textContent = texts[nextIndex];
      progress.textContent = `${nextIndex + 1} - ${total}`;
      isAnimating = false;
      updateButtons();
    });

    resetAutoSlide();
  }

  // Auto-slide
  function startAutoSlide() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (isCarouselVisible && !isAnimating) {
        const nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex, 'next');
      }
    }, 8000);
  }

  function resetAutoSlide() {
    clearInterval(autoTimer);
    startAutoSlide();
  }

  // Inicialización
  function initCarousel() {
    images.forEach((img, i) => {
      img.style.transition = 'none';
      img.style.left = i === 0 ? '0' : '100%';
    });

    carouselText.textContent = texts[0];
    progress.textContent = `1 - ${images.length}`;
    updateButtons();
    startAutoSlide();
  }

  initCarousel();

  // Botones
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

  // IntersectionObserver para auto-slide
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        isCarouselVisible = entry.isIntersecting;
        if (isCarouselVisible) resetAutoSlide();
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(carousel);

  // Drag para cambio manual
  let isDown = false;
  let startX = 0;
  let dragDistance = 0;

  carousel.addEventListener('mousedown', e => {
    if (e.target.closest('.next') || e.target.closest('.prev')) return;
    isDown = true;
    startX = e.clientX;
    dragDistance = 0;
  });

  carousel.addEventListener('mousemove', e => {
    if (!isDown) return;
    dragDistance = e.clientX - startX;
  });

  carousel.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    if (dragDistance > 60) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(prevIndex, 'prev');
    } else if (dragDistance < -60) {
      const nextIndex = (currentIndex + 1) % images.length;
      showImage(nextIndex, 'next');
    }
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });
}



// =======================================================
// 🖱 CARRUSEL SECUNDARIO (scroll horizontal con drag instantáneo)
// =======================================================

const wrapper = document.querySelector('.carousel-wrapper');
if (wrapper) {
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const slides = wrapper.querySelectorAll('.carousel-slide');

  // Evitar arrastre nativo de imágenes
  wrapper.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', e => e.preventDefault());
  });

  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;

  wrapper.addEventListener('mousedown', e => {
    if (e.target.closest('.carousel-btn')) return;
    isDragging = true;
    wrapper.classList.add('dragging');
    startX = e.clientX;
    scrollStart = wrapper.scrollLeft;
    e.preventDefault();
  });

  wrapper.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    wrapper.scrollLeft = scrollStart - dx;
  });

  ['mouseup', 'mouseleave'].forEach(event =>
    wrapper.addEventListener(event, () => {
      isDragging = false;
      wrapper.classList.remove('dragging');
    })
  );

  // Botones laterales
  const slideWidth = slides[0]?.offsetWidth + 15 || 300;

  prevBtn?.addEventListener('click', () => {
    wrapper.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    wrapper.scrollBy({ left: slideWidth, behavior: 'smooth' });
  });
}
