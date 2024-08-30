const router = require('express').Router();
const path = require('path');
const {
    listAllMovies,
    getMovieByID,
    emptyBodyForGetRequestsValidation,
    objectIdValidator
} = require('./index')



router.get("/movies", emptyBodyForGetRequestsValidation() ,listAllMovies) // Listar todas las peliculas
router.get("/movies/:id", objectIdValidator(), getMovieByID) // Listar una pelicula segun su id


module.exports = router