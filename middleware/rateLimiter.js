// Middleware для ограничения частоты запросов

const requestCounts = new Map();

// Очистка старых записей каждые 15 минут
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of requestCounts.entries()) {
        if (now - value.resetTime > 15 * 60 * 1000) {
            requestCounts.delete(key);
        }
    }
}, 15 * 60 * 1000);

function rateLimiter(options = {}) {
    const {
        windowMs = 15 * 60 * 1000, // 15 минут
        maxRequests = 100 // максимум запросов
    } = options;

    return (req, res, next) => {
        const key = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        
        if (!requestCounts.has(key)) {
            requestCounts.set(key, {
                count: 1,
                resetTime: now + windowMs
            });
            return next();
        }

        const record = requestCounts.get(key);
        
        // Сброс счетчика, если окно истекло
        if (now > record.resetTime) {
            record.count = 1;
            record.resetTime = now + windowMs;
            return next();
        }

        // Проверка лимита
        if (record.count >= maxRequests) {
            return res.status(429).json({
                error: 'Too Many Requests',
                message: 'Превышен лимит запросов. Попробуйте позже.'
            });
        }

        record.count++;
        next();
    };
}

module.exports = rateLimiter;

