const addProduct = require('./addProduct');
const getAllProducts = require('./getAllProducts');
const getProductById = require('./getProductById');
const updateProduct = require('./updateProduct');
const deleteProduct = require('./deleteProduct');

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};