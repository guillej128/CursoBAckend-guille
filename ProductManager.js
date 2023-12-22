class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
     
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Todos los campos son obligatorios.');
        return;
      }
  

      const codeExists = this.products.some(product => product.code === code);
      if (codeExists) {
        console.error('Ya existe un producto con el mismo código.');
        return;
      }
  
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(productId) {
      const product = this.products.find(product => product.id === productId);
  
      if (!product) {
        console.error('Producto no encontrado');
      }
  
      return product;
    }
  }
  
  
  const productManager = new ProductManager();
  
  productManager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del Producto 1',
    price: 100,
    thumbnail: 'ruta/imagen1.jpg',
    code: 'ABC123',
    stock: 10,
  });
  
  productManager.addProduct({
    title: 'Producto 2',
    description: 'Descripción del Producto 2',
    price: 150,
    thumbnail: 'ruta/imagen2.jpg',
    code: 'XYZ789',
    stock: 20,
  });
  
  const products = productManager.getProducts();
  console.log('Productos:', products);
  
  const productIdToFind = 1;
  const foundProduct = productManager.getProductById(productIdToFind);
  console.log(`Producto con ID ${productIdToFind}:`, foundProduct);
  