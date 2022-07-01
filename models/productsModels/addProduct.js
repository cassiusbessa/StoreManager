const connection = require('../../helpers/connection');

const addProduct = async (newProduct) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [newProduct],
  );
  const product = {
    id: result.insertId,
    name: newProduct,
  };
  return product;
};

module.exports = addProduct;
