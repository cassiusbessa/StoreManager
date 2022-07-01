const { getAllProducts, getProductById, addProduct } = require('./productsModels');

module.exports = {
  productsModels: { getAllProducts, getProductById, addProduct },
};