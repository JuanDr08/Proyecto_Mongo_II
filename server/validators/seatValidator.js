const { body, param, query } = require('express-validator')

exports.bodyCorrectSeatCodeFormat = () => {
    return body('seatCode').matches(/^[A-Z](?:[1-9]|1[0-9]|20)$/).withMessage("Formato incorrecto, debe seguir la estructura A-Z 1-9")
}