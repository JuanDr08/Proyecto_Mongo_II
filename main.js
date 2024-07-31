import * as m from './js/index.js'

/* let hola = new m.Movies();

console.log(await hola.showAllCurrentMovies()) */

/* let pelicula = new m.Movies();

console.log(await pelicula.showMovieDetailsById("66a80379a5aad36c22a20c80")) */

/* let boletos = new m.Entries()


let obj = {
    cedula_user: 1234567890,
    id_funcion: "66a807cca5aad36c22a20ca3",
    asiento: "A1",
    fechaCompra: new Date(),
}

console.log(await boletos.buyEntriesToAFunction(obj)) */
/* 
let boletos = new m.Entries()
console.log(await boletos.seatsDisponibility("66a807cca5aad36c22a20ca3")) */

/* let boletos = new m.Entries()
let obj = {
    funcion_id: "66a807cca5aad36c22a20ca3",
    seatCode: "A1"
}
console.log( await boletos.reserveSeats(obj)) */


/* let boletos = new m.Entries()
let obj = {
    funcion_id: "66a807cca5aad36c22a20ca3",
    seatCode: "A2"
}
console.log(await boletos.cancelBooking(obj)) */

/* let user = new m.Users()
let obj = {
    Nombre: "Juan David",
    Nick: "JDRO",
    contrasenia: 1021513601,
    email: "prueba@gmail.com",
    telefono: 3222352673
}
console.log(await user.createNewUser(obj)) */


/* let user = new m.Users()

console.log(await user.getUserDetails(987654321)) */



/* let user = new m.Users()
let obj = {
    cedula: 1021513601,
    tarjeta: true
}

console.log(await user.updateUserRole(obj)) */

/* let user = new m.Users()

console.log(await user.showAllUsers("vip")) */