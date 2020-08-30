const { pick } = require('underscore')
const { compare, hash } = require('bcrypt')
const { sign, verify } = require('jsonwebtoken')
const { Schema } = require('mongoose')

const Pedido = require('../models/pedido')
const Especialidad = require('../models/especialidad')
const Ingrediente = require('../models/ingrediente')
const Usuario = require('../models/usuario')
const Admin = require('../models/admin')
const Promocion = require('../models/promocion')

exports.nuevaEspecialidad = async (token, { nombre, ingredientes }) => {
    let ings
    try {
        const { admin } = await this.obtenerInfoAdmin(token)
        if (!admin.tipo) {
            return { ok: false, message: 'No cuenta con permisos', status: 403 }
        }
        ingredientes = JSON.parse(ingredientes)
        if (Array.isArray(ingredientes)) {
            ings = ingredientes
        }
        if (typeof ingredientes === Schema.Types.ObjectId) {
            ings = [ingredientes]
        }

        const especialidad = new Especialidad({ nombre, ingredientes: ings })
        let bdResponse = await especialidad.save()
        bdResponse = pick(bdResponse, ['nombre', 'disponibilidad'])

        return { ok: true, message: 'Registrada nueva especialidad', especialidad: bdResponse }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.nuevoIngrediente = async (token, nombre) => {
    try {
        const usuario = await (await this.obtenerInfoUsuario(token)).usuario
        if (!usuario.tipo) {
            return { ok: false, message: 'No cuenta con permisos', status: 403 }
        }
        const ingrediente = new Ingrediente({ nombre })
        let bdResponse = await ingrediente.save()
        bdResponse = pick(bdResponse, ['nombre', 'disponibilidad'])
        return { ok: true, message: 'Ingrediente agregado', ingrediente: bdResponse }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.nuevoAdmin = async ({ nombre, contrasena, tipo, numeroTelefono }) => {
    try {
        contrasena = await hash(contrasena, 10)
        const admin = new Admin({ nombre, tipo, password: contrasena, numeroTelefono })
        const bdResponse = admin.save()
        return { ok: true, token: crearToken(bdResponse), message: 'Administrador creado' }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.entrarAdmin = async({ usuario, contrasena }) => {
    try {
        let admin = await Admin.findOne({ 'nombre': usuario })
        if (await !compare(contrasena, admin.contrasena)) {
            return { ok: false, message: 'Credenciales incorrectas', status: 400 }
        }
        delete admin['__v']
        return { ok: true, token: crearToken(admin) }
    } catch (error) {
        return { ok: false, message: `Error: ${ error.message }`, status: 400 }
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
        let usuario
        try {
            usuario = await Usuario.findById(tokenVerificado._id)
            usuario = pick(usuario, ['_id', 'nombre', 'telefono', 'domicilios', 'pedidosAnteriores'])
            usuario['pedidosAnteriores'] = usuario['pedidosAnteriores'].map(pedido => pick(pedido, ['_id', 'pizzas', 'fecha']))
            usuario['domicilios'] = usuario['domicilios'].map(domicilio => pick(domicilio, ['_id', 'calle', 'numero', 'numeroInterior', 'colonia', 'codigoPostal']))
        } catch (e) {
            usuario = await Admin.findById(tokenVerificado._id)
            console.log(`usuario: ${ JSON.stringify(usuario) }`)
            if (Object.keys(usuario).length === 0) {
                return { ok: false, message: 'No procede', status: 403 }
            }
            usuario = pick(usuario, ['_id', 'nombre', 'tipo', 'numeroTelefono'])
        }

        return { ok: true, usuario }
    } catch (error) {
        return { ok: false, message: 'No cuenta con permisos', status: 403 }
    }
}

exports.obtenerInfoAdmin = async token => {
    try {
        if (token.includes('Bearer')) {
            token = token.split(' ')[1]
        } else {
            return { ok: false, message: 'No procede', status: 403}
        }
        const tokenVerificado = await verify(token, process.env.SECRET_KEY)
        let admin
        try {
            admin = await Admin.findById(tokenVerificado.usuario._id)
            admin = pick(admin, ['_id', 'nombre', 'tipo', 'numeroTelefono'])
        } catch (error) {
            return { ok: false, message: 'No procede', status: 403 }
        }
        return { ok: true, admin }
    } catch (error) {
        return { ok: false, message: 'No procede', status: 403 }
    }
}

exports.nuevoUsuario = async (nombre, telefono, contrasena, domicilio) => {
    try {
        contrasena = await hash(contrasena, 10)
        const usuarioNuevo = new Usuario({ nombre, telefono, contrasena, domicilio })
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

exports.nuevoPedido = async (token, { pizzas, domicilio, promocion: promoNombre }) => {
    let values = {}
    const usrId = await (await this.obtenerInfoUsuario(token)).usuario._id
    values['usuario'] = usrId
    try {
        const { calle, numero, colonia, codigoPostal, coordenadas } = domicilio
        const { latitud, longitud } = coordenadas
        values['domicilio'] = { calle, numero, colonia, codigoPostal, coordenadas: { latitud, longitud } }

        if (domicilio.numeroInterior) {
            values['domicilio']['numeroInterior'] = domicilio.numeroInterior
        }
        if (domicilio.municipio) {
            values['domicilio']['municipio'] = domicilio.municipio
        }
        if (domicilio.estado) {
            values['domicilio']['estado'] = domicilio. estado
        }
        if (promoNombre) {
            const promo = await Promocion.findOne({ 'nombre': promoNombre })
            values['promocion'] = promo._id
        }

        values['pizzas'] = JSON.parse(pizzas)
        const pedido = new Pedido({ ...values })
        const bdResponse = await pedido.save()

        return { ok: true, message: 'Tu pedido está en preparación', pedido: bdResponse._id }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.actualizarIngrediente = () => {

}

exports.actualizarEspecialidad = () => {

}

exports.actualizarPedido = () => {

}

exports.obtenerEspecialidades = async () => {
    try {
        const bdResponse = await Especialidad.find()
        if (bdResponse.length < 1) {
            return { ok: false, message: 'No hay especialidades', status: 404 }
        }
        console.log(bdResponse)
        // const especialidades = pick(bdResponse, [''])
        // const ingredientes = especialidades.map(especialidad => pick(especialidad.ingredientes, ['_id', 'nombre', 'disponibilidad']))
        return {
            ok: true,
            especialidades: bdResponse
        }
    } catch (error) {
        return {
            ok: false,
            message: error.message,
            status: 400
        }
    }
}

exports.obtenerIngredientes = async () => {
    try {
        const bdResponse = await Ingrediente.find()
        if (bdResponse.length < 1) {
            return { ok: false, message: 'No hay ingredientes', status: 404 }
        }
        const ingredientes = bdResponse.map(ing => pick(ing, ['_id', 'nombre', 'disponibilidad']))
        return {
            ok: true,
            ingredientes
        }
    } catch (error) {
        return {
            ok: false,
            message: error.message,
            status: 400
        }
    }
}

exports.obtenerPedido = async (token, pedidoId) => {
    try {
        const usuario = await (await this.obtenerInfoUsuario(token)).usuario
        let pedido = await Pedido.findOne({ '_id': pedidoId, 'usuario': usuario._id })
        delete pedido.__v
        if (usuario.tipo || pedido.usuario === usuario._id) {
            return { ok: true, pedido }
        }
        return { ok: false, message: 'No existe tal pedido', status: 404 }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.obtenerPedidosAdmin = async token => {
    try {
        const usuario = await (await this.obtenerInfoUsuario(token)).usuario
        if (!usuario.tipo) {
            return { ok: false, message: 'No cuenta con permisos', status: 403 }
        }
        const pedidos = await Pedidos.find()
        return { ok: true, pedidos }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.obtenerPedidosUsuario = async token => {
    try {
        const usuario = await (await this.obtenerInfoUsuario(token)).usuario
        const pedidos = await Pedido.find({ 'usuario': usuario._id })
        if (pedidos.length === 0) {
            return { ok: false, message: 'No hay pedidos', status: 404 }
        }
        return { ok: true, pedidos }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
}

exports.nuevaPromocion = async (token, { nombre, precio, oferton }) => {
    try {
        const usuario = await (await this.obtenerInfoUsuario(token)).usuario
        if (!usuario.tipo) {
            return { ok: false, message: 'No procede', status: 400 }
        }
        oferton = JSON.parse(oferton)
        if (Array.isArray(oferton)) {
            const especialidadValida = oferton.filter(async oferta => await checkEspecialidad(oferta.especialidad))
            if (oferton.length !== especialidadValida.length) {
                return { ok: false, message: 'No existe tal especialidad', status: 400 }
            }
        } else {
            if (!(await checkEspecialidad(oferton.especialidad))) {
                return { ok: false, message: 'No existe tal especialidad', status: 400 }
            }
            oferton = [ oferton ]
        }
        const promocion = new Promocion({ nombre, precio, oferton })
        const bdResponse = await promocion.save()
        return { ok: true, message: 'Promoción agregada', promocion: bdResponse }
    } catch (error) {
        return { ok: false, message: error.message, status: 400 }
    }
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

const checkEspecialidad = async especialidadId => new Promise((resolve, reject) => {
    Especialidad.findById(especialidadId, (err, esp) => {
        if (err) return reject(false)
        return resolve(true)
    })
})
