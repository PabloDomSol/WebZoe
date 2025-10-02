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

const animElements = document.querySelectorAll('.anim-up, .anim-left, .anim-right');

const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-down');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');  // entra → visible
    } else {
      entry.target.classList.remove('visible'); // sale → oculto
    }
  });
}, {
  threshold: 0.01,           // mínimo 10% visible
  rootMargin: "0px 0px -50px 0px" // activa un poco antes
});

animElements.forEach(el => observer.observe(el));

revealElements.forEach(el => observer.observe(el));
