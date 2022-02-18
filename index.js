require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

const app = express();


//configuracion de cors
app.use( cors() );

//Database
dbConection();

//rutas
app.get( '/health', (req, res) => {
    res.status(200).json({
        ok:true,
        msg: 'Hola Mundo'
    })
});


app.listen( process.env.PORT, () => {
    console.log( 'Servidor corriendo en puerto ' + process.env.PORT );
});