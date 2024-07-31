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

    /**
     * * API para listar la informacion de un usuario incluyendo su tarjta VIP si existe y su rol
     * TODO: Listar los detalles de un usuario especifico, incluyendo roles y estado de tarjeta
     * ? 987654321 
     * 
     * @param {Int} arg - Cedula que identifica al id del usuario que se desea consultar
     * @returns {Object} {mensaje, ?data}
     */
    async getUserDetails(arg) {

        try {
            
            this.setCollection = "usuario"
            let user = await this.findOne(arg)
            if (!user) throw {Error: 'El usuario que ha ingresado no existe', status: "404"}
            let {users: [rol]} = await this.db.command({
                usersInfo: {
                    user: user.Nick,
                    db: process.env.DB_NAME
                }
            })

            return {Usuario: user, roles: rol.roles}

        } catch (error) {
            return error
        }

    }

}