const express = require('express');
const router = express.Router();
const { booking } = require('../controllers');

router.post('/spot/:id/booking', booking.save);

module.exports = router;
