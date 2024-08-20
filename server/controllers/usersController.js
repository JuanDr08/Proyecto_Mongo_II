const { validationResult } = require('express-validator');
const {Users, userDto} = require('../index')

exports.createUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const DTO = new userDto(req.body);
    const userModel = new Users();

}