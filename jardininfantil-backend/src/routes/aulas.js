const express = require('express');
const router = express.Router();
const aulaController = require('../controllers/aulaController');

// Rutas CRUD para aulas
router.get('/', aulaController.getAllAulas);
router.get('/:id', aulaController.getAulaById);
router.post('/', aulaController.createAula);
router.put('/:id', aulaController.updateAula);
router.delete('/:id', aulaController.deleteAula);

module.exports = router;
