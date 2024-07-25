import { MongoClient } from "mongodb";

export class Connection {

    static instance

    constructor(){

        if(typeof Connection.instance === 'object') {
            return Connection.instance;
        }

        this.host = process.env.HOST;
        this.user = process.env.MONGOUSER;
        this.pass = process.env.PASSWORD;
        this.cluster = process.env.CLUSTER;
        this.port = process.env.PORT;
    
        this.#connect();
        this.db = this.conexion.db(process.env.DB_NAME)

        Connection.instance = this;

        return this;

    }

    async #connect () {
        this.conexion = new MongoClient(`${this.host}${this.user}:${this.pass}@${this.cluster}:${this.port}/cineCampus`);
        await this.conexion.connect();
    }

    set setCollection(name) {

        this.collection = this.db.collection(name);
        return this.collection;

    }

}