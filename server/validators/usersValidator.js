const { body, query, param } = require('express-validator');

exports.createValidUserData = () => {

    return [
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('nick').notEmpty().withMessage('El nick es obligatorio'),
        body('rol', 'El r ol no se envio').exists().notEmpty().custom((value) => {
            if (value && !['UsuarioEstandar', 'UsuarioVip', 'Admin'].includes(value)) throw new Error("Solo hay tres roles definidos 'UsuarioEstandar', 'UsuarioVip', 'Admin'")
            return true
        }),
        body('contrasenia').notEmpty().withMessage('La contraseña es obligatoria'),
        body('email').isEmail().withMessage('El email no es valido'),
        body('telefono').isNumeric().withMessage('El telefono debe ser un numero')
    ]

}

exports.searchValidUserIdParam = () => {

    return [
        param('id').isInt().withMessage("Debe filtrar unicamente por enteros")
    ]

}