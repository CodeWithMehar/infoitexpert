const express = require('express');
const { webRoutes } = require('../routes/website');
let routes = express.Router();
routes.use(webRoutes)
module.exports = {routes}