import { Query } from "./query";

export class Vip extends Query {

    static instance

    constructor() {

        if (Vip.instance === "object") return Vip.instance

        super()

        Vip.instance = this

        return this
        
    }

}