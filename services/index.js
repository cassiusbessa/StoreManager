const { getAllProducts, getProductById, addProduct } = require('./productsServices');
const { newsSales, salesValidator, getSalesById, getAllSales } = require('./salesServices');

module.exports = {
  productsServices: { getAllProducts, getProductById, addProduct },
  salesServices: { newsSales, salesValidator, getSalesById, getAllSales },
};