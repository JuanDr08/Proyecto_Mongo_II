import { ObjectId } from "mongodb";
import { Query } from "./query.js";

export class Users extends Query {

    static instance

    constructor() {

        if (Users.instance === "object") return Users.instance

        super()

        Users.instance = this

        return this
        
    }

    async createNewUser(arg) {

        try {
            
            this.setCollection = "usuario"
            arg._id = arg.contrasenia
            arg.telefono = String(arg.telefono)
            let insercion = await this.collection.insertOne(arg)
            let query = await this.db.command({
                createUser: arg.Nick,
                pwd: String(arg.contrasenia),
                roles: [
                    { role: "UsuarioEstandar", db: process.env.DB_NAME }
                ]
            })

            return {CreacionExitosa: "Usuario creado con rol estandar", usuario: query, cliente: insercion}

        } catch (error) {
            return error.errorResponse
        }

    }

}