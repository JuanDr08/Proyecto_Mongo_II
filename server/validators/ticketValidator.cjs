const { body, query, param } = require('express-validator');

exports.infoPurchaseTicketValidator = () => {

    return [
        body('id_funcion').isMongoId().withMessage('El id de la funcion no coincide con un id de mongo'),
        body('asiento').matches(/^[A-Z](?:[1-9]|1[0-9]|20)$/).withMessage("Formato incorrecto, debe seguir la estructura A-Z 1-9"),
        body('fechaCompra').isDate().withMessage("Debe ingresar el formato de fecha correcto")
    ]

}