const { connect } = require('mongoose')

exports.conexion = async () => {
    try {
        console.log('DB_URI', process.env.DB_URI)
        await connect(process.env.DB_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada')
    } catch (error) {
        console.error(`No hay conexión con la base de datos. ${ JSON.stringify(error) }`)
    }
}
