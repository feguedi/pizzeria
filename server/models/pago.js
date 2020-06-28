const { Schema, model } = require('mongoose')

const pagoSchema = new Schema({
    pedido: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Pedido'
    }
}, {
    timestamps: true
})

module.exports = model('Pago', pagoSchema)
