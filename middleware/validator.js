// Middleware для валидации данных

const config = require('../config/config');

const validateContact = (req, res, next) => {
    const { name, phone } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Имя должно содержать минимум 2 символа'
        });
    }
    
    if (!phone || typeof phone !== 'string') {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Телефон обязателен для заполнения'
        });
    }
    
    // Проверка формата телефона
    if (!config.validation.phoneRegex.test(phone)) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Неверный формат телефона'
        });
    }
    
    // Проверка email, если указан
    if (req.body.email) {
        if (!config.validation.emailRegex.test(req.body.email)) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Неверный формат email'
            });
        }
    }
    
    next();
};

const validateAppointment = (req, res, next) => {
    const { name, phone, serviceId } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim().length < config.validation.minNameLength) {
        return res.status(400).json({
            error: 'Validation Error',
            message: `Имя должно содержать минимум ${config.validation.minNameLength} символа`
        });
    }
    
    if (name.trim().length > config.validation.maxNameLength) {
        return res.status(400).json({
            error: 'Validation Error',
            message: `Имя не должно превышать ${config.validation.maxNameLength} символов`
        });
    }
    
    if (!phone || typeof phone !== 'string') {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Телефон обязателен для заполнения'
        });
    }
    
    if (!config.validation.phoneRegex.test(phone)) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Неверный формат телефона'
        });
    }
    
    if (!serviceId || isNaN(parseInt(serviceId))) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Необходимо указать услугу'
        });
    }
    
    if (req.body.email) {
        if (!config.validation.emailRegex.test(req.body.email)) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Неверный формат email'
            });
        }
    }
    
    next();
};

module.exports = {
    validateContact,
    validateAppointment
};

