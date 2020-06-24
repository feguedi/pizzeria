const { Schema, model } = require('mongoose')

const promocionSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    oferton: [{
        elementos: [{
            especialidad: {
                required: true,
                type: Schema.Types.ObjectId,
                ref: 'Especialidad'
            },
            cantidad: {
                type: Number,
                required: true,
                default: 2
            }
        }]
    }]
})

module.exports = model('Promocion', promocionSchema)
