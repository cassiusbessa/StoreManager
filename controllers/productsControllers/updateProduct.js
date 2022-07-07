const services = require('../../services');

const updateProduct = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    await services.productsServices.updateProduct(id, name);
    return res.status(200).json({ id, name });
  } catch (err) {
    next(err);
  }
};

module.exports = updateProduct;