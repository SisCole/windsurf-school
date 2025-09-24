import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicio para aulas
export const aulaService = {
  // Obtener todas las aulas
  getAll: async () => {
    const response = await api.get('/aulas');
    return response.data;
  },

  // Obtener un aula por ID
  getById: async (id) => {
    const response = await api.get(`/aulas/${id}`);
    return response.data;
  },

  // Crear una nueva aula
  create: async (aula) => {
    const response = await api.post('/aulas', aula);
    return response.data;
  },

  // Actualizar un aula
  update: async (id, aula) => {
    const response = await api.put(`/aulas/${id}`, aula);
    return response.data;
  },

  // Eliminar un aula
  delete: async (id) => {
    const response = await api.delete(`/aulas/${id}`);
    return response.data;
  },
};
