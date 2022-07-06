const { getAllProducts, getProductById, addProduct } = require('./productsModels');
const { newsSales, getSalesById, getAllSales } = require('./salesModels');

module.exports = {
  productsModels: { getAllProducts, getProductById, addProduct },
  salesModels: { newsSales, getSalesById, getAllSales },
};