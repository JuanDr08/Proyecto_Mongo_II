const Connection = require('../database');

module.exports = class Query extends Connection {

    static instance

    constructor() {
        super()
    }

    static get getInstance() {

        if (Query.instance === "object") return Query.instance;
        Query.instance = new Query();
        return this;

    }

    async findOne(id) {
        try {
            
            return await this.collection.findOne({ _id: id });

        } catch (e) {
            return 0
        }

    }

    async findAll() {

        return await this.collection.find({}).toArray()

    }

}