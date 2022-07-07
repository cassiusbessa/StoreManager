const { getAllProducts, getProductById, addProduct, deleteProduct,
  updateProduct } = require('./productsServices');
const { newsSales, salesValidator, getSalesById, getAllSales } = require('./salesServices');

module.exports = {
  productsServices: { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct },
  salesServices: { newsSales, salesValidator, getSalesById, getAllSales },
};