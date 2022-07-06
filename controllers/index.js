const { getAllProducts, getProductById, addProduct,
  updateProduct } = require('./productsControllers');
const { newsSales, getSalesById, getAllSales } = require('./salesControllers');

module.exports = {
  productsControllers: { getAllProducts, getProductById, addProduct, updateProduct },
  salesControllers: { newsSales, getSalesById, getAllSales },
};