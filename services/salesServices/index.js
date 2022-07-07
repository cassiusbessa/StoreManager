const { newsSales, salesValidator } = require('./newsSales');
const getSalesById = require('./getSalesById');
const getAllSales = require('./getAllSales');
const deleteSales = require('./deleteSales');

module.exports = {
  newsSales,
  salesValidator,
  getSalesById,
  getAllSales,
  deleteSales,
};