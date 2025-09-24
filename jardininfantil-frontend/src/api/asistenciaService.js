import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicio para asistencia
export const asistenciaService = {
  // Obtener asistencia de un aula en una fecha específica
  getByAulaAndFecha: async (idAula, fecha) => {
    const response = await api.get(`/asistencia/aula/${idAula}/fecha/${fecha}`);
    return response.data;
  },

  // Registrar o actualizar asistencia
  upsert: async (asistenciaData) => {
    const response = await api.post('/asistencia', asistenciaData);
    return response.data;
  },
};
