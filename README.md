# Mif Auto - Backend API

Backend сервер для сайта автосервиса Mif Auto.

## Технологии

- **Node.js** - среда выполнения
- **Express.js** - веб-фреймворк
- **Nodemailer** - отправка email
- **CORS** - поддержка кросс-доменных запросов

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

3. Настройте переменные окружения в файле `.env`

## Запуск

### Режим разработки (с автоперезагрузкой):
```bash
npm run dev
```

### Продакшн режим:
```bash
npm start
```

Сервер запустится на порту, указанном в `PORT` (по умолчанию 3000).

## API Endpoints

### Health Check
- `GET /api/health` - Проверка работоспособности API

### Контакты
- `POST /api/contact` - Отправка формы обратной связи
- `GET /api/contact` - Получение всех сообщений
- `GET /api/contact/:id` - Получение конкретного сообщения

### Услуги
- `GET /api/services` - Получение списка всех услуг
- `GET /api/services/:id` - Получение конкретной услуги

### Записи
- `POST /api/appointments` - Создание новой записи
- `GET /api/appointments` - Получение всех записей
- `GET /api/appointments/:id` - Получение конкретной записи
- `PUT /api/appointments/:id` - Обновление записи
- `DELETE /api/appointments/:id` - Удаление записи

## Примеры запросов

### Отправка формы обратной связи
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "Иван Иванов",
  "phone": "+79991234567",
  "email": "ivan@example.com",
  "message": "Хочу записаться на диагностику"
}
```

### Создание записи
```bash
POST /api/appointments
Content-Type: application/json

{
  "name": "Иван Иванов",
  "phone": "+79991234567",
  "email": "ivan@example.com",
  "serviceId": 1,
  "date": "2025-01-20",
  "time": "14:00",
  "message": "Нужна диагностика двигателя"
}
```

## Структура проекта

```
backend/
├── server.js              # Главный файл сервера
├── routes/                # Маршруты API
│   ├── contact.js
│   ├── services.js
│   └── appointments.js
├── controllers/           # Контроллеры
│   ├── contactController.js
│   ├── servicesController.js
│   └── appointmentsController.js
├── models/                # Модели данных
│   ├── Contact.js
│   ├── Service.js
│   └── Appointment.js
├── services/              # Сервисы
│   └── emailService.js
├── .env.example           # Пример переменных окружения
├── .gitignore
├── package.json
└── README.md
```

## Примечания

- В текущей версии данные хранятся в памяти (при перезапуске сервера данные теряются)
- Для продакшена рекомендуется подключить базу данных (MongoDB, PostgreSQL и т.д.)
- Email сервис требует настройки SMTP в `.env` файле
- Для разработки можно использовать тестовый SMTP сервер

## Дальнейшее развитие

- [x] Валидация данных
- [x] Логирование
- [x] Rate limiting
- [x] Централизованная конфигурация
- [ ] Подключение базы данных
- [ ] Аутентификация и авторизация
- [ ] Тестирование (Jest)
- [ ] Документация API (Swagger)
