const models = require('../../models');
const ErrorObject = require('../../helpers/errorObject');
const httpStatusCode = require('../../helpers/httpStatusCode');

const productFoundValidator = (row) => {
  if (!row) throw new ErrorObject('Product not found', httpStatusCode.NOT_FOUND);
};

const deleteProduct = async (id) => {
  const result = await models.productsModels.deleteProduct(id);
  productFoundValidator(result);
  return result;
};

module.exports = deleteProduct;
