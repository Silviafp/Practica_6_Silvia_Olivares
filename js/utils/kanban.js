import { cargarTareas } from "./storage.js";
import { formatearFechaDiaMesAnno, limpiarNodo } from "./commons.js";

const crearEtiqueta = ({ prioridad }) => {
  const etiqueta = document.createElement("div");
  etiqueta.classList.add("mb-3");

  const span = document.createElement("span");

  const clasesComunes = [
    "inline-block",
    "px-3",
    "py-1",
    "rounded",
    "text-xs",
    "font-bold",
    "uppercase",
  ];
  let clasesEtiqueta = ["bg-sky-200", "text-sky-900"];

  if (prioridad === "media") {
    clasesEtiqueta = ["bg-amber-200", "text-amber-900"];
  } else if (prioridad === "alta") {
    clasesEtiqueta = ["bg-rose-200", "text-rose-900"];
  }

  span.classList.add(...clasesComunes, ...clasesEtiqueta);

  const textoEtiqueta = document.createTextNode(`Prioridad ${prioridad}`);
  span.appendChild(textoEtiqueta);

  etiqueta.appendChild(span);
  return etiqueta;
};

const crearTitulo = ({ titulo }) => {
  const h4 = document.createElement("h4");
  h4.classList.add(
    "font-bold",
    "text-slate-800",
    "mb-3",
    "line-clamp-1",
    "truncate",
    "hover:text-violet-700",
  );

  const textoTitulo = document.createTextNode(titulo);
  h4.appendChild(textoTitulo);
  h4.setAttribute("title", titulo);
  return h4;
};

const crearFecha = (icono, texto, fecha) => {
  const fechaElemento = document.createElement("div");
  fechaElemento.classList.add("flex", "items-center", "gap-2");

  const iconoElemento = document.createElement("span");
  const textoIcono = document.createTextNode(icono);
  iconoElemento.appendChild(textoIcono);

  const span = document.createElement("span");
  const textoSpan = document.createTextNode(texto + " ");
  span.appendChild(textoSpan);

  const time = document.createElement("time");
  time.setAttribute("datetime", fecha);

  const textoFecha = document.createTextNode(formatearFechaDiaMesAnno(fecha));
  time.appendChild(textoFecha);

  span.appendChild(time);

  fechaElemento.appendChild(iconoElemento);
  fechaElemento.appendChild(span);

  return fechaElemento;
};

const crearContenedorFechas = ({ creadoEl, fechaVencimiento }) => {
  const fechas = document.createElement("div");
  fechas.classList.add("space-y-2", "text-xs", "text-slate-600");

  const creadoElElemento = crearFecha("📝", "Creado:", creadoEl);
  const fechaVencimientoElemento = crearFecha("📅", "Vence:", fechaVencimiento);

  fechas.appendChild(creadoElElemento);
  fechas.appendChild(fechaVencimientoElemento);
  return fechas;
};

const crearTarea = (tarea) => {
  const { id } = tarea;
  const article = document.createElement("article");
  article.classList.add(
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "border",
    "border-slate-200",
    "hover:shadow-lg",
    "transition-shadow",
    "overflow-hidden",
    "h-full",
  );

  const link = document.createElement("a");
  link.classList.add(
    "block",
    "p-4",
    "h-full",
    "hover:bg-slate-50",
    "transition-colors",
  );
  link.setAttribute("href", `./view-task.html?id=${id}`);

  const etiquetaElemento = crearEtiqueta(tarea);
  const tituloElemento = crearTitulo(tarea);
  const fechasElemento = crearContenedorFechas(tarea);

  link.appendChild(etiquetaElemento);
  link.appendChild(tituloElemento);
  link.appendChild(fechasElemento);
  article.appendChild(link);

  return article;
};

const renderizarContadores = (elemento, porcentaje) => {
  limpiarNodo(elemento);
  const nodoTexto = document.createTextNode(`${porcentaje}%`);
  elemento.appendChild(nodoTexto);
};

const actualizarContadores = (tareas) => {
  const contadorPorHacerDsk = document.querySelector("#todo-count-dsk");
  const contadorEnCursoDsk = document.querySelector("#inprogress-count-dsk");
  const contadorHechoDsk = document.querySelector("#done-count-dsk");

  const contadorPorHacerMob = document.querySelector("#todo-count-mob");
  const contadorEnCursoMob = document.querySelector("#inprogress-count-mob");
  const contadorHechoMob = document.querySelector("#done-count-mob");

  let todo = 0;
  let inprogress = 0;
  let done = 0;

  tareas.forEach((tarea) => {
    if (tarea.estado === "porHacer") {
      todo++;
    } else if (tarea.estado === "enCurso") {
      inprogress++;
    } else if (tarea.estado === "hecho") {
      done++;
    }
  });

  const totalTareas = tareas.length;
  const porcentajeTodo =
    totalTareas > 0 ? Math.round((todo / totalTareas) * 100) : 0;
  const porcentajeInProgress =
    totalTareas > 0 ? Math.round((inprogress / totalTareas) * 100) : 0;
  const porcentajeDone =
    totalTareas > 0 ? Math.round((done / totalTareas) * 100) : 0;

  if (contadorPorHacerDsk)
    renderizarContadores(contadorPorHacerDsk, porcentajeTodo);
  if (contadorEnCursoDsk)
    renderizarContadores(contadorEnCursoDsk, porcentajeInProgress);
  if (contadorHechoDsk) renderizarContadores(contadorHechoDsk, porcentajeDone);

  if (contadorPorHacerMob)
    renderizarContadores(contadorPorHacerMob, porcentajeTodo);
  if (contadorEnCursoMob)
    renderizarContadores(contadorEnCursoMob, porcentajeInProgress);
  if (contadorHechoMob) renderizarContadores(contadorHechoMob, porcentajeDone);
};

export const renderizarTablero = (tareas, filtro = false) => {
  if (!filtro) actualizarContadores(tareas);
  

  const columnaTodoDsk = document.querySelector("#todoDsk");
  const columnaInProgressDsk = document.querySelector("#inprogressDsk");
  const columnaDoneDsk = document.querySelector("#doneDsk");

  const columnaTodoMob = document.querySelector("#todoMob");
  const columnaInProgressMob = document.querySelector("#inprogressMob");
  const columnaDoneMob = document.querySelector("#doneMob");

  if (columnaTodoDsk) limpiarNodo(columnaTodoDsk);
  if (columnaInProgressDsk) limpiarNodo(columnaInProgressDsk);
  if (columnaDoneDsk) limpiarNodo(columnaDoneDsk);

  if (columnaTodoMob) limpiarNodo(columnaTodoMob);
  if (columnaInProgressMob) limpiarNodo(columnaInProgressMob);
  if (columnaDoneMob) limpiarNodo(columnaDoneMob);

  tareas.forEach((tarea) => {
    const tarjeta = crearTarea(tarea);
    const tarjetaMovil = tarjeta.cloneNode(true);

    if (tarea.estado === "porHacer" && columnaTodoDsk) {
      columnaTodoDsk.appendChild(tarjeta);
      columnaTodoMob.appendChild(tarjetaMovil);
    } else if (tarea.estado === "enCurso" && columnaInProgressDsk) {
      columnaInProgressDsk.appendChild(tarjeta);
      columnaInProgressMob.appendChild(tarjetaMovil);
    } else if (tarea.estado === "hecho" && columnaDoneDsk) {
      columnaDoneDsk.appendChild(tarjeta);
      columnaDoneMob.appendChild(tarjetaMovil);
    }
  });
};
