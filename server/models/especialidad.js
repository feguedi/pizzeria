const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const especialidadSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    ingredientes: [{
        nombre: {
            type: String,
            required: [true, 'Se requiere el nombre del ingrediente']
        },
        id:{
            required: [true, 'Se requiere el id del ingrediente'],
            type: Schema.Types.ObjectId,
            ref: 'Ingrediente'
        }
    }],
    disponibilidad: {
        type: Boolean,
        default: true
    }
})

especialidadSchema.plugin(uniqueValidator, 'Ya existe esa especialidad')

module.exports = model('Especialidad', especialidadSchema)
