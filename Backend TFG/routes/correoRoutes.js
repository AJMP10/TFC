const express = require('express');
const app = express();

//  Genero la ruta para la peticion
let envio= require('../controllers/correoController');
app.post('/correo',envio.sendEmail);

module.exports = app;