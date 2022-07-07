const models = require('../../models');
const ErrorObject = require('../../helpers/errorObject');
const httpStatusCode = require('../../helpers/httpStatusCode');

const productFoundValidator = (row) => {
  if (!row) { throw new ErrorObject('Sale not found', httpStatusCode.NOT_FOUND); }
};

const deleteSales = async (id) => {
  const result = await models.salesModels.deleteSales(id);
  productFoundValidator(result);
  return result;
};

module.exports = deleteSales;
