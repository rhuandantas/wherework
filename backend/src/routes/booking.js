const express = require('express');
const router = express.Router();
const { booking } = require('../controllers');

router.post('/spot/:id/booking', booking.save);
router.post('/booking/:id/approval', booking.approval);
router.post('/booking/:id/rejection', booking.rejection);

module.exports = router;
