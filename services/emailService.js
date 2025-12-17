const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../utils/logger');

// Настройка транспорта для отправки email
const createTransporter = () => {
    // Проверяем, включена ли отправка email
    if (!config.email.enabled) {
        logger.debug('Email service is disabled');
        return null;
    }
    
    // Если настроены SMTP настройки, используем их
    if (config.email.smtp.host && config.email.smtp.user) {
        return nodemailer.createTransport({
            host: config.email.smtp.host,
            port: config.email.smtp.port,
            secure: config.email.smtp.secure,
            auth: {
                user: config.email.smtp.user,
                pass: config.email.smtp.pass
            }
        });
    }
    
    // Для разработки можно использовать тестовый аккаунт
    // В продакшене обязательно настройте реальный SMTP
    logger.warn('SMTP configuration is incomplete');
    return null;
};

// Отправка уведомления о новом контакте
const sendContactNotification = async (contact) => {
    const transporter = createTransporter();
    
    if (!transporter) {
        logger.debug('Email service not configured. Contact saved', { contactId: contact.id });
        return;
    }

    try {
        const mailOptions = {
            from: config.email.from || config.email.smtp.user,
            to: config.email.admin || config.email.smtp.user,
            subject: `Новое сообщение от ${contact.name} - Mif Auto`,
            html: `
                <h2>Новое сообщение с сайта Mif Auto</h2>
                <p><strong>Имя:</strong> ${contact.name}</p>
                <p><strong>Телефон:</strong> ${contact.phone}</p>
                ${contact.email ? `<p><strong>Email:</strong> ${contact.email}</p>` : ''}
                ${contact.message ? `<p><strong>Сообщение:</strong><br>${contact.message}</p>` : ''}
                <p><strong>Дата:</strong> ${new Date(contact.createdAt).toLocaleString('ru-RU')}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        logger.info('Contact notification email sent', { contactId: contact.id });
    } catch (error) {
        logger.error('Error sending contact notification', error);
        throw error;
    }
};

// Отправка подтверждения записи
const sendAppointmentConfirmation = async (appointment) => {
    const transporter = createTransporter();
    
    if (!transporter) {
        logger.debug('Email service not configured. Appointment saved', { appointmentId: appointment.id });
        return;
    }

    try {
        // Email клиенту
        if (appointment.email) {
            const clientMailOptions = {
                from: config.email.from || config.email.smtp.user,
                to: appointment.email,
                subject: 'Запись в Mif Auto - получена',
                html: `
                    <h2>Спасибо за запись, ${appointment.name}!</h2>
                    <p>Ваша заявка получена и находится на рассмотрении.</p>
                    <p>Мы свяжемся с вами в ближайшее время для подтверждения записи.</p>
                    <hr>
                    <p><strong>Детали записи:</strong></p>
                    <p>Услуга ID: ${appointment.serviceId}</p>
                    ${appointment.date ? `<p>Предпочтительная дата: ${appointment.date}</p>` : ''}
                    ${appointment.time ? `<p>Предпочтительное время: ${appointment.time}</p>` : ''}
                    <p>Статус: Ожидает подтверждения</p>
                `
            };

            await transporter.sendMail(clientMailOptions);
        }

        // Email администратору
        const adminMailOptions = {
            from: config.email.from || config.email.smtp.user,
            to: config.email.admin || config.email.smtp.user,
            subject: `Новая запись от ${appointment.name} - Mif Auto`,
            html: `
                <h2>Новая запись на обслуживание</h2>
                <p><strong>Имя:</strong> ${appointment.name}</p>
                <p><strong>Телефон:</strong> ${appointment.phone}</p>
                ${appointment.email ? `<p><strong>Email:</strong> ${appointment.email}</p>` : ''}
                <p><strong>Услуга ID:</strong> ${appointment.serviceId}</p>
                ${appointment.date ? `<p><strong>Дата:</strong> ${appointment.date}</p>` : ''}
                ${appointment.time ? `<p><strong>Время:</strong> ${appointment.time}</p>` : ''}
                ${appointment.message ? `<p><strong>Сообщение:</strong><br>${appointment.message}</p>` : ''}
                <p><strong>Дата создания:</strong> ${new Date(appointment.createdAt).toLocaleString('ru-RU')}</p>
            `
        };

        await transporter.sendMail(adminMailOptions);
        logger.info('Appointment confirmation emails sent', { appointmentId: appointment.id });
    } catch (error) {
        logger.error('Error sending appointment confirmation', error);
        throw error;
    }
};

module.exports = {
    sendContactNotification,
    sendAppointmentConfirmation
};

