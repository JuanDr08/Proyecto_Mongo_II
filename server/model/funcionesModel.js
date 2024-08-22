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
     * * API para listar los asientos disponibles para cierta funcion
     * TODO: listar los asientos disponibles en una funcion especifica
     * ? "66a807cca5aad36c22a20ca3" arg
     * 
     * @param {String} arg - Codigo de la funcion la cual se desea verificar la disponibilidad
     * @returns {Object} {mensaje, ?data}
     */
    async allSeatsDisponibilityInAFunction(arg) {

        try {
            
            this.setCollection = "funcion"
            let funcion = await this.collection.findOne({ _id : arg})
            return funcion;   

        } catch (error) {
            return {Error: 'El id de la funcion que ha ingresado no existe', status: "404"}
        }

    }

}