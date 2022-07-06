const connection = require('../../helpers/connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
  `SELECT sale_id, date, product_id, quantity FROM StoreManager.sales_products
  INNER JOIN StoreManager.sales
  ON StoreManager.sales_products.sale_id = StoreManager.sales.id`,
  );
  return result;
};

module.exports = getAllSales;
