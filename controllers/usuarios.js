const express = require('express');
const usuarios = require('../models/usuario_models');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respuesta Get funcionando')
});

module.exports = ruta;