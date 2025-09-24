const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

// Rutas para asistencia
router.get('/aula/:id_aula/fecha/:fecha', asistenciaController.getAsistenciaByAulaAndFecha);
router.post('/', asistenciaController.upsertAsistencia);

module.exports = router;
