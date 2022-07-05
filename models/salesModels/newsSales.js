const connection = require('../../helpers/connection');

const productSale = async (id, productId, quantity) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, productId, quantity],
    );
  return ({
    id,
    productId,
    quantity,
  });
};

const dateSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return result.insertId;
};

module.exports = { productSale, dateSale };
