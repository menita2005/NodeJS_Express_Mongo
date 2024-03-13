const mongoose = require('mongoose');
const Usuario = require('../models/usuario_models');
const Joi = require('@hapi/joi');
const express = require('express');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respuesta Get funcionando')
});

//validacion de usuario
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóú ]{3,30}$/),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
});
// Función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(body){
    let usuario = new Usuario({
        email       : body.email,
        nombre      : body.nombre,
        password    : body.password,
        
        
    });
    return await usuario.save();
}
async function actualizarUsuario(email, body){
    let usuario = await Usuario.findOneAndUpdate({"email":email},{
        $set: {
            nombre: body.nombre,
            password: body.password
        }
    },{new:true});
    return usuario;
}
ruta.put('/:email',(req,res)=>{
    const{error, value} = schema.validate({nombre: req.body.nombre});
    if(!error){
        let resultado = actualizarUsuario(req.params.email,req.body);
        resultado.then(valor =>{
            res.json({
                valor
            })
        }).catch(err =>{
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});

ruta.post('/', (req, res) => {
    let body = req.body;

    const {error, value} = schema.validate({nombre: body.nombre, email: body.email});
    if(!error){
        let resultado = crearUsuario(body);

        resultado.then( user => {
            res.json({
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }    
});
module.exports = ruta;