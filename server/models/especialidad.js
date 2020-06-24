const { Schema, model } = require('mongoose')

const especialidadSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    ingredientes: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingrediente'
    }],
    disponibilidad: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Especialidad', especialidadSchema)
