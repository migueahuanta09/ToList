const input = document.getElementById('nuevaTarea');
const lista = document.getElementById('listaTareas');
const btn = document.getElementById('agregarBtn');

// Cargar tareas guardadas
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Mostrar tareas
function mostrarTareas() {
  lista.innerHTML = '';
  tareas.forEach((tarea, index) => {
    const li = document.createElement('li');
    li.textContent = tarea.texto;
    if (tarea.completada) li.classList.add('completada');

    // Marcar completada
    li.addEventListener('click', () => {
      tareas[index].completada = !tareas[index].completada;
      guardarTareas();
      mostrarTareas();
    });

    // Botón eliminar
    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'X';
    eliminarBtn.className = 'eliminar';
    eliminarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tareas.splice(index, 1);
      guardarTareas();
      mostrarTareas();
    });

    li.appendChild(eliminarBtn);
    lista.appendChild(li);
  });
}

// Guardar en localStorage
function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Agregar nueva tarea
btn.addEventListener('click', () => {
  const texto = input.value.trim();
  if (texto) {
    tareas.push({ texto, completada: false });
    guardarTareas();
    mostrarTareas();
    input.value = '';
  }
});

// Mostrar al iniciar
mostrarTareas();
