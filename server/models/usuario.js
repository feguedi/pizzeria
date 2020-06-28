const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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
        required: [true, 'El nombre es obligatorio']
    },
    telefono: {
        type: Number,
        required: [true, 'El teléfono es obligatorio'],
        unique: true
    },
    contrasena : {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    domicilios: [{
        calle: {
            type: String,
            required: [true, 'La calle es obligatoria']
        },
        numero: {
            type: String,
            required: [true, 'El número es obligatorio']
        },
        numeroInterior: String,
        colonia: {
            type: String,
            required: [true, 'La colonia es obligatoria']
        },
        codigoPostal: {
            type: String,
            required: [true, 'El código postal es obligatorio']
        },
        municipio: String,
        estado: String,
        coordenadas: {
            latitud: {
                type: Number,
                required: [true, 'La latitud es obligatoria']
            },
            longitud: {
                type: Number,
                required: [true, 'La longitud es obligatoria']
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
}, {
    timestamps: true
})

usuarioSchema.plugin(uniqueValidator, { message: 'El teléfono ya existe' })

module.exports = model('Usuario', usuarioSchema)
