// API a funcionar nos llega por metodo POST desde angular los campos que registro el usuario 
const express= require("express");
const router= express.Router();

//modulos internos creados por el desarrollador
// Tablero donde guardar
const { Tablero }  = require("../model/tablero");
// usuario es el que hace el registro para hacer una actividad
const { Usuario } = require("../model/usuario");
// middleware pendiente de vigilancia del usuario 
const auth = require("../middleware/auth");
const cargarArchivo= require("../middleware/file")


// Listar actividades del usuario con GET 
// autenticación pasar por el proceso de middleware para verificar usuario
router.get("/lista", auth, async (req, res) => {
   // Buscamos el usuario por id
   const usuario = await Usuario.findById(req.usuario._id);
   // Si el usuario no existe
   if (!usuario) return res.status(400).send("El usuario no existe en BD");
   // si el usuario existe almacenamos en nuestra Colección tablero con find trae todas las tareas de  documentos  actividades
   // que coincidad con el id del usuario.
   const tablero = await Tablero.find({ idUsuario: req.usuario._id})
    res.send(tablero)
});   
   

// PARA LAS RUTAS SE RECOMIENDA  utilizar ASYNC - AWAY mientras para conexiones con DB el then()catch()


//REGISTRAR ACTIVIDAD POST ruta primero hace el proceso con middleware quien esta logeado trae correo &pass
router.post("/", auth, async(req, res) =>{
 //Obtenemos el id del usuario autenticado
 const usuario = await Usuario.findById( req.usuario._id);
 // Si el usuario no existe
 if(!usuario) return res.status(400).send("El usuario no existe");
 //si el usuario existe creamos un actividad para ese usuario
 const tablero = new Tablero({
    idUsuario: usuario._id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado:req.body.estado,
 })
 // Enviamos resultado
 const result = await tablero.save();
 res.status(200).send(result)
});

//Crear actividad con imagen
//.single sticker el archivo viene desde angular
router.post("/cargarArchivo",  cargarArchivo.single("sticker"),  auth,  async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    // Validamos si existe el usuario
    const usuario = await Usuario.findById(req.usuario._id);
    // si el usuario no existe
    if (!usuario) return res.status(400).send("El usuario no existe en BD");
    // Si existe el usuario continuamos el proceso
    // la variable rutaImagen se puede declarar null xq es para multer
    let rutaImagen = null;
    // req.file es objecto que nos proporciona información del objecto que se esta subiendo
    if (req.file.filename) {
      rutaImagen = url + "/public/" + req.file.filename;
    } else {
      rutaImagen = null;
    }
    // Guardar la actividad con imagen en BD
    const tablero = new Tablero({
      idUsuario: usuario._id,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      sticker: rutaImagen,
      estado: req.body.estado,
    });
    // Enviamos resultado
    const result = await tablero.save();
    res.status(200).send(result);
  }
);

//Actualizar actividad 

router.put("/", auth, async (req, res) => {
   // Buscamos el usuario por id
   const usuario = await Usuario.findById(req.usuario._id);
   // Si el usuario no existe
   if (!usuario) return res.status(400).send("El usuario no existe en BD");
   // si el usuario existe
   const tablero = await Tablero.findByIdAndUpdate(
     req.body._id,
     {
       idUsuario: req.usuario._id,
       nombre: req.body.nombre,
       descripcion: req.body.descripcion,
       estado: req.body.estado,
     },
     {
       new: true,
     }
   );
   if (!tablero)
     return res.status(400).send("No hay actividad asignada a este usuario");
   res.status(200).send(tablero);
 });
 // Eliminar el usuario , traemos un parametro del id de la tarea
 router.delete("/:_id", auth, async (req, res) => {
   // Buscamos el usuario por id
   const usuario = await Usuario.findById(req.usuario._id);
   // Si el usuario no existe
   if (!usuario) return res.status(400).send("El usuario no existe en BD");
   // si el usuario existe eliminamos una actividad nuestra Colección tablero con find 
   const tablero = await Tablero.findByIdAndDelete(req.params._id);
   if (!tablero)
   return res.status(400).send("No se encuentra tarea a eliminar");
   // message: estable comunicacion con el front le da la orden a Angular de borrar en html
    res.status(200).send({message:"Actividad eliminada"});
});



module.exports = router;