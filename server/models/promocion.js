const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tamanoValues = {
    values: ['grande', 'mega', 'enorme', 'inconmensurable', 'inmenso', 'gigante', 'ultra'],
    message: '{VALUE} no es un tamaño válido'
}

const promocionSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    dia:{
        type: String,
        required: [true, 'Se necesita especificar el día'],
        unique: true
    },
    observacion: String,
    precio: {
        type: Number,
        required: true
    },
    especialidades: [{
        idEspecialidad: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Especialidad'
        },
        tamano: {
            type: String,
            enum: tamanoValues
        },
        cantidad: {
            type: Number,
            required: true,
            default: 2
        }
    }],
}, {
    timestamps: true
})

promocionSchema.plugin(uniqueValidator, { message: 'Ya hay oferta para el día' })

module.exports = model('Promocion', promocionSchema)
