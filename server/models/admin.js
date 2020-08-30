const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tipoValues = {
    values: ['gerente', 'caja'],
    message: '{VALUE} no es un tipo de administrador válido'
}

const administradorSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
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

administradorSchema.plugin(uniqueValidator, { message: 'El teléfono ya existe' })

module.exports = model('Admin', administradorSchema)
