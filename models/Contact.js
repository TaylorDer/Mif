// Модель для хранения контактов
// В реальном приложении здесь будет работа с БД (MongoDB, PostgreSQL и т.д.)
// Сейчас используется простое хранение в памяти

let contacts = [];
let nextId = 1;

class Contact {
    constructor(data) {
        this.id = nextId++;
        this.name = data.name;
        this.phone = data.phone;
        this.email = data.email || '';
        this.message = data.message || '';
        this.createdAt = data.createdAt || new Date();
        this.read = false;
    }

    async save() {
        contacts.push(this);
        return this;
    }

    static async findAll() {
        return contacts;
    }

    static async findById(id) {
        return contacts.find(c => c.id === parseInt(id));
    }

    static async delete(id) {
        const index = contacts.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            contacts.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = Contact;

