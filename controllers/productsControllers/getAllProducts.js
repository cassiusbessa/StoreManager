const services = require('../../services');

const getAllProducts = async (_req, res, next) => {
  try {
    const products = await services.productsServices.getAllProducts();
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllProducts;
