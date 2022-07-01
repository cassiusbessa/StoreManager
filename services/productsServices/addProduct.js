const models = require('../../models');
const ErrorObject = require('../../helpers/errorObject');
const httpStatusCodes = require('../../helpers/httpStatusCode');

const newProductValidator = (name) => {
  if (!name) throw new ErrorObject('"name" is required', httpStatusCodes.BAD_REQUEST);
  if (name.length < 5) {
    throw new ErrorObject(
      '"name" length must be at least 5 characters long',
      httpStatusCodes.UNPROCESSABLE_ENTITY,
    ); 
  }
  return true;
};
const addProduct = async (productName) => {
  newProductValidator(productName);
  if (!productName) { throw new ErrorObject('"name" is required', httpStatusCodes.BAD_REQUEST); }
  if (productName.length < 5) {
    throw new ErrorObject(
      '"name" length must be at least 5 characters long',
      httpStatusCodes.BAD_REQUEST,
    );
  }
  const newProduct = await models.productsModels.addProduct(productName);
  return newProduct;
};

module.exports = addProduct;
