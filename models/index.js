const { getAllProducts, getProductById, addProduct, updateProduct,
  deleteProduct } = require('./productsModels');
const { newsSales, getSalesById, getAllSales } = require('./salesModels');

module.exports = {
  productsModels: { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct },
  salesModels: { newsSales, getSalesById, getAllSales },
};