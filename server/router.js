const router = require('express').Router();
const path = require('path');
const {
    listAllMovies,
    getMovieByID,
    createUser,
    getUserDetails,
    emptyBodyForGetRequestsValidation,
    objectIdValidator,
    validatePatchUserInfo,
    createValidUserData,
    searchValidUserIdParam,
    updateUserRoles
} = require('./index')



router.get("/movies", emptyBodyForGetRequestsValidation() ,listAllMovies) // Listar todas las peliculas
router.get("/movies/:id", objectIdValidator(), getMovieByID) // Listar una pelicula segun su id

router.post("/user", createValidUserData(), createUser)
router.get("/user/:id", searchValidUserIdParam(), getUserDetails)
router.patch("/user/:id", validatePatchUserInfo(), updateUserRoles)

module.exports = router