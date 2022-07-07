const services = require('../../services');

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await services.productsServices.deleteProduct(id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = deleteProduct;
