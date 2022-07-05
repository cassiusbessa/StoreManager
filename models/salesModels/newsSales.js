const connection = require('../../helpers/connection');

const productSale = async (saleId, productId, quantity) => {
    console.log('cheguei na models', saleId, productId, quantity);
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, productId, quantity],
    );
  console.log('passei do connection');
  return ({
    saleId,
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
