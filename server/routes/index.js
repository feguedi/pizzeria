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
        path: '/api/admin/registrar',
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
        method: 'POST',
        path: '/api/admin/entrar',
        handler: async (req, h) => {
            let { usuario, contrasena } = req.payload
            const response = await ctls.entrarAdmin({ usuario, contrasena })
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
            const token = req.headers['authorization']
            const { nombre } = req.payload
            const response = await ctls.nuevoIngrediente(token, nombre)
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
            const token = req.headers['authorization']
            const response = await ctls.nuevaEspecialidad(token, { nombre, ingredientes })
            const finalResponse = h.response(response)
            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'GET',
        path: '/api/especialidades',
        handler: async (req, h) => {
            const response = await ctls.obtenerEspecialidades()
            const finalResponse = h.response(response)
            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'GET',
        path: '/api/especialidad/{id}',
        handler: async (req, h) => ({
            ok: true,
            message: `GET especialidad ${ req.params.id }`
        })
    },
    {
        method: 'GET',
        path: '/api/ingredientes',
        handler: async (req, h) => {
            const response = await ctls.obtenerIngredientes()
            const finalResponse = h.response(response)
            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'GET',
        path: '/api/ingrediente/{id}',
        handler: async (req, h) => ({
            ok: true,
            message: `GET ingrediente ${ req.params.id }`
        })
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
    {
        method: 'GET',
        path: '/api/promociones',
        handler: async (req, h) => {
            const response = await ctls.obtenerPromociones()
            const finalResponse = h.response(response)
            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
        }
    },
    {
        method: 'GET',
        path: '/api/promocion/{id}',
        handler: async (req, h) => {
            const response = await ctls.obtenerPromocion(req.params.id)
            const finalResponse = h.response(response)
            if (!response.ok) {
                finalResponse.code(response.status)
            }
            return finalResponse
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
            const { name, phone, password, address } = req.payload
            const response = await ctls.nuevoUsuario(name, phone, password, address)
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
