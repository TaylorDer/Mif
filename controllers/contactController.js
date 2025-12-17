const Contact = require('../models/Contact');
const emailService = require('../services/emailService');
const logger = require('../utils/logger');
const { sanitizeString, formatPhone } = require('../utils/helpers');

// Отправка формы обратной связи
const submitContact = async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        // Валидация
        if (!name || !phone) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Имя и телефон обязательны для заполнения'
            });
        }

        // Создание записи с санитизацией данных
        const contact = new Contact({
            name: sanitizeString(name),
            phone: formatPhone(phone),
            email: email ? sanitizeString(email) : '',
            message: message ? sanitizeString(message) : '',
            createdAt: new Date()
        });

        // Сохранение (в реальном приложении здесь будет запись в БД)
        const savedContact = await contact.save();

        // Отправка email (опционально)
        try {
            await emailService.sendContactNotification(savedContact);
            logger.info('Contact notification email sent', { contactId: savedContact.id });
        } catch (emailError) {
            logger.error('Email sending failed', emailError);
            // Не прерываем процесс, если email не отправился
        }

        res.status(201).json({
            success: true,
            message: 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.',
            data: {
                id: savedContact.id,
                name: savedContact.name
            }
        });
    } catch (error) {
        logger.error('Contact submission error', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Произошла ошибка при отправке сообщения. Попробуйте позже.'
        });
    }
};

// Получение всех сообщений
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        logger.error('Get contacts error', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Ошибка при получении сообщений'
        });
    }
};

// Получение конкретного сообщения
const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Сообщение не найдено'
            });
        }

        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        logger.error('Get contact error', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Ошибка при получении сообщения'
        });
    }
};

module.exports = {
    submitContact,
    getAllContacts,
    getContactById
};

