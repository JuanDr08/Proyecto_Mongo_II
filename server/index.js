const {
    listAllMovies,
    getMovieByID
} = require('./controllers/moviesController');
const Entries = require('./controllers/boletosYAsientos');
const Users = require('./controllers/usuarios');
const {
    emptyBodyForGetRequestsValidation,
    objectIdValidator
} = require('./validators/generalValidators')

module.exports = {
    listAllMovies,
    getMovieByID,
    Entries,
    Users,
    emptyBodyForGetRequestsValidation,
    objectIdValidator
}