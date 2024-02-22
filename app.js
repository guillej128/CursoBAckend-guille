const express = require("express");
//Creación de Servidor:
const app = express();
const exphbs = require ("express-handlebars");
const socket = require("socket.io");
const PUERTO = 8080;
require("./database.js");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static("./src/public"));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/", viewsRouter);



const httpServer = app.listen(PUERTO, ()=> {
    console.log(`corriendo en el Puerto ${PUERTO}`);
})

//Chat del E-Commerce
const MessageModel = require("./dao/models/message.model.js");
const io = new socket.Server(httpServer);


io.on("connection",  (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", async data => {

        await MessageModel.create(data);
        
        const messages = await MessageModel.find();
        console.log(messages);
        io.sockets.emit("message", messages);
     
    })
})