"use strict";
const express = require('express');

let apiRoutes = express.Router(),
    detectController = require('../Controllers/DetectController');

// Route Detect Request
apiRoutes.route('/detect').get(detectController.processRequest);

module.exports = apiRoutes;