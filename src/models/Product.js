const db = require('../config/database');

class Product {

  static findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products', (error, results) => {
        if(error) return reject(error);
        resolve(results);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM WHERE id = ?', [id], (error, results) => {
        if(error) return reject(error);
        resolve(results[0]);
      });
    });
  }


  static create(newProduct) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO products SET ?', newProduct, (error, results) => {

        if(error) return reject(error);

        resolve(results.insertId);
      })
    });
  }

  static update(id, updatedProduct) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, id], (error, results) => {
        if(error) return reject(error);
        resolve(results);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM products SET WHERE id = ?', [id], (error, results) => {
        if(error) return reject(error);
        resolve(results);
      });
    });
  }
}

module.exports = Product;