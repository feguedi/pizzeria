const { pick } = require('underscore')
const { Schema } = require('mongoose')

const Pedido = require('../models/pedido')
const Especialidad = require('../models/especialidad')
const Ingrediente = require('../models/ingrediente')
const Usuario = require('../models/usuario')
const Promocion = require('../models/promocion')

exports.nuevaEspecialidad = async (nombre, ingredientes) => {
    let ings
    try {
        if (typeof ingredientes === Schema.Types.ObjectId) {
            ings = [ingredientes]
        } else if (Array.isArray(JSON.parse(ingredientes))) {
            ingredientes = JSON.parse(ingredientes)
            let correct = true
            try {
                for (const ingrediente of ingredientes) {
                    const bdResponse = await Ingrediente.count({ _id: ingrediente })
                    correct = bdResponse && correct
                }
                ings = [...ingredientes]
            } catch (error) {
                return { ok: false, message: error.message }
            }
        }

        const especialidad = new Especialidad({ nombre, ingredientes: ings })
        const bdResponse = await especialidad.save()
        bdResponse = pick(bdResponse, ['nombre', 'disponibilidad'])

        return { ok: true, message: 'Registrada nueva especialidad' }
    } catch (error) {
        return { ok: false, message: error.message }
    }
}

exports.nuevoIngrediente = async nombre => {
    try {
        const ingrediente = new Ingrediente({ nombre })
        const bdResponse = await ingrediente.save()
        bdResponse = pick(bdResponse, ['nombre', 'disponibilidad'])
        return { ok: true, message: 'Ingrediente agregado', ingrediente: bdResponse }
    } catch (error) {
        return { ok: false, message: error.message }
    }
}

exports.entrarUsuario = () => {

}

exports.obtenerInfoUsuario = () => {

}

exports.nuevoUsuario = () => {

}

exports.actualizarDatosUsuario = () => {

}

exports.nuevoPedido = () => {

}

exports.actualizarIngrediente = () => {

}

exports.actualizarEspecialidad = () => {

}

exports.actualizarPedido = () => {

}

exports.obtenerPedido = () => {

}

exports.obtenerPedidos = () => {

}

exports.nuevaPromocion = () => {

}

exports.actualizarPromocion = () => {

}

exports.obtenerPromociones = () => {

}

exports.obtenerPromocion = () => {

}
