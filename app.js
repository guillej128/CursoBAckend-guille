const express = require("express");

const app = express();
const PUERTO = 8080;

const productsRouter = require("./src/routes/products.router.js");
const cartsRouter = require("./src/routes/carts.router.js");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts/", cartsRouter);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la página principal, proyecto Backend!');
});

app.listen(PUERTO, () => {
    console.log(`Funcionando en el Puerto ${PUERTO}`);
});
