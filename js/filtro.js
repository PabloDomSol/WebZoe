const dropdown = document.querySelector('.modulos-dropdown');
const dropbtn = dropdown.querySelector('.modulos-dropbtn');
const options = dropdown.querySelectorAll('.modulos-dropdown-content a');

dropbtn.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});

options.forEach(option => {
  option.addEventListener('click', (e) => {
    e.preventDefault();
    // Cambiar texto del botón
    dropbtn.textContent = option.textContent;
    // Marcar opción como seleccionada
    options.forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    // Cerrar dropdown
    dropdown.classList.remove('open');
  });
});

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});



const dropdownOptions = document.querySelectorAll('.modulos-dropdown-content a');
const modulos = document.querySelectorAll('.modulo');

dropdownOptions.forEach(option => {
  option.addEventListener('click', (e) => {
    e.preventDefault();

    // Mostrar el texto seleccionado en el botón
    const dropbtn = document.querySelector('.modulos-dropbtn');
    dropbtn.textContent = option.textContent;

    // Marcar opción seleccionada
    dropdownOptions.forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');

    // Filtrar módulos
    const categoriaSeleccionada = option.textContent;
    modulos.forEach(modulo => {
      if (categoriaSeleccionada === "Todos" || modulo.dataset.categoria === categoriaSeleccionada) {
        modulo.style.display = "flex"; // mostrar módulo
      } else {
        modulo.style.display = "none"; // ocultar módulo
      }
    });

    // Cerrar dropdown
    document.querySelector('.modulos-dropdown').classList.remove('open');
  });
});
