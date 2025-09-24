// Servicio para informes diarios
export const informeService = {
  // Obtener informe de un alumno en una fecha específica
  getByAlumnoAndFecha: async (idAlumno, fecha) => {
    const response = await api.get(`/informes/alumno/${idAlumno}/fecha/${fecha}`);
    return response.data;
  },

  // Crear o actualizar informe diario
  upsert: async (informeData) => {
    const response = await api.post('/informes', informeData);
    return response.data;
  },
};
