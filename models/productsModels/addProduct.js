const connection = require('../../helpers/connection');

const addProduct = async (productName) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [productName],
  );
  const product = {
    id: result.insertId,
    name: productName,
  };
  return product;
};

module.exports = addProduct;
