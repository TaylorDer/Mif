// Middleware для валидации данных

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
    
    // Простая проверка формата телефона
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Неверный формат телефона'
        });
    }
    
    // Проверка email, если указан
    if (req.body.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
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
    
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
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

