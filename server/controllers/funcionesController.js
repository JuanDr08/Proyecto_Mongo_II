const { validationResult } = require('express-validator');
const Cartelera = require('../model/funcionesModel')
const FuncionesDto = require('../dto/funcionesDto')

exports.showSeatsDisponibilityFromAFunction = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const DTO = new FuncionesDto();
    const funcionesModel = new Cartelera();

    let idFuncion = DTO.formatFunctionIdToHexString(req.params.id)
    let asientos = await funcionesModel.findFunctionById(idFuncion)
    let modelResponse = asientos ? DTO.templateExistingFunction(asientos) : DTO.templateNonExistingFunction(idFuncion)

    res.status(modelResponse.status).json(modelResponse)
}

exports.reserveOneSeat = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const DTO = new FuncionesDto();
    const funcionesModel = new Cartelera();
    
    let idFuncion = DTO.formatFunctionIdToHexString(req.params.id)
    let codigoAsiento = req.body.seatCode
    let funcion = await funcionesModel.findFunctionById(idFuncion)
    let functionModelResponse = funcion ? funcion.asientos : DTO.templateNonExistingFunction(idFuncion)

    let disponibilidad = functionModelResponse.filter(seat => seat.codigo == codigoAsiento)
    let dtomsg;
    if (!disponibilidad.length) {
        dtomsg = DTO.templateSeatNotFound(codigoAsiento)
        return res.status(dtomsg.status).json(dtomsg)
    }
    let [{estado}] = disponibilidad;
    if (estado != "disponible") {
        dtomsg = DTO.templateSeatNotAviable(codigoAsiento, disponibilidad)
        return res.status(dtomsg.status).json(dtomsg)
    }

    let modelResponse = await funcionesModel.reserveSeats({funcion_id: idFuncion, seatCode: codigoAsiento})
    let dtoResponse = modelResponse.modifiedCount == 1 ? DTO.templateSuccesfullBooking(modelResponse) : DTO.templateErrorDefautl(modelResponse)

    return res.status(dtoResponse.status).json(dtoResponse)

}

exports.cancelBookedSeat = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const DTO = new FuncionesDto();
    const funcionesModel = new Cartelera();

    let idFuncion = DTO.formatFunctionIdToHexString(req.params.id)
    let codigoAsiento = req.body.seatCode
    let funcion = await funcionesModel.findFunctionById(idFuncion)
    let functionModelResponse = funcion ? funcion.asientos : DTO.templateNonExistingFunction(idFuncion)

    let disponibilidad = functionModelResponse.filter(seat => seat.codigo == codigoAsiento)
    let dtomsg;
    if (!disponibilidad.length) {
        dtomsg = DTO.templateSeatNotFound(codigoAsiento)
        return res.status(dtomsg.status).json(dtomsg)
    }
    let [{estado}] = disponibilidad;
    if (estado != "reservada") {
        dtomsg = DTO.templateSeatNotAviable(codigoAsiento, disponibilidad)
        return res.status(dtomsg.status).json(dtomsg)
    }

    let modelResponse = await funcionesModel.cancelBooking({funcion_id: idFuncion, seatCode: codigoAsiento})
    let dtoResponse = modelResponse.modifiedCount == 1 ? DTO.templateSuccesfullBooking(modelResponse) : DTO.templateErrorDefautl(modelResponse)

    return res.status(dtoResponse.status).json(dtoResponse)

}