const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');

// POST /api/appointments - Создание новой записи
router.post('/', appointmentsController.createAppointment);

// GET /api/appointments - Получение всех записей (для админки)
router.get('/', appointmentsController.getAllAppointments);

// GET /api/appointments/:id - Получение конкретной записи
router.get('/:id', appointmentsController.getAppointmentById);

// PUT /api/appointments/:id - Обновление записи
router.put('/:id', appointmentsController.updateAppointment);

// DELETE /api/appointments/:id - Удаление записи
router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;

