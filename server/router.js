const router = require('express').Router();
const path = require('path');
const {
    listAllMovies,
    getMovieByID,
    createUser,
    emptyBodyForGetRequestsValidation,
    objectIdValidator,
    createValidUserData
} = require('./index')



router.get("/movies", emptyBodyForGetRequestsValidation() ,listAllMovies) // Listar todas las peliculas
router.get("/movies/:id", objectIdValidator(), getMovieByID) // Listar una pelicula segun su id

router.post("/user", createValidUserData(), createUser)

module.exports = router