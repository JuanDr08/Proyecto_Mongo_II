const { validationResult } = require('express-validator');
const Cartelera = require('../model/funcionesModel.cjs')
const ticketsDto = require('../dto/ticketsDto.cjs')
const Entries = require('../model/ticketsModel.cjs')
const Sala = require('../model/salaModel.cjs');
const Users = require('../model/usersModel.cjs')

exports.buyTickets = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const carteleraModel = new Cartelera();
    const DTO = new ticketsDto();
    const ticketsModel = new Entries();

    let idTicket = DTO.formatFromStringToObjectId(req.params.id)
    let ticketInfo = await ticketsModel.findTicektById(idTicket)
    let ticketSeats = ticketInfo ? ticketInfo.asientos : DTO.templateNotExistingTicket(idTicket)
    if(ticketSeats.status == 404) return res.status(ticketSeats.status).json(ticketSeats)

    let updateTicket = await ticketsModel.editTicketInfoToBuyTheTicket(idTicket, {estado: 'comprada', fechaCompra: new Date(), total: req.body.total})
    console.log(updateTicket)
    let succesfull = updateTicket ? DTO.templateSuccesfullTicketBought(updateTicket) : DTO.templateDefaultError(updateTicket)

    if(succesfull.status == 500) return res.status(succesfull.status).json(succesfull)

    let idFuncion = ticketInfo.id_funcion
    for(let seat of ticketSeats) {
        
        await carteleraModel.buyASeat(idFuncion, seat)

    }

    return res.status(succesfull.status).json(succesfull)

}