const express = require('express');
const bodyParser = require('body-parser');
const productManager = require('./ProductManager'); 

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.get('/products', (req, res) => {
    const allProducts = productManager.getAllProducts();
  
    const limit = parseInt(req.query.limit, 10);
    const limitedProducts = limit ? allProducts.slice(0, limit) : allProducts;
  
    res.json(limitedProducts);
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = productManager.getProductById(productId);
  
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    } 
  
    res.json(product);
});

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la página principal, proyecto Backend!');
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
