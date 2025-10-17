// PARA CONTROLAR EL DIFUMINADO Y OCULTADO DEL HEADER
const header = document.querySelector('.main-header');
let lastScrollY = window.scrollY; // Guardamos la posición anterior
const hideDistance = 300; // Distancia en px antes de ocultar

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Activar difuminado apenas se mueva
  if (scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Mostrar/ocultar header según scroll hacia abajo/arriba
  if (scrollY > hideDistance && scrollY > lastScrollY) {
    // Scrolleando hacia abajo más allá de hideDistance → ocultar
    header.classList.add('hidden');
  } else {
    // Scrolleando hacia arriba o no ha llegado a hideDistance → mostrar
    header.classList.remove('hidden');
  }

  lastScrollY = scrollY; // Actualizamos la posición anterior
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











// --- Menú hamburguesa y cierre ---
const menuIcon = document.querySelector('.menu-icon');
const overlay = document.getElementById('menuOverlay');
const closeBtn = document.getElementById('closeMenu');

// Abrir menú
menuIcon.addEventListener('click', () => {
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // evitar scroll de fondo
});

// Cerrar menú
closeBtn.addEventListener('click', () => {
  overlay.classList.remove('active');
  document.body.style.overflow = ''; // restaurar scroll
});

document.querySelectorAll('.dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const content = dropdown.querySelector('.dropdown-content');

  toggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
    content.classList.toggle('show');
  });
});




const phrases = [
  "“El asombro es la base de la sabiduría”  Aristóteles",
  "“La gente ignora el diseño que ignora a la gente” Frank Chimero",
  "“Para crear, uno antes debe antes cuestionarlo todo” Eileen Gray",
  "“El diseño es simple, por eso es tan complicado” Paul Rand",
  "“Cierro mis ojos para ver” Paul Gaugin"
];

let currentIndex = 0;
const phraseElement = document.getElementById("rotating-phrase");

// 🔹 Animación solo slide
function slideText(newText) {
  // salida
  phraseElement.classList.remove("slide-in");
  phraseElement.classList.add("slide-out");

  // después de 150ms, cambia el texto y entra
  setTimeout(() => {
    phraseElement.textContent = newText;
    phraseElement.classList.remove("slide-out");
    phraseElement.classList.add("slide-in");

    // quitar clase slide-in tras animación
    setTimeout(() => phraseElement.classList.remove("slide-in"), 400);
  }, 150);
}

function rotatePhrase() {
  currentIndex = (currentIndex + 1) % phrases.length;
  slideText(phrases[currentIndex]);
}

// Cambiar frase cada 8 segundos
setInterval(rotatePhrase, 30000);







document.addEventListener('DOMContentLoaded', () => {

  // ===============================
  // 🌙 MODO OSCURO
  // ===============================
  const toggleBtn = document.querySelector('.toggle-dark-mode');

  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  // ===============================
  // 🔒 MODAL DE PRIVACIDAD
  // ===============================
  const modal = document.getElementById("privacyModal");
  const acceptBtn = document.getElementById("acceptBtn");
  const rejectBtn = document.getElementById("rejectBtn");
  const showMoreBtn = document.getElementById("showMoreBtn");
  const fullText = document.getElementById("privacyFull");

  // Mostrar modal si no hay decisión previa
  if (!localStorage.getItem("privacyDecision")) {
    modal.style.display = "flex";
  }

  // Botón "Ver más"
  showMoreBtn.addEventListener("click", () => {
    fullText.classList.toggle("oculto");
    showMoreBtn.textContent = fullText.classList.contains("oculto") ? "Ver más" : "Ver menos ";
  });

  // Aceptar
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("privacyDecision", "accepted");
    modal.style.display = "none";
  });

  // Rechazar
  rejectBtn.addEventListener("click", () => {
    localStorage.setItem("privacyDecision", "rejected");
    modal.style.display = "none";
  });

  // Abrir modal desde enlaces del footer
  document.querySelectorAll('a[data-modal="privacy"]').forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Evitar navegación
      modal.style.display = "flex";
    });
  });

});
