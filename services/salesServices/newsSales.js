const models = require('../../models');

const newsSales = async (itemsSold) => {
  console.log('service>>>>>>>>>>', itemsSold);
  const saleId = await models.salesModels.newsSales.dateSale();
  console.log('saleId', saleId);
  await Promise.all(itemsSold.map((e) => models.salesModels
  .newsSales.productSale(saleId, e.productId, e.quantity)));
  // itemsSold.forEach((e) => models.salesModels.newsSales
  //   .productSale(saleId, e.productId, e.quantity).then(null));
  const sale = {
    saleId,
    itemsSold,
  };
  console.log('service >>>>>', sale);
  return sale;
};

module.exports = newsSales;
