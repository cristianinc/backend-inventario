require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

const app = express();


//configuracion de cors
app.use( cors() );


//Lectura y parseo del body
app.use( express.json() );

//Database
dbConection();

//rutas

app.use('/api/users', require('./routes/user'));



app.listen( process.env.PORT, () => {
    console.log( 'Servidor corriendo en puerto ' + process.env.PORT );
});