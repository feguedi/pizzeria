const ctls = require('../controllers')

const routes = [
    // ================
    // Método para pedir (no importa si es usuario o administrador)
    // ================
    {
        method: 'POST',
        path: '/pedido',
        handler: async (req, res) => {
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
        method: 'GET',
        path: '/pedidos',
        handler: async (req, res) => {
            return {
                ok: true,
                message: 'GET pedidos'
            }
        }
    },
    {
        method: 'GET',
        path: '/pedido/{id}',
        handler: async (req, res) => {
            return {
                ok: true,
                message: 'GET pedido'
            }
        }
    },
    {
        method: 'PUT',
        path: '/pedido/{id}',
        handler: async (req, res) => {
            return {
                ok: true,
                message: 'PUT pedido'
            }
        }
    },
    {
        method: 'POST',
        path: '/ingrediente',
        handler: async (req, res) => {
            return {
                ok: true,
                message: 'POST ingrediente'
            }
        }
    },
    {
        method: 'POST',
        path: '/especialidad',
        handler: async (req, res) => {
            return {
                ok: true,
                message: 'POST especialidad'
            }
        }
    },
    // ================
    // Métodos del usuario
    // ================
    {
        method: 'POST',
        path: '/login',
        handler: async (req, res) => {
            const { phone, password } = req.payload
            const response = await ctls.entrarUsuario(phone, password)
            let finalResponse = res.response(response)

            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'POST',
        path: '/registrarme',
        handler: async (req, res) => {
            const { phone, password, address } = req.payload
            const response = await ctls.nuevoUsuario(phone, password, address)
            const finalResponse = res.response(response)

            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'GET',
        path: '/info',
        handler: async (req, res) => {
            return {
                ok: true,
                message: 'GET info'
            }
        }
    },
    {
        method: 'PUT',
        path: '/info/{id}',
        handler: async (req, res) => {
            return {
                ok: true,
                message: 'PUT info'
            }
        }
    },
    // ================
    // Renderización del cliente
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
