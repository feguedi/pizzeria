const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ingredienteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        maxlength: 40
    },
    disponibilidad: {
        type: Boolean,
        default: true,
        required: true
    }
})

ingredienteSchema.plugin(uniqueValidator, 'Ya existe ese ingrediente')

module.exports = model('Ingrediente', ingredienteSchema)
