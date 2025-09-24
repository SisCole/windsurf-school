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
