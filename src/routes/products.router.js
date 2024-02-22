const express = require("express");
const router = express.Router();

const ProductManager = require("../dao/db/product-manager-db.js");
const productManager = new ProductManager();

//Rutas:
//Ver todos los productos
router.get("/", async(req, res)=>{
    try{
        const limit = parseInt(req.query.limit);
        const productos = await productManager.getProducts();
        if(limit){
            res.json(productos.slice(0, limit));
        }else{
            res.json(productos)
        }

    }catch(error){
        console.error("Erros al obtener los productos",error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

//Método para ver Productos por ID
router.get("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        const producto = await productManager.getProductById(id);
        if (!producto) {
            return res.json({
                error: "No se pudo encontrar el Producto"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

//Método para Agregar Producto
router.post("/", async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            img,
            code,
            stock,
            status = true,
            category
        } = req.body;

        if (!title || !description || !price || !img || !code || !stock || !status || !category) {
            const errorRes = {
                error: true,
                message: "Todos los campos son obligatorios. Intente nuevamente"
            };
            return res.status(400).json(errorRes);
        }
        const nuevoProducto = {title,description,price,img,code,stock,status,category};
        await productManager.addProduct(nuevoProducto);

        const successRes = {
            success: true, message: "Producto agregado exitosamente."
        };
        res.status(201).json(successRes);

    } catch (error) {
        console.error(error);
        const errorRes = {
            error: true,
            message: "Error al intentar agregar producto."
        };
        res.status(500).json(errorRes);
    }
});

//Método para Actualizar Producto
router.put("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const productoActualizado = req.body;

        if (!pid || !productoActualizado) {
            const errorRes = {
                error: true,
                message: "Parámetros incompletos. Se requiere un ID y datos para actualizar."
            };
            return res.status(400).json(errorRes);
        }

        await productManager.updateProduct(pid, productoActualizado);

        const successRes = {
            success: true,
            message: "Producto actualizado exitosamente."
        };
        res.status(200).json(successRes);

    } catch (error) {
        console.error(error);
        const errorRes = {
            error: true,
            message: "Error al intentar actualizar el producto."
        };
        res.status(500).json(errorRes);
    }
});

//Método para borrar Producto
router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(id);
        res.json({
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});



module.exports = router;