const express = require('express');
const cursos = require('../models/curso_models');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respuesta Get funcionando')
});

module.exports = ruta;