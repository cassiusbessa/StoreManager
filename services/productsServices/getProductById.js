const models = require('../../models');
const ErrorObject = require('../../helpers/errorObject');

const productValidator = (product) => {
  if (!product) throw new ErrorObject('Product not found', 404);
};

const getProductById = async (id) => {
  const [product] = await models.productsModels.getProductById(id);
  productValidator(product);
  return product;
};

module.exports = getProductById;
