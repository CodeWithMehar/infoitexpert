let express = require('express');
const { contact, popup } = require('../controler/websiteControler');
let webRoutes = express.Router();
// contact form api
webRoutes.post('/contact' , contact)
// popup form API
webRoutes.post('/popup' , popup)
module.exports = {webRoutes}
