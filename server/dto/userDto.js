module.exports = class userDto {

    constructor({nombre, nick, rol, contrasenia, email, telefono}) {

        this._id = contrasenia;
        this.nombre = nombre;
        this.Nick = nick;
        this.rol = rol;
        this.contrasenia = contrasenia;
        this.email = email;
        this.telefono = String(telefono);

    }

    templateDefaultError(err) {
        return {
            status: 400,
            msg: err
        }
    }

    templateUserIdAlreadyExists(code) {
        return {
            status: 409,
            msg: `Ya hay un usuario existente con el codigo ${code}`
        }
    }

    templateUnauthorized(query) {
        return {
            status: 401,
            msg: query
        }
    }

    templateSuccesfullUserCreation(arg) {
        return {
            status: 201,
            msg: arg
        }
    }

    formatDataToBackend() {

        return {
            _id : this._id,
            Nombre : this.nombre,
            Nick : this.Nick,
            rol : this.rol,
            contrasenia : this.contrasenia,
            email : this.email,
            telefono : this.telefono
        }

    }
    
}