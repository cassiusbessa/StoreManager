const { getAllProducts, getProductById, addProduct, updateProduct } = require('./productsModels');
const { newsSales, getSalesById, getAllSales } = require('./salesModels');

module.exports = {
  productsModels: { getAllProducts, getProductById, addProduct, updateProduct },
  salesModels: { newsSales, getSalesById, getAllSales },
};