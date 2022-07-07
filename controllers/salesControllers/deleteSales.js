const services = require('../../services');

const deleteSales = async (req, res, next) => {
  const { id } = req.params;
  try {
    await services.salesServices.deleteSales(id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = deleteSales;
