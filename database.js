const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pruebaaa5back:lSI4my0JrQzCeyeu@cluster9.onzmhdj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster9")
.then(()=> console.log("Conectado a la Base de Datos De la casa de repuestos"))
.catch(()=> console.log("Error al conectarse a la base de Datos de la casa de repuestos"))