const express = require('express');

const {processPayment } = require('../controllers/payment.controller.js');
const validateToken = require('../utils/validateToken.js');


const router = express.Router();

router.post('/', validateToken, processPayment)

module.exports = router;
