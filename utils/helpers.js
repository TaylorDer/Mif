// Вспомогательные функции

/**
 * Форматирует телефонный номер
 */
function formatPhone(phone) {
    if (!phone) return '';
    // Удаляем все нецифровые символы кроме +
    const cleaned = phone.replace(/[^\d+]/g, '');
    return cleaned;
}

/**
 * Санитизирует строку от потенциально опасных символов
 */
function sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str.trim().replace(/[<>]/g, '');
}

/**
 * Проверяет, является ли значение валидным ID
 */
function isValidId(id) {
    return id && !isNaN(parseInt(id)) && parseInt(id) > 0;
}

/**
 * Форматирует дату для отображения
 */
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Генерирует случайную строку
 */
function generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

module.exports = {
    formatPhone,
    sanitizeString,
    isValidId,
    formatDate,
    generateRandomString
};

