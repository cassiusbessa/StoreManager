const connection = require('../../helpers/connection');

const updateProduct = async (name, id) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return result.affectedRows;
};

module.exports = updateProduct;
