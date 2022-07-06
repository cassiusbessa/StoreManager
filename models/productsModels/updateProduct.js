const connection = require('../../helpers/connection');

const updateProduct = async (name, id) => {
  console.log(name, id);
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  console.log('amei no models');
  console.log('>>>>>>', result.affectedRows);
  return result.affectedRows;
};

module.exports = updateProduct;
