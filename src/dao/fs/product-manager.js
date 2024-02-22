const fs = require("fs").promises;


class ProductManager{
    static lastId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {
        try {
          const arrayProductos = await this.leerArchivo();
    
          if (!title || !description || !price || !code || !stock || !category) {
            console.log("Todos los campos son obligatorios");
            return;
          }
    
          if (arrayProductos.some(item => item.code === code)) {
            console.log("El código debe ser único");
            return;
          }
    
          const newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            category,
            status: true,
            thumbnails: thumbnails || []
          };
    
          if (arrayProductos.length > 0) {
            ProductManager.ultId = arrayProductos.reduce((maxId, product) => Math.max(maxId, product.id), 0);
          }
    
          newProduct.id = ++ProductManager.ultId; 
    
          arrayProductos.push(newProduct);
          await this.guardarArchivo(arrayProductos);
        } catch (error) {
          console.log("Error al agregar producto", error);
          throw error; 
        }
      }
    
    //Obtener los productos
    getProducts(){
        try {
            const arrayProductos = this.leerArchivo();
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer el archivo", error);
        }

    }
    // Buscar producto por ID
    async getProductById(id){
        try{
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);
            if (!buscado){
                console.log("Producto no Encontrado");
            }else{
                console.log("Producto encontrado.");
                return buscado;
            }

        }catch(error){
            console.log("No se encontró el producto buscado", error)
        }
    }

    //Método Leer
    async leerArchivo() {
        try{
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        }catch(error){
            console.log("Error al leer un archivo", error);
        }
        
    }

    //Método Guardar
    async guardarArchivo(arrayProductos) {
        try {
          await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
          console.log("Error al guardar el archivo", error);
          throw error;
        }
      }
   

    // Método Actualizar
async updateProduct(id, productoActualizado) {
    try {
        const arrayProductos = await this.leerArchivo();
        

        const index = arrayProductos.findIndex(item => item.id === parseInt(id, 10));
        
        if (index !== -1) {
            // Asegúrate de que productoActualizado tenga la propiedad 'id'
            const updatedProduct = { ...arrayProductos[index], ...productoActualizado };
            arrayProductos[index] = updatedProduct;
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
            console.log("Producto actualizado correctamente");
        } else {
            console.log("Producto no encontrado");
        }

    } catch (error) {
        console.log("Error al actualizar el producto indicado", error);
    }
}

    // Método Borrar
    async deleteProduct(id) {
        try {
            const arrayProductos = await this.leerArchivo();
    
            const index = arrayProductos.findIndex(item => item.id === id);
            if (index !== -1) {
                arrayProductos.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
                console.log("Producto eliminado correctamente");
            } else {
                console.log("Producto no encontrado");
            }
    
        } catch (error) {
            console.log("Error al eliminar el producto indicado", error);
        }
    }
    
}

module.exports = ProductManager;