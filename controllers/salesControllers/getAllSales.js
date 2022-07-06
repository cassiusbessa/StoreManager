const services = require('../../services');

const getAllSales = async (_req, res, next) => {
  console.log('amei no controllers');
  try {
    const sales = await services.salesServices.getAllSales();
    return res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllSales;
