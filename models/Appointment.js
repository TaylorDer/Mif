// Модель для записей на обслуживание

let appointments = [];
let nextId = 1;

class Appointment {
    constructor(data) {
        this.id = nextId++;
        this.name = data.name;
        this.phone = data.phone;
        this.email = data.email || '';
        this.serviceId = data.serviceId;
        this.date = data.date || '';
        this.time = data.time || '';
        this.message = data.message || '';
        this.status = data.status || 'pending'; // pending, confirmed, completed, cancelled
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = new Date();
    }

    async save() {
        appointments.push(this);
        return this;
    }

    static async findAll() {
        return appointments;
    }

    static async findById(id) {
        return appointments.find(a => a.id === parseInt(id));
    }

    static async update(id, updates) {
        const appointment = appointments.find(a => a.id === parseInt(id));
        if (appointment) {
            Object.assign(appointment, updates);
            appointment.updatedAt = new Date();
            return appointment;
        }
        return null;
    }

    static async delete(id) {
        const index = appointments.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            appointments.splice(index, 1);
            return true;
        }
        return false;
    }

    static async findByStatus(status) {
        return appointments.filter(a => a.status === status);
    }
}

module.exports = Appointment;

