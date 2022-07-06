const connection = require('../../helpers/connection');

const getSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity 
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales
    ON StoreManager.sales_products.sale_id = StoreManager.sales.id WHERE sale_id = ?`, [id],
  );
  return result;
};

module.exports = getSalesById;