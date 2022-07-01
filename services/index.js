const { getAllProducts, getProductById, addProduct } = require('./productsServices');

module.exports = {
  productsServices: { getAllProducts, getProductById, addProduct },
};