const models = require('../../models');
const ErrorObject = require('../../helpers/errorObject');
const httpStatusCode = require('../../helpers/httpStatusCode');

const updateNameValidator = (name) => {
  console.log('validator>>>', name);
  if (!name) throw new ErrorObject('"name" is required', httpStatusCode.BAD_REQUEST);
  if (name.length < 5) {
    throw new ErrorObject(
      '"name" length must be at least 5 characters long',
      httpStatusCode.UNPROCESSABLE_ENTITY,
    ); 
}
};

const productFoundValidator = (row) => {
  if (!row) throw new ErrorObject('Product not found', httpStatusCode.NOT_FOUND);
};

const updateProduct = async (id, name) => {
  updateNameValidator(name);
  const result = await models.productsModels.updateProduct(name, id);
  productFoundValidator(result);
  return result;
};

module.exports = updateProduct;
