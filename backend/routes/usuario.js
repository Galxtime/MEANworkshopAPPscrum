
// API a funcionar nos llega por metodo POST desde angular los campos que registro el usuario 
const express= require("express");
const router= express.Router();

//modulos internos creados por el desarrollador

const {Usuario}= require("../model/usuario");

//usa el modelo de  model/usuario

// cuando completa un formulario desde angular lo envian por POST
router.post("/", async (req, res) =>{

    // espera a que se cumpla un proceso la validacion si correo existe DB
    let usuario= await Usuario.findOne({correo:req.body.correo})

    if (usuario) return res.status(400).send("El correo ya esta registrado");
   // mapeo para registrar lo que llego por parte del usuario desde el Front(angular) y guardar en MONGODB

    usuario= new Usuario({
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        edad:   req.body.edad,
        correo: req.body.correo,
        pass:   req.body.pass



    });

        // guardamos el usuario que se va a crear con el JWT 
// crear un resultado .save se encarga de guardar y crear usuario en MONGODB donde vamos a utilizar
// el ASYNC jwtToken 

const result = await usuario.save();
const jwtToken = usuario.generateJWT();
res.status(200).send({jwtToken});
});


// Exportar el modulo se envia a la APP que es index.js (router xq tiene el POST)
module.exports=router;