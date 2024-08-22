const { validationResult } = require('express-validator');
const Cartelera = require('../model/funcionesModel')
const ticketsDto = require('../dto/ticketsDto')
const Entries = require('../model/ticketsModel')

exports.buyTickets = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: errors.array()});

    const carteleraModel = new Cartelera();
    const DTO = new ticketsDto();
    const ticketsModel = new Entries();
    let data = req.body
    console.log(data)

    req.body.id_funcion = DTO.formatFunctionToHexString(req.body.id_funcion);
    let functionExists = await carteleraModel.findFunctionById(req.body.id_funcion);
    if(!functionExists) res.status(404).json({status: 404, msg: `Funcion con id ${req.body.id_funcion} no existe`});
    data.id_sala = functionExists.id_sala;
    console.log(data)

    let seatsDisponibility = carteleraModel.seatsDisponibility(functionExists, req.body);
    if (!seatsDisponibility.length) res.status(409).json({status: 409, msg: `El asiento ${req.body.asiento} no se encuentra disponible`})

}