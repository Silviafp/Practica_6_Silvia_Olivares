import { cargarTareas } from "./storage.js";

export function inicializarFormulario(id) {
  const formulario = document.querySelector("form");
  
  if (!id) {
    formulario.reset();
    
    const tareas = cargarTareas();
    const siguienteId = tareas.length > 0 ? parseInt(tareas.at(-1).id) + 1 : 1;

    formulario.querySelector('[name="id"]').value = siguienteId;
    formulario.querySelector('[name="prioridad"]').value = "media";
  } else {
    const tareas = cargarTareas();
    const tarea = tareas.find((t) => t.id === parseInt(id));
    const reset = document.querySelector("[type='reset']");
    reset.setAttribute("disabled", true);
    
    if (tarea) {
      const estadoSelect = formulario.querySelector('[name="estado"]');
      estadoSelect.removeAttribute("disabled");
      
      Object.keys(tarea).forEach((campo) => {
        const elemento = formulario.querySelector(`[name="${campo}"]`);
        if (elemento) {
          elemento.value = tarea[campo];
        }
      });
    }
  }
}

export function validarFormulario(formulario) {
  const formData = new FormData(formulario);
  let validado = true;
  for (const [campo, valor] of formData) {
    const elemento = formulario.querySelector(`[name="${campo}"]`);
    if (campo === "titulo" && valor.trim() === "") {
      alert("Tienes que introducir un título para la tarea.");
      validado = false;
    } else if (campo === "descripcion" && valor.trim() === "") {
      alert("Tienes que introducir una descripción.");
      validado = false;
    } else if (campo === "fechaVencimiento" && valor === "") {
      alert("Tienes que introducir una fecha de vencimiento.");
      validado = false;
    }
  }

  return validado;
}
