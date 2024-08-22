// Database
const Connection = require('./database');

// Controllers
const {
    listAllMovies,
    getMovieByID
} = require('./controllers/moviesController');
const {
    createUser,
    getUserDetails,
    updateUserRoles,
    getAllUsersDetails
} = require('./controllers/usersController')
const {
    buyTickets
} = require('./controllers/ticketsController');

// Models
const Entries = require('./model/ticketsModel');
const Users = require('./model/usersModel');
const Movies = require('./model/moviesModel')

// DTO's
const moviesDTO = require('./dto/moviesDto')
const userDto = require('./dto/userDto')

// Validators
const {
    emptyBodyForGetRequestsValidation,
    objectIdValidator
} = require('./validators/generalValidators')
const {
    createValidUserData,
    searchValidUserIdParam,
    validatePatchUserInfo,
    existingRoleValidation
} = require('./validators/usersValidator')
const {
    infoPurchaseTicketValidator
} = require('./validators/ticketValidator')

// Exports
module.exports = {
    Connection, // Database conection
    // controllers
    listAllMovies,
    getMovieByID,
    createUser,
    getUserDetails,
    updateUserRoles,
    getAllUsersDetails,
    buyTickets,
    // models
    Entries,
    Users,
    Movies,
    // DTO's
    userDto,
    moviesDTO,
    // validators
    emptyBodyForGetRequestsValidation,
    objectIdValidator,
    createValidUserData,
    searchValidUserIdParam,
    validatePatchUserInfo,
    existingRoleValidation,
    infoPurchaseTicketValidator
}