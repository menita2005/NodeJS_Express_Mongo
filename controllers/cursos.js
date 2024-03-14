const express = require('express');
const cursos = require('../models/curso_models');
const logic = require('../logic/curso_logic');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    let resultado = logic.listarCursosActivos();
    resultado.then(cursos =>{
        res.json(cursos);
    }).catch(err =>{
        res.status(400).json(err);
    })
    
});




// Endpoint de tipo put para cursos
ruta.put('/:id', (req, res) => {
    let resultado = logic.actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(
            curso
        );
    }).catch(err => {
        res.status(400).json(err)
    })
})


//endpoint de tipo delete para curso
ruta.delete('/:id',(req,res)=>{
    let resultado = logic.desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    })
})
// Endpoint de tipo POST para crear un curso
ruta.post('/', (req, res) => {
    console.log('Solicitud POST recibida:', req.body); // Agregar mensaje de depuración
    let resultado = logic.crearCurso(req.body);

    resultado.then(curso => {
        console.log('Curso creado exitosamente:', curso); // Agregar mensaje de depuración
        res.json({
            curso
        });
    }).catch(err => {
        console.error('Error al crear el curso:', err); // Agregar mensaje de error
        res.status(400).json({
            err
        });
    });
});

module.exports = ruta;
