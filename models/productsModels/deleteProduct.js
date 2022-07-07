const connection = require('../../helpers/connection');

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result.affectedRows;
};

module.exports = deleteProduct;
