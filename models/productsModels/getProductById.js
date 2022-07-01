const connection = require('../../helpers/connection');

const getProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  console.log(result);
  return result;
};

module.exports = getProductById;
