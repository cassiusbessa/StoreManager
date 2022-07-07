const connection = require('../../helpers/connection');

const deleteSale = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return result.affectedRows;
};

module.exports = deleteSale;
