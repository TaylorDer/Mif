const nodemailer = require('nodemailer');

// Настройка транспорта для отправки email
// В реальном приложении настройки будут браться из переменных окружения
const createTransporter = () => {
    // Если настроены SMTP настройки, используем их
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }
    
    // Для разработки можно использовать тестовый аккаунт
    // В продакшене обязательно настройте реальный SMTP
    return null;
};

// Отправка уведомления о новом контакте
const sendContactNotification = async (contact) => {
    const transporter = createTransporter();
    
    if (!transporter) {
        console.log('Email service not configured. Contact saved:', contact);
        return;
    }

    try {
        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
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
        console.log('Contact notification email sent');
    } catch (error) {
        console.error('Error sending contact notification:', error);
        throw error;
    }
};

// Отправка подтверждения записи
const sendAppointmentConfirmation = async (appointment) => {
    const transporter = createTransporter();
    
    if (!transporter) {
        console.log('Email service not configured. Appointment saved:', appointment);
        return;
    }

    try {
        // Email клиенту
        if (appointment.email) {
            const clientMailOptions = {
                from: process.env.SMTP_FROM || process.env.SMTP_USER,
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
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
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
        console.log('Appointment confirmation emails sent');
    } catch (error) {
        console.error('Error sending appointment confirmation:', error);
        throw error;
    }
};

module.exports = {
    sendContactNotification,
    sendAppointmentConfirmation
};

