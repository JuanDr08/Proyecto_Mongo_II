const { ObjectId } = require('mongodb');
const {Connection} = require('../index');

module.exports = class Users extends Connection {

    static instance

    constructor() {
        super()
    }

    static get getInstance() {

        if (Users.instance === "object") return Users.instance

        Users.instance = new Users();
        return this;

    }

    /**
     * * API para crear usuarios tanto a nivel de coleccion como de sistema
     * TODO: permitir la creacion de usuarios a nivel de coleccion y Base de datos
     * ? {Nombre: "Juan David", Nick: "JDRO", contrasenia: 1021513601, email: "prueba@gmail.com", telefono: 3222352673}
     * @param {String} Nombre - Nombre del usuario a crear
     * @param {String} Nick - Nombre distintivo del usuario
     * @param {string} rol - rol que tendrá el usuario
     * @param {Int} contrasenia - Contraseña del usuario
     * @param {String} email - Correo del usuario
     * @param {Int} telefono - Telefoo del usuario
     * @returns {Object} - {mensaje, ?data}
     */
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
                    { role: arg.rol, db: process.env.DB_NAME }
                ]
            })

            return {CreacionExitosa: "Usuario creado con rol especificado", usuario: query, cliente: insercion}

        } catch (error) {
            if (error.code == 13 || error.code == 121 || error.code == 11000) return error.errorResponse
            return error
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
            let user = await this.collection.findOne({_id : arg})
            if (!user) throw {Error: 'El usuario que ha ingresado no existe', status: "404"}
            let {users: [rol]} = await this.db.command({
                usersInfo: {
                    user: user.Nick,
                    db: process.env.DB_NAME
                }
            })

            return {Usuario: user, roles: rol.roles}

        } catch (error) {
            if (error.code == 13 || error.code == 121) return error.errorResponse
            return error
        }

    }

    /**
     * * API para actualizar el rol de un usuario, ya sea de vip a estandar o de estandar a vip
     * TODO: Actualizar el rol de un usuario existente
     * ? {cedula: 1021513601, tarjeta: true}
     * 
     * @param {Int} cedula - Codigo identificador o cedula del usuario al que se le desea modificar el rol 
     * @param {Boolean} tarjeta - Indicador del tipo de modificacion que se desea hacer, Vip-Estadar o Estandar-Vip
     * @returns {Object} - {mensaje, ?data}
     */
    async updateUserRole(arg) {
        try {
            this.setCollection = "usuario"
            let validateUser = await this.collection.findOne({_id: arg.cedula})
            if(!validateUser) throw {Error: 'El usuario que ha ingresado no existe', status: "404"}
            
            if(arg.tarjeta) {
                await this.collection.updateOne({_id: arg.cedula}, {$set: {tarjeta: {fechaVencimiento: new Date(), estado: "activa"} }})

                let query = await this.db.command({
                    grantRolesToUser: validateUser.Nick,
                    roles: [{ role: "UsuarioVip", db: process.env.DB_NAME }]
                })
                await this.db.command({
                    revokeRolesFromUser: validateUser.Nick,
                    roles: [{ role: "UsuarioEstandar", db: process.env.DB_NAME }]
                })
                return {ActualizaciónExitosa: "Rol del usuario actualizado", usuario: query}
            }

            await this.collection.updateOne({_id: arg.cedula}, {$set: {tarjeta: {estado: "inactiva"} }})
            let query = await this.db.command({
                grantRolesToUser: validateUser.Nick,
                roles: [{ role: "UsuarioEstandar", db: process.env.DB_NAME }]
            })
            await this.db.command({
                revokeRolesFromUser: validateUser.Nick,
                roles: [{ role: "UsuarioVip", db: process.env.DB_NAME }]
            })
            return {ActualizaciónExitosa: "Rol del usuario actualizado", usuario: query}

        } catch (error) {
            if (error.code == 13 || error.code == 121) return error.errorResponse
            return error
        }
    }

    /**
     * * API que permite listar los usuarios existentes del sistema y permite aplicar filtros por roles
     * TODO: listar a los usuarios del sistema y permitir la aplicacion de filtros
     * ? "vip" | "estandar" | "admin" | ""
     * @param {String} arg - String que debe indicar el filtro que se desea hacer, los posibles son (VIP, ESTANDAR O ADMIN)
     * @returns {Object} - {mensaje, ?data}
     */
    async showAllUsers(arg = "") {
        try {

            this.setCollection = "usuario"
            
            if (arg.toUpperCase() == "VIP") {
                let {users} = await this.db.command({
                    usersInfo: 1
                })
                let vips = users.filter(usr => {
                    let {roles} = usr
                    for(let role of roles){
                        if(role.role == "UsuarioVip") {
                            return role
                        }
                    }
                })
                return vips
            } else if(arg.toUpperCase() == "ESTANDAR") {
                let {users} = await this.db.command({
                    usersInfo: 1
                })
                let estandars = users.filter(usr => {
                    let {roles} = usr
                    for(let role of roles){
                        if(role.role == "UsuarioEstandar") {
                            return role
                        }
                    }
                })
                return estandars
            } else if(arg.toUpperCase() == "ADMIN") {
                let {users} = await this.db.command({
                    usersInfo: 1
                })
                let admins = users.filter(usr => {
                    let {roles} = usr
                    for(let role of roles){
                        if(role.role == "Admin") {
                            return role
                        }
                    }
                })
                return admins
            }else {
                let {users} = await this.db.command({
                    usersInfo: 1
                })
                return users
            }

        } catch (error) {
            if (error.code == 13 || error.code == 121) return error.errorResponse
            return error
        }
    }

}