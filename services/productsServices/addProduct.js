const models = require('../../models');

const addProduct = async (newProduct) => {
  console.log('serviceeeeee', newProduct);
  const products = await models.productsModels.addProduct(newProduct);
  console.log(products);
  return products;
};

module.exports = addProduct;
