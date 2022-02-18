const mongoose = require('mongoose');

const dbConection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log( 'Conexion online' );
    } catch (error) {
        console.log( error );
        throw new Error( 'Error en la conexion de la database' );
    }


}


module.exports = {
    dbConection
}