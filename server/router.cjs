const router = require('express').Router();
const {
    listAllMovies,
    getMovieByID,
    createUser,
    getUserDetails,
    emptyBodyForGetRequestsValidation,
    objectIdValidator,
    validatePatchUserInfo,
    existingRoleValidation,
    createValidUserData,
    searchValidUserIdParam,
    infoPurchaseTicketValidator,
    bodyCorrectSeatCodeFormat,
    updateUserRoles,
    getAllUsersDetails,
    buyTickets,
    showSeatsDisponibilityFromAFunction,
    reserveOneSeat,
    cancelBookedSeat,
    showFunctionsOfAnEspecificMovie,
    findRoomById
} = require('./index.cjs')



router.get("/movies", emptyBodyForGetRequestsValidation() ,listAllMovies) // Listar todas las peliculas
router.get("/movies/:id", objectIdValidator(), getMovieByID) // Listar una pelicula segun su id
router.get("/movie/:id/functions", objectIdValidator(), showFunctionsOfAnEspecificMovie)

router.post("/user", createValidUserData(), createUser) // Crear Usuarios
router.get("/user/:id", searchValidUserIdParam(), getUserDetails) // Obtener detalles de un usuario especifico
router.patch("/user/:id", validatePatchUserInfo(), updateUserRoles) // Actualizar los roles de un usuario
router.get("/users/:rol", existingRoleValidation(), getAllUsersDetails) // Obtener todos los usuarios que tienen un rol especifico
router.get("/users", emptyBodyForGetRequestsValidation(), getAllUsersDetails) // Obtener todos los usuarios existentes

router.post("/entries", infoPurchaseTicketValidator(), buyTickets)
router.get("/room/:id", objectIdValidator(), findRoomById)

router.get("/movies/:id/seats", [ emptyBodyForGetRequestsValidation(), objectIdValidator() ], showSeatsDisponibilityFromAFunction)
router.post("/movies/:id/seats", [objectIdValidator(), bodyCorrectSeatCodeFormat()], reserveOneSeat)
router.patch("/movies/:id/seats", [objectIdValidator(), bodyCorrectSeatCodeFormat()], cancelBookedSeat)

module.exports = router