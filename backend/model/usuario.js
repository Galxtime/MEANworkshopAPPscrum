// cuando registran desde angular 
//modulos internos node
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// Esquema 
const esquemaUsuario = new mongoose.Schema({
nombre: {
    type: String,
},
cedula: {
    type: String,
},

edad: {
    type: Number,
},
correo: {
    type: String,
},
pass: {
    type: String,
},
fecha: {
    type:Date,
    default: Date.now,
}
});
// Generar el JWT 

esquemaUsuario.methods.generateJWT=function() {
return jwt.sign({
    _id:this.id,
    nombre:this.nombre,
    correo:this.correo
}, "clave");

};
// exportamos modulo
 const Usuario= mongoose.model("usuario",esquemaUsuario);

 module.exports.Usuario=Usuario;
 module.exports.esquemaUsuario=esquemaUsuario;