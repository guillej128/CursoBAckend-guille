const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://heyguille10:DTjLAYu5SKLodAoG@cluster0.nzr8ibu.mongodb.net")
.then(()=> console.log("Conectado a la Base de Datos De la casa de repuestos"))
.catch(()=> console.log("Error al conectarse a la base de Datos de la casa de repuestos"))