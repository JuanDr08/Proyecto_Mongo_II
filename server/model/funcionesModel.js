const {ObjectId} = require('mongodb');
const Connection = require('../database');

module.exports = class Cartelera extends Connection {

    static instance;

    constructor() {

        if (Cartelera.instance === 'object') return Cartelera.instance;
        super();
        Cartelera.instance = this;
        return this;

    }

    async findFunctionById(arg) {

        this.setCollection = "funcion"
        let funcion = await this.collection.findOne({_id : arg})
        
        return funcion;
    }

    async seatsDisponibility(funcion, arg) {

        let {asientos} = funcion;
        let disponible = asientos.filter(obj => obj.codigo == arg.asiento.toUpperCase() && obj.estado == "disponible")
        return disponible;

    }

}