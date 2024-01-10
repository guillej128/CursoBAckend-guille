class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(title, price, stock) {
    const newProduct = {
      id: this.productIdCounter++,
      title: title,
      price: price,
      stock: stock,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(productId) {
    const foundProduct = this.products.find(product => product.id === productId);
    if (!foundProduct) {
      throw new Error(`Producto con ID ${productId} no encontrado.`);
    }
    return foundProduct;
  }

  updateProduct(productId, updates) {
    const productIndex = this.products.findIndex(product => product.id === productId);
    if (productIndex === -1) {
      throw new Error(`Producto con ID ${productId} no encontrado para actualizar.`);
    }
    this.products[productIndex] = { ...this.products[productIndex], ...updates };
    return this.products[productIndex];
  }

  deleteProduct(productId) {
    const productIndex = this.products.findIndex(product => product.id === productId);
    if (productIndex === -1) {
      throw new Error(`Producto con ID ${productId} no encontrado para eliminar.`);
    }
    const deletedProduct = this.products.splice(productIndex, 1);
    return deletedProduct;
  }
}

const productManager = new ProductManager();

const initialProducts = productManager.getAllProducts();
console.log("Productos inicialmente:", initialProducts);

productManager.addProduct("patineta", 200, 25);
productManager.addProduct("bicicleta de montaña", 100, 20);
productManager.addProduct("moto deportiva", 100, 10);
productManager.addProduct("teléfono para automóvil", 300, 15);
productManager.addProduct("radio para auto", 800, 5);
productManager.addProduct("auriculares para motocicleta", 50, 30);
productManager.addProduct("televisor para caravanas", 50, 8);
productManager.addProduct("inflador de vehículos", 120, 12);
productManager.addProduct("gps para automóvil", 30, 25);
productManager.addProduct("llantas para vehículos", 300, 40);
productManager.addProduct("cubiertas de vehículos", 200, 10);


const productsAfterAdd = productManager.getAllProducts();
console.log("Productos después de agregar:", productsAfterAdd);

const productIdToFind = 1; 
try {
  const foundProduct = productManager.getProductById(productIdToFind);
  console.log(`Producto con ID ${productIdToFind}:`, foundProduct);
} catch (error) {
  console.error(error.message);
}

const productIdToUpdate = 1; 
try {
  const updatedProduct = productManager.updateProduct(productIdToUpdate, {
    price: 250,
  });
  console.log("Producto actualizado:", updatedProduct);
} catch (error) {
  console.error(error.message);
}

const productIdToDelete = 1; 
try {
  const deleteResult = productManager.deleteProduct(productIdToDelete);
  console.log("Resultado de eliminación:", deleteResult);
  console.log("Productos después de eliminar:", productManager.getAllProducts());
} catch (error) {
  console.error(error.message);
}

module.exports = productManager;
