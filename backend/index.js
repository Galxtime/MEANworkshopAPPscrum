// index.js invoca la ruta del controlador routes/usuario.js

const express= require("express");
const mongoose= require("mongoose");
const cors= require("cors")

// traer o importar el usuario del modulo routes 
const usuario= require("./routes/usuario");
const auth= require("./routes/auth");
const tablero= require("./routes/tablero");

// crear nuestra app 
const app =express();
// todo la comunicación va a ser formato JSON 
app.use(cors());
app.use(express.json());
// indicamos cual es la ruta de la API cuando se este registrando un usuario
app.use("/api/usuario/", usuario);
app.use("/api/auth/", auth);
app.use("/api/tablero/", tablero);
app.use("/public", express.static("public"));

// puerto para ejecutar nuestro  aplicacion servidor

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log("Escuchando en el puerto :" +port));

// creamos la conexion con la base de datos MONGODB
mongoose
.connect("mongodb://localhost/scrum",{
    // utilizar 4 parametros por defacto para que funcionen bien
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("Conexión a MongoDB: online"))
.catch((error) => console.log("Conexión a MongoDB: offline") );
// se recomienda utilizar .then and .catch para conexiones.