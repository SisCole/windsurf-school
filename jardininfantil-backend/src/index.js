const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const alumnosRoutes = require('./routes/alumnos');
const aulasRoutes = require('./routes/aulas');
const tutoresRoutes = require('./routes/tutores');
const profesoresRoutes = require('./routes/profesores');
const asistenciaRoutes = require('./routes/asistencia');
const informesRoutes = require('./routes/informes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/aulas', aulasRoutes);
app.use('/api/tutores', tutoresRoutes);
app.use('/api/profesores', profesoresRoutes);
app.use('/api/asistencia', asistenciaRoutes);
app.use('/api/informes', informesRoutes);

// Ruta de salud para verificar que el servidor esté funcionando
app.get('/api/health', (req, res) => {
    res.json({
        message: 'JardinInfantilPRO API funcionando correctamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error global:', err.stack);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: `La ruta ${req.originalUrl} no existe`
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📚 API disponible en http://localhost:${PORT}/api`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
