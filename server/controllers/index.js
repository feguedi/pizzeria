const { pick, reject } = require('underscore')
const { compare, hash } = require('bcrypt')
const { sign, verify } = require('jsonwebtoken')
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
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.nuevoIngrediente = async nombre => {
    try {
        const ingrediente = new Ingrediente({ nombre })
        const bdResponse = await ingrediente.save()
        bdResponse = pick(bdResponse, ['nombre', 'disponibilidad'])
        return { ok: true, message: 'Ingrediente agregado', ingrediente: bdResponse }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.entrarUsuario = async (telefono, contrasena) => {
    try {
        const usuario = await Usuario.findOne({ telefono })
        if (await !compare(contrasena, usuario.contrasena)) {
            return { ok: false, message: 'Credenciales incorrectas', status: 400 }
        }

        const data = pick(usuario, ['_id', 'nombre', 'telefono', 'domicilios', 'pedidosAnteriores'])
        const token = sign({ usuario: data }, process.env.SECRET_KEY, { expiresIn: '7d' })

        return { ok: true, token, usuario: data }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.obtenerInfoUsuario = async token => {
    try {
        const tokenVerificado = await verify(token, process.env.SECRET_KEY)
        let usuario = await Usuario.findById(tokenVerificado._id)
        usuario = pick(usuario, ['_id', 'nombre', 'telefono', 'domicilios', 'pedidosAnteriores'])
        usuario['pedidosAnteriores'] = usuario['pedidosAnteriores'].map(pedido => pick(pedido, ['_id', 'pizzas', 'fecha']))
        usuario['domicilios'] = usuario['domicilios'].map(domicilio => pick(domicilio, ['_id', 'calle', 'numero', 'numeroInterior', 'colonia', 'codigoPostal']))

        return { ok: true, usuario }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.nuevoUsuario = async (telefono, contrasena, domicilio) => {
    try {
        contrasena = await hash(contrasena, 10)
        const usuarioNuevo = new Usuario({ telefono, contrasena, domicilio })
        const bdResponse = await usuarioNuevo.save()
        return { ok: true, message: 'Usuario creado', token: crearToken(bdResponse) }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.actualizarContrasena = async (token, contrasena) => {
    try {
        const tokenVerificado = await auth(token)
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.actualizarDatosUsuario = async (token, datos) => {
    try {
        const tokenVerificado = await auth(token)
        let domicilios = []
        const { nombre, contrasena } = datos
        datos['domicilios'].forEach(domicilio => domicilios.push(domicilio))

    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.nuevoPedido = async ({  }) => {
    
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

exports.actualizarPromocion = async (id, { nombre, precio, oferton }) => {
    try {
        let promocionActualizada = await Promocion.findByIdAndUpdate(id, { nombre, precio, oferton }, { new: true })
        promocionActualizada = pick(promocionActualizada, ['_id', 'nombre', 'precio', 'oferton'])
        promocionActualizada['oferton'] = promocionActualizada['oferton'].map(oferton => pick(oferton, ['especialidad', 'cantidad']))

        return { ok: true, promocion: promocionActualizada, message: 'Se actualizó la promoción' }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.obtenerPromociones = async () => {
    try {
        let promociones = await Promocion.find()
        if (promociones.length === 0) return { ok: false, message: 'No hay promociones', status: 404 }
        promociones = promociones.map(promocion => pick(promocion, ['_id','nombre','precio','oferton']))
        return { ok: true, promociones }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.obtenerPromocion = async idPromocion => {
    try {
        let promocion = await Promocion.findById(idPromocion)
        promocion = pick(promocion, ['nombre', 'precio', 'oferton'])
        return { ok: true, promocion }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

const crearToken = data => sign({
    usuario: pick(data, ['_id', 'nombre', 'telefono', 'domicilios', 'pedidosAnteriores'])
}, process.env.SECRET_KEY, {
    expiresIn: '7d'
})

const auth = bearerToken => new Promise((resolve, reject) => {
    if (bearerToken.includes('Bearer')) {
        try {
            const token = bearerToken.split(' ')[1]
            return resolve(token)
        } catch (error) {
            return reject({ message: `No es un encabezado válido. ${ JSON.stringify(error) }` })
        }
    }
}).catch(asdf => {
    return { message: 'No es un encabezado válido'}
})
