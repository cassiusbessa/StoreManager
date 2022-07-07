const express = require('express');
const controllers = require('../controllers');

const productsRoutes = express.Router();

productsRoutes.get('/', controllers.productsControllers.getAllProducts);
productsRoutes.post('/', controllers.productsControllers.addProduct);
productsRoutes.put('/:id', controllers.productsControllers.updateProduct);
productsRoutes.get('/:id', controllers.productsControllers.getProductById);
productsRoutes.delete('/:id', controllers.productsControllers.deleteProduct);

module.exports = productsRoutes;
