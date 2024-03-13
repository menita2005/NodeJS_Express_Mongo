const { string } = require('@hapi/joi');
const mongoose = require('mongoose');
const cursoSchema = mongoose.Schema({
    titulo:{
    type:string,
    required:true
},
descripcion:{
    type:string,
    required:true
},
estado:{
    type: Boolean,
    default:true
},
imagen:{
    type:string,
    required:false
},
alumnos: {
    type:number,
    default:0
},
calificacion:{
    type:number,
    default:0
}
});

module.exports = mongoose.model('Curso', cursoSchema);