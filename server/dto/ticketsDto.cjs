const {ObjectId} = require('mongodb')

module.exports = class ticketsDto {

    templateForAnUnexistingFunction(arg) {
        return {
            status: 404,
            message: `Function with id ${arg} not found`
        }
    }

    templateForNotSeatDisponibility(arg) {
        return {
            status: 404,
            message: `Asiento ${arg} no se encuentra disponible para compra`
        }
    }

    templateSuccesfullTicketBought(arg) {
        return {
            status: 201,
            message: 'Ticket comprado exitosamente',
            data: arg
        }
    }

    templateForAFaildeSchemaValidation(arg) {
        return {
            status: 400,
            message: 'Error de validación en los datos del ticket',
            errors: arg
        }
    }

    formatTicketUserData(arg) {
        return {
            id_funcion: ObjectId.createFromHexString(arg.id_funcion),
            asiento: arg.asiento,
            fechaCompra: new Date(arg.fechaCompra)
        }
    }

}