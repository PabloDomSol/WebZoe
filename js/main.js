//PARA CONTROLAR EL DIFUMINADO DEL HEADER
const header = document.querySelector('.main-header');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  // Activar difuminado apenas se mueva
  if (scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Ocultar header al llegar al 75% del hero
  if (scrollY > heroHeight * 0.75) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
});


//PARA CONTROLAR LAS ANIMACIONES DE APARICIONES

// Seleccionamos todos los elementos
const animElements = document.querySelectorAll('.anim-up, .anim-left, .anim-right');
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-down');
const lineas = document.querySelectorAll('.linea-animada');

// Reutilizamos un solo observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;

    if (entry.isIntersecting) {
      if (el.classList.contains('linea-animada')) {
        // Configuramos el ancho final desde el atributo data-ancho
        const ancho = el.getAttribute('data-ancho') || '100%';
        el.style.setProperty('--linea-ancho', ancho);
        el.classList.add('animar');
      } else {
        el.classList.add('visible');
      }
    } else {
      if (el.classList.contains('linea-animada')) {
        el.classList.remove('animar');
        void el.offsetWidth; // fuerza reflow para reiniciar animación
      } else {
        el.classList.remove('visible');
      }
    }
  });
}, {
  threshold: 0.01,
  rootMargin: "0px 0px -50px 0px"
});

// Observamos todos los elementos
animElements.forEach(el => observer.observe(el));
revealElements.forEach(el => observer.observe(el));
lineas.forEach(el => observer.observe(el));
