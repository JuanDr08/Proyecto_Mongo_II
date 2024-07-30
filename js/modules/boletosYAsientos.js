import { ObjectId } from "mongodb";
import { Query } from "./query.js";
import { Vip } from "./tarjetaVIP.js";

export class Entries extends Query {

    static instance

    constructor() {

        if (Entries.instance === "object") return Entries.instance

        super()

        Entries.instance = this

        return this
        
    }

    /**
     * * API para permitir la compra de boletas
     * TODO: Se realiza el registro del boleto en la base de datos
     * ? {cedula_user: 1234567890, id_funcion: "66a807cca5aad36c22a20ca3", "A1", fechaCompra: new Date()} arg
     * 
     * @param {Object} arg - Objeto que contiene los datos necesarios de la boleta
     * @returns {Object} {mensaje, ?data}
     */
    async buyEntriesToAFunction(arg) {

        try {
            
            this.setCollection = "usuario"
            if (!( await this.findOne(arg.cedula_user))) throw {Error: "La cedula del usuario es incorrecta o inexistente", status: "401"}

            this.setCollection = "funcion"
            let funcion = await this.findOne(ObjectId.createFromHexString(arg.id_funcion))
            if(!funcion) throw {Error: "La funcion ingresada no existe", status: "404"}
            arg.id_sala = funcion.id_sala;

            let {asientos} = funcion
            let disponible = asientos.filter(obj => obj.codigo == arg.asiento && obj.estado == "disponible")
            if (!disponible.length) throw {Error: 'El asiento ingresado ya esta reservado o no existe', status: "409 ", asientosSala: asientos}
            
            arg.subTotal = 14000
            let total = arg.subTotal

            this.collection.updateOne({_id: ObjectId.createFromHexString(arg.id_funcion), "asientos.codigo": arg.asiento}, {$set: {"asientos.$.estado": "comprada"}})

            this.setCollection = "sala"
            let sala = await this.findOne(arg.id_sala)
            if (arg.asiento.includes(sala.filaVip)) total += total * 0.97;
            if (Vip.validateCard(arg.cedula_user)) total = total * 0.80;
            
            arg.Total = total
            
            this.setCollection = "boleto"
            let query = await this.collection.insertOne(arg)

            return query

        } catch (error) {

            return error
            
        }

    }

}