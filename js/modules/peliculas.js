import { Query } from "./query.js";

export class Movies extends Query {

    static instance

    constructor() {

        if (Movies.instance === "object") return Movies.instance

        super()

        Movies.instance = this

        return this
        
    }

    /**
     * * API para listar las peliculas disponibles
     * TODO: Se listan las peliculas en cartelera para la fecha actual
     * 
     * @returns {object} {?data}
     */
    async showAllCurrentMovies() {

        this.setCollection = "pelicula"
        let query = await this.collection.find({estado: "en cartelera"}).toArray()
        return query

    }

}