import { Query } from "./query";

export class Users extends Query {

    static instance

    constructor() {

        if (Users.instance === "object") return Users.instance

        super()

        Users.instance = this

        return this
        
    }

}