const express = require('express');
const controllers = require('../controllers');

const productsRoutes = express.Router();

productsRoutes.get('/', controllers.productsControllers.getAllProducts);
productsRoutes.post('/', controllers.productsControllers.addProduct);
productsRoutes.get('/:id', controllers.productsControllers.getProductById);

// addressRoutes.get('/', () => console.log('oi,bb'));

module.exports = productsRoutes;
