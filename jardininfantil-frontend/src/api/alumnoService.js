import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicio para alumnos
export const alumnoService = {
  // Obtener todos los alumnos
  getAll: async () => {
    const response = await api.get('/alumnos');
    return response.data;
  },

  // Obtener un alumno por ID
  getById: async (id) => {
    const response = await api.get(`/alumnos/${id}`);
    return response.data;
  },

  // Crear un nuevo alumno
  create: async (alumno) => {
    const response = await api.post('/alumnos', alumno);
    return response.data;
  },

  // Actualizar un alumno
  update: async (id, alumno) => {
    const response = await api.put(`/alumnos/${id}`, alumno);
    return response.data;
  },

  // Eliminar un alumno
  delete: async (id) => {
    const response = await api.delete(`/alumnos/${id}`);
    return response.data;
  },
};

export default api;
