const { getAllProducts, getProductById, addProduct, deleteProduct,
  updateProduct } = require('./productsControllers');
const { newsSales, getSalesById, getAllSales, deleteSales } = require('./salesControllers');

module.exports = {
  productsControllers: { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct },
  salesControllers: { newsSales, getSalesById, getAllSales, deleteSales },
};