const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cart-manager.js");
const cartManager = new CartManager("./src/models/carts.json");

//Rutas
//Agregar Carrito
router.post("/", async (req, res)=>{
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({error: "Error en el servidor"});
    }
});

//Obtener Carritos
router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    try {
        const cart = await cartManager.getCarritoById(cartId);
        res.json(cart.products);
    } catch (error) {
        console.error("Error al buscar el carrito indicado:", error);
        res.status(500).json({error: "Error del servidor" });
    }
});

//Agregar productos a varios carritos diferentes
router.post("/:cid/product/:pid", async (req, res)=> {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error(500).json({error: "Error en el servidor"});
    }
});


module.exports = router;