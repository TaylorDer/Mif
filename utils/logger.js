// Утилита для логирования

const logLevels = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG'
};

function formatLog(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        level,
        message,
        ...(data && { data })
    };
    
    return JSON.stringify(logEntry);
}

const logger = {
    info: (message, data) => {
        console.log(formatLog(logLevels.INFO, message, data));
    },
    
    warn: (message, data) => {
        console.warn(formatLog(logLevels.WARN, message, data));
    },
    
    error: (message, error) => {
        console.error(formatLog(logLevels.ERROR, message, {
            error: error?.message,
            stack: error?.stack
        }));
    },
    
    debug: (message, data) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(formatLog(logLevels.DEBUG, message, data));
        }
    }
};

module.exports = logger;

