const { body, query, param } = require('express-validator');

exports.infoPurchaseTicketValidator = () => {

    return [
        body('total').isNumeric().withMessage('El total debe ser numerico')
    ]

}