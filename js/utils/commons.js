export function formatearFechaAnnoMesDia(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anno = fecha.getFullYear();
    return `${anno}-${mes}-${dia}`;
}

export const formatearFechaDiaMesAnno = (fechaStr) => {
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  
  const fecha = new Date(fechaStr + "T00:00:00");
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anno = fecha.getFullYear();
  
  return `${dia} de ${mes} de ${anno}`;
};

export const limpiarNodo = (nodo) => {
  while (nodo.firstChild) {
    nodo.removeChild(nodo.firstChild);
  }
};

export const obtenerIdUrl = () => {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get("id");
};