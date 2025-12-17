const Appointment = require('../models/Appointment');
const emailService = require('../services/emailService');
const logger = require('../utils/logger');

// Создание новой записи
const createAppointment = async (req, res) => {
    try {
        const { name, phone, email, serviceId, date, time, message } = req.body;

        // Валидация
        if (!name || !phone || !serviceId) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Имя, телефон и услуга обязательны для заполнения'
            });
        }

        // Создание записи
        const appointment = new Appointment({
            name,
            phone,
            email: email || '',
            serviceId,
            date: date || '',
            time: time || '',
            message: message || '',
            status: 'pending',
            createdAt: new Date()
        });

        const savedAppointment = await appointment.save();

        // Отправка email
        try {
            await emailService.sendAppointmentConfirmation(savedAppointment);
        } catch (emailError) {
            logger.error('Email sending failed', emailError);
        }

        res.status(201).json({
            success: true,
            message: 'Запись успешно создана! Мы свяжемся с вами для подтверждения.',
            data: {
                id: savedAppointment.id,
                name: savedAppointment.name,
                status: savedAppointment.status
            }
        });
    } catch (error) {
        logger.error('Appointment creation error', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Произошла ошибка при создании записи. Попробуйте позже.'
        });
    }
};

// Получение всех записей
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        logger.error('Get appointments error', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Ошибка при получении записей'
        });
    }
};

// Получение конкретной записи
const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Запись не найдена'
            });
        }

        res.json({
            success: true,
            data: appointment
        });
    } catch (error) {
        logger.error('Get appointment error', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Ошибка при получении записи'
        });
    }
};

// Обновление записи
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const appointment = await Appointment.update(id, updates);

        if (!appointment) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Запись не найдена'
            });
        }

        res.json({
            success: true,
            message: 'Запись успешно обновлена',
            data: appointment
        });
    } catch (error) {
        logger.error('Update appointment error', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Ошибка при обновлении записи'
        });
    }
};

// Удаление записи
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Appointment.delete(id);

        if (!deleted) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Запись не найдена'
            });
        }

        res.json({
            success: true,
            message: 'Запись успешно удалена'
        });
    } catch (error) {
        logger.error('Delete appointment error', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Ошибка при удалении записи'
        });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};

