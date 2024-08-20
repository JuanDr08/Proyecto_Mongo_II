const { ObjectId } = require('mongodb');
const {Connection} = require("../index");

module.exports = class Entries extends Connection {

    static instance

    constructor() {
        super()
    }

    static get getInstance() {

        if (Entries.instance === "object") return Entries.instance
        Entries.instance = new Entries();
        return this;
    }

    /**
     * * API para permitir la compra de boletas
     * TODO: Se realiza el registro del boleto en la base de datos
     * ? {id_funcion: "66a807cca5aad36c22a20ca3", "A1", fechaCompra: new Date()} arg
     * 
     * @param {Object} arg - Objeto que contiene los datos necesarios de la boleta
     * @returns {Object} {mensaje, ?data}
     */
    async buyEntriesToAFunction(arg) {

        try {
            

            this.setCollection = "funcion"
            let funcion = await this.collection.findOne({_id : ObjectId.createFromHexString(arg.id_funcion)})
            if(!funcion) throw {Error: "La funcion ingresada no existe", status: "404"}
            arg.id_sala = funcion.id_sala;

            let {asientos} = funcion
            let disponible = asientos.filter(obj => obj.codigo == arg.asiento.toUpperCase() && obj.estado == "disponible")
            if (!disponible.length) throw {Error: 'El asiento ingresado ya esta reservado o no existe', status: "409 ", asientosSala: asientos}
            
            arg.subTotal = 14000
            let total = arg.subTotal

            this.collection.updateOne({_id: ObjectId.createFromHexString(arg.id_funcion), "asientos.codigo": arg.asiento.toUpperCase()}, {$set: {"asientos.$.estado": "comprada"}})

            this.setCollection = "sala"
            let sala = await this.collection.findOne({ _id : arg.id_sala})
            if (arg.asiento.toUpperCase().includes(sala.filaVip)) total += total * 0.97;

            this.setCollection = "usuario"
            let validCard = await this.collection.findOne({_id: Number(process.env.PASSWORD), tarjeta: {$exists: true}, "tarjeta.estado": "activa"})
            if (validCard) total = total * 0.80
            
            arg.Total = total
            arg.cedula_user = Number(process.env.PASSWORD)
            arg.id_funcion = ObjectId.createFromHexString(arg.id_funcion)
            this.setCollection = "boleto"
            let query = await this.collection.insertOne(arg)

            return query

        } catch (error) {

            return error
            
        }

    }

    /**
     * * API para listar los asientos disponibles para cierta funcion
     * TODO: listar los asientos disponibles en una funcion especifica
     * ? "66a807cca5aad36c22a20ca3" arg
     * 
     * @param {String} arg - Codigo de la funcion la cual se desea verificar la disponibilidad
     * @returns {Object} {mensaje, ?data}
     */
    async seatsDisponibility(arg) {

        try {
            
            this.setCollection = "funcion"
            let funcion = await this.collection.findOne({ _id : ObjectId.createFromHexString(arg)})
            let {asientos} = funcion;

            return asientos

        } catch (error) {
            return {Error: 'El id de la funcion que ha ingresado no existe', status: "404"}
        }

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
            let funcion = await this.collection.findOne({_id : ObjectId.createFromHexString(arg.funcion_id)})
            if (!funcion) throw {Error: 'El id de la funcion ingresada no existe', status: "404"}
            
            let {asientos} = funcion;
            let disponibilidad = asientos.filter(seat => seat.codigo == arg.seatCode.toUpperCase())
            if (!disponibilidad.length) throw {Error: 'El asiento que desea reservar no existe', status: "404", asientos: asientos}
            let [{estado}] = disponibilidad;
            if (estado != "disponible") throw {Error: 'El asiento que desea reservar no esta disponible actualmente, escoja otro', status: "409", asientos: asientos}

            let query = await this.collection.updateOne({_id: ObjectId.createFromHexString(arg.funcion_id), "asientos.codigo": arg.seatCode.toUpperCase()}, {$set: {"asientos.$.estado": "reservada"}})
            return query
            
        } catch (error) {
            return error
        }

    }

    /**
     * * API para cancelar reservas de asientos
     * TODO: permitir la cancelacion de asientos reservados
     * ? {uncion_id: "66a807cca5aad36c22a20ca3", seatCode: "A2"}
     * 
     * @param {Object} arg - Objeto contiene los datos requeridos para cancelar una reserva
     * @returns {Object} {mensaje, ?data}
     */
    async cancelBooking (arg) {

        try {
            
            this.setCollection = "funcion"
            let funcion = await this.collection.findOne({ _id : ObjectId.createFromHexString(arg.funcion_id) })
            if (!funcion) throw {Error: 'El id de la funcion ingresada no existe', status: "404"}

            let {asientos} = funcion;
            let existe = asientos.filter(obj => obj.codigo == arg.seatCode.toUpperCase());
            if (!existe.length) throw {Error: 'El asiento ingresado no existe', status: "404 ", asientosSala: asientos};
            let [{estado}] = existe;
            if (estado != "reservada") throw {Error: 'El asiento existe, pero su estado no esta reservado, por lo que no hay nada que cancelar', status: 400, asientos: asientos}

            let query = await this.collection.updateOne({_id: ObjectId.createFromHexString(arg.funcion_id), "asientos.codigo": arg.seatCode.toUpperCase()}, {$set: {"asientos.$.estado": "disponible"}})

            return query

        } catch (error) {
            return error
        }

    }

}