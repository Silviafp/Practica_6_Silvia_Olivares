import { fechaAString } from "./utils.js";
import { cargarTareas, guardarTareas } from "./storage.js";

let tareas = cargarTareas();

if (tareas.length === 0) {
  tareas = [
    {
      id: 1,
      titulo: "Aprender Scrum",
      descripcion: "Completar las issues del proyecto de la asignatura.",
      prioridad: "alta",
      fechaVencimiento: "2026-05-30",
      estado: "enCurso",
      creadoEl: fechaAString(new Date()),
    },
    {
      id: 2,
      titulo: "Configurar GitHub Pages",
      descripcion: "Verificar que los enlaces relativos funcionan.",
      prioridad: "media",
      fechaVencimiento: "2026-05-15",
      estado: "hecho",
      creadoEl: fechaAString(new Date()),
    },
  ];
  guardarTareas(tareas);
}
