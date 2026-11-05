import { guardarStorage, obtenerStorage } from './local-storage.js';

export const CLAVE_USUARIOS = 'sazon_usuarios';

export const usuariosBase = [
  {
    id: 1,
    nombre: 'Carlos Restrepo',
    email: 'admin@nutresa.com',
    password: 'admin2026',
    rol: 'administrador',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    estado: 'activo'
  },
  {
    id: 2,
    nombre: 'Laura Gómez',
    email: 'laura.admin@nutresa.com',
    password: 'admin2026',
    rol: 'administrador',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    estado: 'activo'
  },
  {
    id: 3,
    nombre: 'Mariana Morales',
    email: 'mariana@nutresa.com',
    password: 'sazon2026',
    rol: 'creador de contenido',
    avatar: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    estado: 'activo'
  },
  {
    id: 4,
    nombre: 'Alejandro Vélez',
    email: 'alejo.cocina@nutresa.com',
    password: 'sazon2026',
    rol: 'creador de contenido',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    estado: 'activo'
  },
  {
    id: 5,
    nombre: 'Camila Duarte',
    email: 'camila.recetas@nutresa.com',
    password: 'sazon2026',
    rol: 'creador de contenido',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    estado: 'activo'
  }
];

export function inicializarUsuarios() {
  const usuariosExistentes = obtenerStorage(CLAVE_USUARIOS);
  if (!usuariosExistentes || !Array.isArray(usuariosExistentes) || usuariosExistentes.length === 0) {
    guardarStorage(CLAVE_USUARIOS, usuariosBase);
    return usuariosBase;
  }
  return usuariosExistentes;
}

export function obtenerUsuarios() {
  const usuarios = obtenerStorage(CLAVE_USUARIOS);
  return Array.isArray(usuarios) ? usuarios : inicializarUsuarios();
}

export function buscarUsuarioPorEmail(email) {
  const usuarios = obtenerUsuarios();
  return usuarios.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
}

export function registrarNuevoUsuario(usuario) {
  const usuarios = obtenerUsuarios();
  const idNuevo = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
  const nuevo = {
    id: idNuevo,
    nombre: usuario.nombre.trim(),
    email: usuario.email.toLowerCase().trim(),
    password: usuario.password,
    rol: 'creador de contenido',
    avatar: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    estado: 'activo',
    fechaRegistro: new Date().toISOString()
  };

  usuarios.push(nuevo);
  guardarStorage(CLAVE_USUARIOS, usuarios);
  return nuevo;
}

if (typeof window !== 'undefined') {
  window.usuariosBase = usuariosBase;
  window.inicializarUsuarios = inicializarUsuarios;
  window.obtenerUsuarios = obtenerUsuarios;
  window.buscarUsuarioPorEmail = buscarUsuarioPorEmail;
  window.registrarNuevoUsuario = registrarNuevoUsuario;
}

if (typeof localStorage !== 'undefined') {
  inicializarUsuarios();
}
