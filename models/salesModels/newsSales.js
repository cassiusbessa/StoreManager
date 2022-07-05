const connection = require('../../helpers/connection');

const productSale = async (id, productId, quantity) => {
    console.log('cheguei na models', id, productId, quantity);
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, productId, quantity],
    );
  console.log('passei do connection');
  return ({
    id,
    productId,
    quantity,
  });
};

const dateSale = async () => {
  console.log('outro models hein');
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  console.log(result);
  return result.insertId;
};

module.exports = { productSale, dateSale };
