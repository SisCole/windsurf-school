// Servicio para tutores
export const tutorService = {
  // Obtener todos los tutores
  getAll: async () => {
    const response = await api.get('/tutores');
    return response.data;
  },

  // Obtener un tutor por ID
  getById: async (id) => {
    const response = await api.get(`/tutores/${id}`);
    return response.data;
  },

  // Crear un nuevo tutor
  create: async (tutor) => {
    const response = await api.post('/tutores', tutor);
    return response.data;
  },

  // Actualizar un tutor
  update: async (id, tutor) => {
    const response = await api.put(`/tutores/${id}`, tutor);
    return response.data;
  },

  // Eliminar un tutor
  delete: async (id) => {
    const response = await api.delete(`/tutores/${id}`);
    return response.data;
  },
};
