const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

// GET /api/services - Получение списка всех услуг
router.get('/', servicesController.getAllServices);

// GET /api/services/:id - Получение конкретной услуги
router.get('/:id', servicesController.getServiceById);

module.exports = router;

