const Product = require('../models/Product');

class ProductService {

  async getAllProducts() {
    return await Product.findAll();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async addProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(id, productData) {
    return await Product.update(id, productData);
  }

  async deleteProduct(id) {
    return await Product.delete(id);
  }
}

module.exports = ProductService;