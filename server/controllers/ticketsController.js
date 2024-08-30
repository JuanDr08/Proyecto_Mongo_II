const { validationResult } = require('express-validator');
const Cartelera = require('../model/funcionesModel')
const ticketsDto = require('../dto/ticketsDto')
const Entries = require('../model/ticketsModel')
const Sala = require('../model/salaModel');
const Users = require('../model/usersModel')

exports.buyTickets = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const carteleraModel = new Cartelera();
    const DTO = new ticketsDto();
    const ticketsModel = new Entries();
    const salaModel = new Sala();
    const userModel = new Users();
    

    data = DTO.formatTicketUserData(req.body);
    let functionExists = await carteleraModel.findFunctionById(data.id_funcion);
    if(!functionExists){
        let response = DTO.templateForAnUnexistingFunction(data.id_funcion)
        return res.status(response.status).json(response);
    }
    data.id_sala = functionExists.id_sala;

    let seatsDisponibility = await carteleraModel.seatsDisponibility(functionExists, data);
    if (!seatsDisponibility.length){
        let response = DTO.templateForNotSeatDisponibility(data.asiento)
        return res.status(response.status).json(response)
    } 
    
    data.subTotal = 14000;
    let total = data.subTotal;

    let room = await salaModel.findOneRoomById(data);
    if(data.asiento.toUpperCase().includes(room.filaVip)) total += total * 0.97;

    let isUserVip = await userModel.cardDisponibilityInUser(process.env.PASSWORD);
    if(isUserVip) total = total * 0.80;

    data.total = total
    data.cedula_user = Number(process.env.PASSWORD);

    carteleraModel.buyASeat(data)
    let createTicket = await ticketsModel.buyEntriesToAFunction(data)
    let succesfull = createTicket.code == 121 ? DTO.templateForAFaildeSchemaValidation(createTicket) : DTO.templateSuccesfullTicketBought(data)

    return res.status(succesfull.status).json(succesfull)

}