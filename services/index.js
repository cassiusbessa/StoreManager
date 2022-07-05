const { getAllProducts, getProductById, addProduct } = require('./productsServices');
const { newsSales, salesValidator } = require('./salesServices');

module.exports = {
  productsServices: { getAllProducts, getProductById, addProduct },
  salesServices: { newsSales, salesValidator },
};