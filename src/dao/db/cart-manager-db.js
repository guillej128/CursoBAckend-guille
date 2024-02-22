const CartModel = require("../models/cart.model.js");

class CartManager {
    async crearCarrito(){
        try {
            const nuevoCarrito= new CartModel({products:[]});
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear nuevo Carrito". error)
        }
    }

    async getCarritoById(cartId){
        try {
            const carrito = await CartModel.findById(cartId);
            if(!carrito){
                console.log("No existe el carrito buscado con el Id: "+ cartId);
                return null;
            }
            return carrito
        } catch (error) {
            console.log("Error al obtener el carrito solicitado". error)
        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1){
        try {
            const carrito = await this.getCarritoById(cartId); 
            const existeProducto = carrito.products.find(item => item.product.toString() === productId);

            if(existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({product: productId, quantity});
            }

            //Propiedad "products" modificada
            carrito.markModified("products");

            await carrito.save();
            return carrito;

        } catch (error) {
            console.log("Error al agregar un producto al carrito", error);
        }
    }
}

module.exports = CartManager;