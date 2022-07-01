const services = require('../../services');

const getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const products = await services.productsServices.getProductById(id);
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

module.exports = getProductById;
