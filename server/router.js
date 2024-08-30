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
    updateUserRoles,
    getAllUsersDetails,
    buyTickets,
    showSeatsDisponibilityFromAFunction
} = require('./index')



router.get("/movies", emptyBodyForGetRequestsValidation() ,listAllMovies) // Listar todas las peliculas
router.get("/movies/:id", objectIdValidator(), getMovieByID) // Listar una pelicula segun su id

router.post("/user", createValidUserData(), createUser) // Crear Usuarios
router.get("/user/:id", searchValidUserIdParam(), getUserDetails) // Obtener detalles de un usuario especifico
router.patch("/user/:id", validatePatchUserInfo(), updateUserRoles) // Actualizar los roles de un usuario
router.get("/users/:rol", existingRoleValidation(), getAllUsersDetails) // Obtener todos los usuarios que tienen un rol especifico
router.get("/users", emptyBodyForGetRequestsValidation(), getAllUsersDetails) // Obtener todos los usuarios existentes

router.post("/entries", infoPurchaseTicketValidator(), buyTickets)

router.get("/movies/:id/seats", [ emptyBodyForGetRequestsValidation(), objectIdValidator() ], showSeatsDisponibilityFromAFunction)

module.exports = router