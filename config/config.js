// Конфигурация приложения

module.exports = {
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development'
    },
    
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true
    },
    
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 минут
        maxRequests: process.env.RATE_LIMIT_MAX || 100
    },
    
    email: {
        enabled: process.env.EMAIL_ENABLED === 'true',
        smtp: {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        from: process.env.SMTP_FROM,
        admin: process.env.ADMIN_EMAIL
    },
    
    validation: {
        minNameLength: 2,
        maxNameLength: 100,
        phoneRegex: /^[\+]?[0-9\s\-\(\)]{10,}$/,
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
};

