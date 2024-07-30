import { Connection } from "../../helpers/db/connection.js";

export class Query extends Connection {

    static instance

    constructor() {

        if (Query.instance === "object") {

            return Query.instance

        }
        super()

        Query.instance = this
        return this;

    }

    async findOne(id) {

        return await this.collection.findOne({ _id: id });

    }

    async findAll() {

        return await this.collection.find({}).toArray()

    }

}