const express = require('express');
const productsRoutes = require('./products.routes');
const salesRoutes = require('./sales.routes');

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/sales', salesRoutes);

module.exports = router;
