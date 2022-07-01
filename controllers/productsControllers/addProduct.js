const services = require('../../services');

const addProduct = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newProducts = await services.productsServices.addProduct(name);
    return res.status(201).json(newProducts);
  } catch (err) {
    console.log('entrei no catch');
    next(err);
  }
};

module.exports = addProduct;
