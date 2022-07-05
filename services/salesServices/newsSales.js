const models = require('../../models');
// const salesSchema = require('../../schemas/salesSchema');
const ErrorObject = require('../../helpers/errorObject');
const httpStatusCode = require('../../helpers/httpStatusCode');

const salesValidator = (sales, products) => {
  if (!sales.productId) {
 throw new ErrorObject('"productId" is required',
    httpStatusCode.BAD_REQUEST); 
  }
  if (!products.some((p) => p.id === sales.productId)) {
 throw new ErrorObject('Product not found',
    httpStatusCode.NOT_FOUND); 
  }
 if (sales.quantity < 1) {
 throw new ErrorObject(
   '"quantity" must be greater than or equal to 1',
   httpStatusCode.UNPROCESSABLE_ENTITY,
 ); 
  } 
  if (!sales.quantity) throw new ErrorObject('"quantity" is required', httpStatusCode.BAD_REQUEST);
};

const newsSales = async (itemsSold) => {
  const allProducts = await models.productsModels.getAllProducts();
  itemsSold.forEach((item) => salesValidator(item, allProducts));
  const id = await models.salesModels.newsSales.dateSale();
  await Promise.all(itemsSold.map((e) =>
    models.salesModels.newsSales.productSale(id, e.productId, e.quantity)));
  // itemsSold.forEach((e) => models.salesModels.newsSales
  //   .productSale(saleId, e.productId, e.quantity).then(null));
  const sale = {
    id, 
    itemsSold,
  };
  return sale;
};

module.exports = { newsSales, salesValidator };
