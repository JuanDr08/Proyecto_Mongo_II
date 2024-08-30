const { ObjectId } = require('mongodb');

module.exports = class FuncionesDto {

    templateErrorDefautl(arg) {
        return {
            status: 400,
            msg: arg
        }
    }

    templateSuccesfullBooking(arg) {
        return {
            status: 200,
            msg: arg
        }
    }

    templateSeatNotAviable(code, arg){
        return {
            status: 409,
            msg: `El asiento ${code} no se encuentra disponible`,
            data: arg
        }
    }

    templateSeatNotFound(arg) {
        return {
            status: 404,
            msg: `Asiento con el codigo: ${arg} no existe en la sala ingresada`
        }
    }

    templateExistingFunction({asientos} = {asientos}) {
        return {
            status: 200,
            msg: asientos
        }
    }

    templateNotExistingFunctionsWithMovie() {
        return {
            status: 404,
            msg: `No se encontraron funciones disponibles con ese id de pelicula`
        }
    }

    templateNonExistingFunction(arg){
        return {
            status: 404,
            msg: `La funcion de id: ${arg} no se encuetra disponible`
        }
    }

    formatFunctionIdToHexString(arg) {
        return ObjectId.createFromHexString(arg)
    }

}