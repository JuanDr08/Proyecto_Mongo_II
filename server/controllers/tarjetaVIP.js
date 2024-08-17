const Query = require('./query');

module.exports =  class Vip extends Query {

    static instance

    constructor() {
        super()
    }

    static get getInstance() {

        if (Vip.instance === "object") return Vip.instance;
        Vip.instance = new Vip();
        return this;

    }

}