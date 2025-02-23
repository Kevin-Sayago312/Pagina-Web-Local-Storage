// Variables
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tareas');
let tareas = [];

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    renderizarTareas();
});

formulario.addEventListener('submit', agregarTarea);

// Funciones
function agregarTarea(e) {
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const descripcion = document.querySelector('#descripcion').value;
    const ticket = document.querySelector('#ticket').value;
    const departamento = document.querySelector('#departamento').value;
    const estatus = document.querySelector('#estatus').value;
    const prioridad = document.querySelector('#prioridad').value;

    if (nombre === '' || descripcion === '' || ticket === '' || departamento === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

const tareaObj = {
    id: Date.now(),
    nombre,
    descripcion,
    ticket,
    departamento,
    estatus,
    prioridad
};

tareas.push(tareaObj);
actualizarLocalStorage();
renderizarTareas();
formulario.reset();
}

function renderizarTareas() {
    listaTareas.innerHTML = '';
    tareas.forEach(tarea => {
      const claseEstatus = asignarClaseEstatus(tarea.estatus);  // Aseguramos que siempre tenga un valor
  
      // Solo añadimos el elemento si claseEstatus no está vacío
      if (!claseEstatus) {
        console.error('El estatus no es válido:', tarea.estatus);
        return;  // Evita agregar una tarea si el estatus es inválido
      }
  
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'mb-3', 'p-3', claseEstatus); // Añadir la clase
      li.dataset.id = tarea.id;
  
      li.innerHTML = `
        <strong>${tarea.nombre}</strong> <br>
        <small>${tarea.descripcion}</small> <br>
        <span><strong>Ticket:</strong> ${tarea.ticket}</span> | 
        <span><strong>Departamento:</strong> ${tarea.departamento}</span> <br>
        <span><strong>Prioridad:</strong> ${tarea.prioridad}</span> <br>
        <span><strong>Estatus:</strong> ${tarea.estatus}</span>
        <button class="btn btn-danger btn-sm float-end borrar-tarea">Borrar</button>
      `;
      
      listaTareas.appendChild(li);
  
      // Botón para borrar tarea
      const btnBorrar = li.querySelector('.borrar-tarea');
      btnBorrar.onclick = () => borrarTarea(tarea.id);
    });
  }
  
  function asignarClaseEstatus(estatus) {
    switch (estatus) {
      case 'pendiente':
        return 'pendiente';
      case 'en-progreso':
        return 'en-progreso';
      case 'completada':
        return 'completada';
      default:
        console.error('Estatus desconocido:', estatus);  // Añadir un log si el estatus es desconocido
        return null; // Devolver null para indicar que no es un valor válido
    }
  }
  
  

function borrarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    actualizarLocalStorage();
    renderizarTareas();
}

function actualizarLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
