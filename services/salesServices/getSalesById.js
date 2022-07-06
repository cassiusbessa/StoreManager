const models = require('../../models');
const ErrorObject = require('../../helpers/errorObject');
const httpStatusCode = require('../../helpers/httpStatusCode');

const salesValidator = (sales) => {
  if (!sales || sales.length === 0) {
 throw new ErrorObject(
    'Sale not found', httpStatusCode.NOT_FOUND,
); 
}
};

const serialize = (sale) => ({
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});
const getSalesById = async (id) => {
  const sales = await models.salesModels.getSalesById(id);
  salesValidator(sales);
  return sales.map((s) => serialize(s));
};

module.exports = getSalesById;