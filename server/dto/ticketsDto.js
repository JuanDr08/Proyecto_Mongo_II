const {ObjectId} = require('mongodb')

module.exports = class ticketsDto {

    templateForAnUnexistingFunction(arg) {
        return {
            status: 404,
            message: `Function with id ${arg} not found`
        }
    }

    formatFunctionToHexString(arg) {
        return ObjectId.createFromHexString(arg)
    }

}