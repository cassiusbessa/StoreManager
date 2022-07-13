const connection = require('../../helpers/connection');

const updateProduct = async (name, id) => {
  const result = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  console.log(result);
  return result[0].affectedRows;
};

module.exports = updateProduct;
