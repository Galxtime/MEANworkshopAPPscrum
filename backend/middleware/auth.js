// modulo node
const jwt = require("jsonwebtoken");

// Creamos  una funcion validacion para identificar el usuario logueado y sus procesos
function auth(req, res, next) {
    let jwtToken = req.header("Authorization");
    // realizamos un split al JWT agregar  un espacio despues del bearer
    
          jwtToken= jwtToken.split(" ")[1];

        // si el token no existe o no llego
        if(!jwtToken) return res.status(405).send("No hay token para un acceso");

        // si el token existe validamos con el payload que hace parte el JWT
           try {
               // datos que se confirman con payload
               const payload = jwt.verify(jwtToken, "clave");
               // extraemos todos los datos de usuario que llego lo cambiamos por el payload
               req.usuario= payload;
               //siguiente tarea o petición que hace el usuario
               next();
            // si el token cambio 
           }catch (error) {
               res.status(405).send("token sin autorización ")

           }

}
module.exports= auth;