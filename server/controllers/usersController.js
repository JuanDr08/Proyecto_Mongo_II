const { validationResult } = require('express-validator');
const Users = require('../model/usersModel')
const userDto = require('../dto/userDto')

exports.createUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    
    const DTO = new userDto(req.body);
    const userModel = new Users();
    let data = DTO.formatDataToBackend();

    let query = await userModel.createNewUser(data)
    let modelResponse = (query.length) ? DTO.templateSuccesfullUserCreation(query) : query.code == 13 ? DTO.templateUnauthorized(query.errorResponse) : query.code == 11000 ? DTO.templateUserIdAlreadyExists(data._id) : DTO.templateDefaultError(query)

    res.status(modelResponse.status).json(modelResponse)

}

exports.getUserDetails = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const DTO = new userDto({});
    const userModel = new Users();

    let userExists = await userModel.findUserById(req.params.id)
    if(!userExists) return res.status(404).json(DTO.templateUserNotFound(req.params.id))
    
    let data = await userModel.getUserDetails(userExists)
    let modelResponse = data.code == 13 ? DTO.templateUnauthorized(data.errorResponse) : (data) ? DTO.templateUserFound({Usuario: userExists, roles: data.roles}) : DTO.templateDefaultError(data)

    res.status(modelResponse.status).json(modelResponse)

}