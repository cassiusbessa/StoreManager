const express = require('express');
const controllers = require('../controllers');

const salesRoutes = express.Router();

salesRoutes.post('/', controllers.salesControllers.newsSales);

module.exports = salesRoutes;
