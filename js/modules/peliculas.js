import { Query } from "./query";

export class Movies extends Query {

    static instance

    constructor() {

        if (Movies.instance === "object") return Movies.instance

        super()

        Movies.instance = this

        return this
        
    }

}