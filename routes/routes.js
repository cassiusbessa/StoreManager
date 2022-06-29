const express = require('express');
const productsRoutes = require('./products.routes');

const router = express.Router();

router.use('/products', productsRoutes);

module.exports = router;
