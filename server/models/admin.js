const { Schema, model } = require('mongoose')

const tipoValues = {
    values: ['gerente', 'caja'],
    message: '{VALUE} no es un tipo de administrador válido'
}

const administradorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatoria']
    },
    tipo: {
        type: String,
        enum: tipoValues,
        required: [true, 'El tipo de usuario es obligatorio']
    },
    numeroTelefono: {
        type: String
    }
})

