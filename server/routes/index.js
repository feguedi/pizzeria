const ctls = require('../controllers')

const routes = [
    // ================
    // Método para pedir (no importa si es usuario o administrador)
    // ================
    {
        method: 'POST',
        path: '/api/pedido',
        handler: async (req, h) => {
            return {
                ok: true,
                message: 'POST pedido'
            }
        }
    },
    // ================
    // Métodos del administrador
    // ================
    {
        method: 'POST',
        path: '/api/admin',
        handler: async (req, h) => {
            let { nombre, telefono, contrasena, tipo } = req.payload
            if (!tipo) tipo = 'caja'
            const response = await ctls.nuevoAdmin({ nombre, contrasena, tipo, numeroTelefono: telefono })
            const finalResponse = h.response(response)

            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'GET',
        path: '/api/pedidos',
        handler: async (req, h) => {
            return {
                ok: true,
                message: 'GET pedidos'
            }
        }
    },
    {
        method: 'GET',
        path: '/api/pedido/{id}',
        handler: async (req, h) => {
            return {
                ok: true,
                message: 'GET pedido'
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/pedido/{id}',
        handler: async (req, h) => {
            return {
                ok: true,
                message: 'PUT pedido'
            }
        }
    },
    {
        method: 'POST',
        path: '/api/ingrediente',
        handler: async (req, h) => {
            const { nombre } = req.payload
            const response = await ctls.nuevoIngrediente(nombre)
            const finalResponse = h.response(response)
            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'POST',
        path: '/api/especialidad',
        handler: async (req, h) => {
            const { nombre, ingredientes } = req.payload
            console.log(`headers: ${ JSON.stringify(h.headers) }`)
            const token = req.headers['Authorization']
            const response = await ctls.nuevaEspecialidad(token, { nombre, ingredientes })
            const finalResponse = h.response(response)
            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'POST',
        path: '/api/promocion',
        handler: async (req, h) => {
            return {
                ok: true,
                message: 'POST promocion'
            }
        }
    },
    // ================
    // Métodos del usuario
    // ================
    {
        method: 'POST',
        path: '/api/login',
        handler: async (req, h) => {
            const { phone, password } = req.payload
            const response = await ctls.entrarUsuario(phone, password)
            let finalResponse = h.response(response)

            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'POST',
        path: '/api/registrarme',
        handler: async (req, h) => {
            const { phone, password, address } = req.payload
            const response = await ctls.nuevoUsuario(phone, password, address)
            const finalResponse = h.response(response)

            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'GET',
        path: '/api/info',
        handler: async (req, h) => {
            return {
                ok: true,
                message: 'GET info'
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/info/{id}',
        handler: async (req, h) => {
            return {
                ok: true,
                message: 'PUT info'
            }
        }
    },
    // ================
    // Renderización del cliente web
    // ================
    {
        method: 'GET',
        path: '/{param*}',
        // handler: (req, res) => res.file('index.html')
        handler: {
            directory: {
                path: '.',
                index: true,
                listing: false
            }
        }
    }
]

module.exports = routes
