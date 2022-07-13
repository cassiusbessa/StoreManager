const connection = require('../../helpers/connection');

const updateSales = async (productId, quantity, id) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = id',
    [productId, quantity, id],
  );
  return {
    id,
    productId,
    quantity,
  };
};

module.exports = updateSales;
