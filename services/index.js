const { getAllProducts, getProductById, addProduct } = require('./productsServices');
const { newsSales } = require('./salesServices');

module.exports = {
  productsServices: { getAllProducts, getProductById, addProduct },
  salesServices: { newsSales },
};