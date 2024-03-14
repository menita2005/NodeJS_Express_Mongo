const express = require('express');
const cursos = require('../models/curso_models');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respuesta Get funcionando')
});

// Función asincrónica para crear un curso
async function crearCurso(body) {
    let curso = new cursos({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });
    return await curso.save();
}
// Función asincrónica para editar un curso
async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, { new: true });
    return curso;
}

// Endpoint de tipo put para cursos
ruta.put('/:id', (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(
            curso
        );
    }).catch(err => {
        res.status(400).json(err)
    })
})

//funcion asincronica para inactivar un curso
async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            estado:false
        }
    },{new:true});
    return curso;
}
//endpoint de tipo delete para curso
ruta.delete('/:id',(req,res)=>{
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    })
})
// Endpoint de tipo POST para crear un curso
ruta.post('/', (req, res) => {
    console.log('Solicitud POST recibida:', req.body); // Agregar mensaje de depuración
    let resultado = crearCurso(req.body);

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
