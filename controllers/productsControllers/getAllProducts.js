const services = require('../../services');

const getAllProducts = async (_req, res) => {
  try {
    const products = await services.productsServices.getAllProducts();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = getAllProducts;
