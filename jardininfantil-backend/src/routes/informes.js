const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController');

// Rutas para informes diarios
router.get('/alumno/:id_alumno/fecha/:fecha', informeController.getInformeByAlumnoAndFecha);
router.post('/', informeController.upsertInforme);

module.exports = router;
