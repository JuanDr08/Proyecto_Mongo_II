import { Query } from "./query";

export class Entries extends Query {

    static instance

    constructor() {

        if (Entries.instance === "object") return Entries.instance

        super()

        Entries.instance = this

        return this
        
    }

}