//modulos internos node
const mongoose = require("mongoose");

const esquemaTablero = new mongoose.Schema({
    idUsuario:String,
    nombre:String,
    descripcion:String,
    sticker:String,
    estado:String,
    fecha: {
        type:Date,
        default: Date.now,
    },
});
const Tablero= mongoose.model("tablero",esquemaTablero);

 module.exports.Tablero=Tablero;
 