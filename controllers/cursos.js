const express  = require('express');
const cursos = require('../models/curso_models');
const ruta = express.Router();


ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion get de usuarios funcionando correctamente...');
});



module.exports = ruta;