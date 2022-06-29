const { getAllProducts, getProductById } = require('./productsControllers');

module.exports = {
  productsControllers: { getAllProducts, getProductById },
};