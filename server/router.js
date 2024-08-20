const router = require('express').Router();
const path = require('path');
const {
    listAllMovies,
    getMovieByID,
    createUser,
    getUserDetails,
    emptyBodyForGetRequestsValidation,
    objectIdValidator,
    createValidUserData,
    searchValidUserIdParam
} = require('./index')



router.get("/movies", emptyBodyForGetRequestsValidation() ,listAllMovies) // Listar todas las peliculas
router.get("/movies/:id", objectIdValidator(), getMovieByID) // Listar una pelicula segun su id

router.post("/user", createValidUserData(), createUser)
router.get("/user/:id", searchValidUserIdParam(), getUserDetails)

module.exports = router