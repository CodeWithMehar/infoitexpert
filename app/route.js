const express = require('express');
const { webRoutes } = require('../routes/website');

const router = express.Router();

// Mount all website-related routes under root path
router.use('/', webRoutes);

module.exports = { routes: router };
