const { ObjectId } = require('mongodb');

module.exports = class FuncionesDto {

    templateExistingFunction({asientos} = {asientos}) {
        return {
            status: 200,
            msg: asientos
        }
    }

    templateNonExistingFunction(arg){
        return {
            status: 404,
            msg: `La funcion de id: ${arg} no se encuetra disponible`
        }
    }

    formatFunctionIdToHexString(arg) {
        return ObjectId.createFromHexString(arg)
    }

}