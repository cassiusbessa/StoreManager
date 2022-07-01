const services = require('../../services');

const addProduct = async (req, res) => {
  console.log('corpooooooooo', req.body);
  const { name } = req.body;

  try {
    const newProducts = await services.productsServices.addProduct(name);
    return res.status(201).json(newProducts);
  } catch (err) {
    return res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = addProduct;
