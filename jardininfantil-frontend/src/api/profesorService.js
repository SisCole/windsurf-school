import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicio para profesores
export const profesorService = {
  // Obtener todos los profesores
  getAll: async () => {
    const response = await api.get('/profesores');
    return response.data;
  },

  // Obtener un profesor por ID
  getById: async (id) => {
    const response = await api.get(`/profesores/${id}`);
    return response.data;
  },

  // Crear un nuevo profesor
  create: async (profesor) => {
    const response = await api.post('/profesores', profesor);
    return response.data;
  },

  // Actualizar un profesor
  update: async (id, profesor) => {
    const response = await api.put(`/profesores/${id}`, profesor);
    return response.data;
  },

  // Eliminar un profesor
  delete: async (id) => {
    const response = await api.delete(`/profesores/${id}`);
    return response.data;
  },
};
