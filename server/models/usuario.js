const { Schema, model } = require('mongoose')

const parteValues = {
    values: ['completa', 'mitad', 'cuarto'],
    message: '{VALUE} no es una parte válida'
}

const tamanoValues = {
    values: ['grande', 'mega', 'enorme', 'inconmensurable', 'inmenso', 'gigante', 'ultra'],
    message: '{VALUE} no es un tamaño válido'
}

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    domicilios: [{
        calle: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        numeroInterior: String,
        colonia: {
            type: String,
            required: true
        },
        codigoPostal: {
            type: String,
            required: true
        },
        municipio: String,
        estado: String,
        coordenadas: {
            latitud: {
                type: Number,
                required: true
            },
            longitud: {
                type: Number,
                required: true
            }
        }
    }],
    pedidosAnteriores: [{
        pizzas: [{
            tamano: {
                type: String,
                required: true,
                enum: tamanoValues
            },
            distribucion: [{
                parte: { 
                    type:String,
                    required: true,
                    enum: parteValues
                },
                especialidad: {
                    type: Schema.Types.ObjectId,
                    ref: 'Especialidad'
                },
                ingrediente: {
                    type: Schema.Types.ObjectId,
                    ref: 'Ingrediente'
                }
            }]
        }],
        fecha: {
            type: Date,
            required: true
        }
    }]
})

module.exports = model('Usuario', usuarioSchema)
