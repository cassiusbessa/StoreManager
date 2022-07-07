const express = require('express');
const controllers = require('../controllers');

const salesRoutes = express.Router();

salesRoutes.post('/', controllers.salesControllers.newsSales);
salesRoutes.get('/', controllers.salesControllers.getAllSales);
salesRoutes.get('/:id', controllers.salesControllers.getSalesById);
salesRoutes.delete('/:id', controllers.salesControllers.deleteSales);

module.exports = salesRoutes;
