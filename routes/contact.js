const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContact } = require('../middleware/validator');

// POST /api/contact - Отправка формы обратной связи
router.post('/', validateContact, contactController.submitContact);

// GET /api/contact - Получение всех сообщений (для админки)
router.get('/', contactController.getAllContacts);

// GET /api/contact/:id - Получение конкретного сообщения
router.get('/:id', contactController.getContactById);

module.exports = router;

