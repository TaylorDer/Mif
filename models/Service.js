// Модель услуг
// В реальном приложении данные будут браться из БД

const services = [
    {
        id: 1,
        name: 'Диагностика',
        icon: '🔧',
        description: 'Компьютерная диагностика всех систем автомобиля с использованием современного оборудования',
        price: 1500,
        priceUnit: 'от',
        category: 'diagnostics'
    },
    {
        id: 2,
        name: 'Техобслуживание',
        icon: '⚙️',
        description: 'Регулярное ТО с заменой масла, фильтров и всех расходных материалов',
        price: 3000,
        priceUnit: 'от',
        category: 'maintenance'
    },
    {
        id: 3,
        name: 'Шиномонтаж',
        icon: '🛞',
        description: 'Профессиональный шиномонтаж, балансировка и хранение резины',
        price: 800,
        priceUnit: 'от',
        category: 'tires'
    },
    {
        id: 4,
        name: 'Покраска',
        icon: '🎨',
        description: 'Качественная покраска кузова с гарантией и использованием оригинальных материалов',
        price: 5000,
        priceUnit: 'от',
        category: 'painting'
    },
    {
        id: 5,
        name: 'Электрика',
        icon: '🔋',
        description: 'Ремонт и диагностика электрооборудования, установка дополнительного оборудования',
        price: 2000,
        priceUnit: 'от',
        category: 'electrical'
    },
    {
        id: 6,
        name: 'Тюнинг',
        icon: '💨',
        description: 'Чип-тюнинг, установка спойлеров, обвесов и других элементов тюнинга',
        price: 10000,
        priceUnit: 'от',
        category: 'tuning'
    }
];

class Service {
    static async findAll() {
        return services;
    }

    static async findById(id) {
        return services.find(s => s.id === parseInt(id));
    }

    static async findByCategory(category) {
        return services.filter(s => s.category === category);
    }
}

module.exports = Service;

