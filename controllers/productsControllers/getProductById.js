const services = require('../../services');

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await services.productsServices.getProductById(id);
    return res.status(200).json(products);
  } catch (err) {
    return res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = getProductById;
