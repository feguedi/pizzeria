const { Schema, model } = require('mongoose')

const ingredienteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 40
    },
    disponibilidad: {
        type: Boolean,
        required: true
    }
})

module.exports = model('Ingrediente', ingredienteSchema)
