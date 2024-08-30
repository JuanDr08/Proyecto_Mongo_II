const Connection = require('../database');

module.exports =  class Vip extends Connection {

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