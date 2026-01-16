class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return this.model.create(data);
    }

    async destroy(id) {
        return this.model.findByIdAndDelete(id);
    }

    async get(id) {
        return this.model.findById(id);
    }

    async getAll() {
        return this.model.find({});
    }

    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }
}

module.exports = CrudRepository;
