const { getAllProducts, getProductById, addProduct } = require('./productsModels');
const { newsSales } = require('./salesModels');

module.exports = {
  productsModels: { getAllProducts, getProductById, addProduct },
  salesModels: { newsSales },
};