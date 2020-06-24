const hapi = require('@hapi/hapi')
const path = require('path')
require('dotenv').config()

const init = async () => {
    await require('./database').conexion()
    const server = new hapi.Server({
        port: process.env.PORT || 8000,
        routes: {
            cors: true,
            files: {
                relativeTo: path.join(__dirname, '../client/build')
            }
        }
    })

    try {
        await server.start()
        console.log(`Servidor corriendo en ${ server.info.uri }`)

        await server.register(require('@hapi/inert'))
        server.route(require('./routes'))
    } catch (error) {
        console.error('No está corriendo el servidor', error)
    }

}

init()
