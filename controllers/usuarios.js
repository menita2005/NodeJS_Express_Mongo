const express  = require('express');
const usuarios = require('../models/usuario_models');
const ruta = express.Router();


ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion get de usuarios funcionando correctamente...');
});





module.exports = ruta;