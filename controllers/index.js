const { getAllProducts, getProductById, addProduct } = require('./productsControllers');
const { newsSales, getSalesById, getAllSales } = require('./salesControllers');

module.exports = {
  productsControllers: { getAllProducts, getProductById, addProduct },
  salesControllers: { newsSales, getSalesById, getAllSales },
};