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

    async seatDisponibility(funcion, arg) {

        let {asientos} = funcion;
        let disponible = asientos.filter(obj => obj.codigo == arg.asiento.toUpperCase() && obj.estado == "disponible")
        return disponible;

    }

    async buyASeat (arg) {

        this.setCollection = "funcion"
        this.collection.updateOne({_id: arg.id_funcion, "asientos.codigo": arg.asiento.toUpperCase()}, {$set: {"asientos.$.estado": "comprada"}})

    }

    /**
     * * API para realizar reservas de asientos existentes y disponibles
     * TODO: permitir la reserva de asientos que se encuentren disponibles en una funcion especifica
     * ? {funcion_id: "66a807cca5aad36c22a20ca3", seatCode: "A1"}
     * 
     * @param {Object} arg - Objeto que contiene los datos necesarios para realizar la reserva de un asiento
     * @returns {Object} {mensaje, ?data}
     */
    async reserveSeats(arg) {

        try {
            
            this.setCollection = "funcion"
            let query = await this.collection.updateOne({_id: arg.funcion_id, "asientos.codigo": arg.seatCode}, {$set: {"asientos.$.estado": "reservada"}})
            return query
            
        } catch (error) {
            return error
        }

    }

}