const { getAllProducts, getProductById, addProduct } = require('./productsControllers');

module.exports = {
  productsControllers: { getAllProducts, getProductById, addProduct },
};