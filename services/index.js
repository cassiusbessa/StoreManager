const { getAllProducts, getProductById } = require('./productsServices');

module.exports = {
  productsServices: { getAllProducts, getProductById },
};