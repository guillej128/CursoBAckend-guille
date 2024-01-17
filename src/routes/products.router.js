const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");

//Rutas:
//Ver todos los productos
router.get("/", async(req, res)=>{
    try{
        const arrayProductos = await productManager.leerArchivo();
        let limit = parseInt(req.query.limit);
        if(limit){
            const arrayConLimite = arrayProductos.slice(0, limit);
            return res.send(arrayConLimite);
        }else{
            return res.send(arrayProductos)
        }

    }catch(error){
        console.log(error);
        return res.send("Error al procesar la solicitud.", error)};
})

//Método para ver Productos por ID
router.get("/:pid", async (req, res) => {
    try {
        let pid = parseInt(req.params.pid);
        const buscado = await productManager.getProductById(pid);
        if (buscado) {
            return res.send(buscado);
        } else {
            const errorRes = {
                error: true,
                message: "No se encuentra el Id del producto."
            };
            return res.status(404).json(errorRes);
        }
    } catch (error) {
        console.error(error);
        const errorRes = {
            error: true,
            message: "Error en la búsqueda del ID."
        };
        res.status(500).json(errorRes);
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
    try {
        const pid = parseInt(req.params.pid);

        if (!pid) {
            const errorRes = {
                error: true,
                message: "ID de producto no válido."
            };
            return res.status(400).json(errorRes);
        }

        await productManager.deleteProduct(pid);

        const successRes = {
            success: true,
            message: "Producto eliminado exitosamente."
        };
        res.status(200).json(successRes);
    } catch (error) {
        console.error(error);
        const errorRes = {
            error: true,
            message: "Error al intentar eliminar el producto."
        };
        res.status(500).json(errorRes);
    }
});



module.exports = router;