const services = require('../../services');

const addProduct = async (req, res, _next) => {
  console.log('corpooooooooo', req.body);
  const { name } = req.body;
  try {
    const newProducts = await services.productsServices.addProduct(name);
    return res.status(201).json(newProducts);
  } catch (err) {
    console.log('entrei no catch');
    // next(err);
    return res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = addProduct;
