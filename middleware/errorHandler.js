// Middleware для обработки ошибок

const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
    // Логируем ошибку
    logger.error('Unhandled error', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        ip: req.ip
    });

    // Определяем статус код
    const statusCode = err.statusCode || err.status || 500;

    // Формируем ответ
    const response = {
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            details: err
        })
    };

    res.status(statusCode).json(response);
}

module.exports = errorHandler;

