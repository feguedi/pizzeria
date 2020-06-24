const { Schema, model } = require('mongoose')

const parteValues = {
    values: ['completa', 'mitad', 'cuarto'],
    message: '{VALUE} no es una parte válida'
}

const tamanoValues = {
    values: ['grande', 'mega', 'enorme', 'inconmensurable', 'inmenso', 'gigante', 'ultra'],
    message: '{VALUE} no es un tamaño válido'
}

const estadoValues = {
    values: ['en camino', 'preparándose', 'entregado', 'cancelado'],
    message: '{VALUE} no es un estado válido'
}

const pedidoSchema = new Schema({
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
    domicilio: {
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
    },
    hora: {
        type: Date,
        default: Date.now(),
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    promocion: {
        type: Schema.Types.ObjectId,
        ref: 'Promocion'
    },
    estado: {
        type: String,
        required: true,
        enum: estadoValues
    },
    precio: {
        type: Number,
        required: true
    },
    precioTotal: {
        type: Number,
        required: true
    }
})

module.exports = model('Pedido', pedidoSchema)
