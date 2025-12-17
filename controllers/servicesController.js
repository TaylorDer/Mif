const Service = require('../models/Service');

// Получение всех услуг
const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Ошибка при получении списка услуг'
        });
    }
};

// Получение конкретной услуги
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Услуга не найдена'
            });
        }

        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error('Get service error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Ошибка при получении услуги'
        });
    }
};

module.exports = {
    getAllServices,
    getServiceById
};

