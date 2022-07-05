const services = require('../../services');

const newsSales = async (req, res, next) => {
  const sales = req.body;
  console.log('controller>>>>>>>>>>>>>>>', sales);
  try {
    console.log('entrei no try');
    const newSale = await services.salesServices.newsSales(sales);
    return res.status(201).json(newSale);
  } catch (err) {
    next(err);
  }
};

module.exports = newsSales;