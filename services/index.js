const { getAllProducts, getProductById, addProduct, updateProduct } = require('./productsServices');
const { newsSales, salesValidator, getSalesById, getAllSales } = require('./salesServices');

module.exports = {
  productsServices: { getAllProducts, getProductById, addProduct, updateProduct },
  salesServices: { newsSales, salesValidator, getSalesById, getAllSales },
};