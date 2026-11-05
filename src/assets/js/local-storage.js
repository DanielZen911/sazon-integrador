export function guardarStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

export function obtenerStorage(clave) {
  const item = localStorage.getItem(clave);
  return item ? JSON.parse(item) : null;
}

export function eliminarStorage(clave) {
  localStorage.removeItem(clave);
}
