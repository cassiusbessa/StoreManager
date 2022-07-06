const services = require('../../services');

const getSalesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await services.salesServices.getSalesById(id);
    return res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

module.exports = getSalesById;
