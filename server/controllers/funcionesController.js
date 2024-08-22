const { validationResult } = require('express-validator');
const Cartelera = require('../model/funcionesModel')
const FuncionesDto = require('../dto/funcionesDto')

exports.showSeatsDisponibilityFromAFunction = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const DTO = new FuncionesDto();
    const funcionesModel = new Cartelera();

    let idFuncion = DTO.formatFunctionIdToHexString(req.params.id)
    let asientos = await funcionesModel.allSeatsDisponibilityInAFunction(idFuncion)
    let modelResponse = asientos ? DTO.templateExistingFunction(asientos) : DTO.templateNonExistingFunction(idFuncion)

    res.status(modelResponse.status).json(modelResponse)
}