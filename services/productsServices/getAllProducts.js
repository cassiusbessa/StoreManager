const models = require('../../models');

const getAllProducts = async () => {
  const products = await models.productsModels.getAllProducts();
  return products;
};

module.exports = getAllProducts;
