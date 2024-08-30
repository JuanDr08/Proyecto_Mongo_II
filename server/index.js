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

// Models
const Entries = require('./controllers/boletosYAsientos');
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
    // models
    Entries,
    Users,
    moviesDTO,
    Movies,
    // DTO's
    userDto,
    // validators
    emptyBodyForGetRequestsValidation,
    objectIdValidator,
    createValidUserData,
    searchValidUserIdParam,
    validatePatchUserInfo,
    existingRoleValidation
}