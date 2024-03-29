const express = require('express');
const ProductService = require('../services/ProductService');

const router = express.Router();
const productService = new ProductService();

const authMiddlware = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    // res.status(200).json(products);
    res.json(products);
    
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', authMiddlware,  async (req, res) => {
  try {
    const newProductId = await productService.addProduct(req.body);
    res.status(201).send({ id: newProductId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', authMiddlware, async(req, res) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    res.json({message: 'Producto actualizado'});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', authMiddlware, async(req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({message: 'Producto Eliminado'});
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router;


