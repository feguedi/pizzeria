const { connect } = require('mongoose')

exports.conexion = async () => {
    try {
        await connect(process.env.DB_URI, { 
            useCreateIndex: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada')
    } catch (error) {
        console.error(`No hay conexión con la base de datos. ${ JSON.stringify(error) }`)
    }
}
