const { getAllProducts, getProductById, addProduct } = require('./productsControllers');
const { newsSales } = require('./salesControllers');

module.exports = {
  productsControllers: { getAllProducts, getProductById, addProduct },
  salesControllers: { newsSales },
};