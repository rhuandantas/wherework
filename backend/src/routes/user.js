const express = require('express');
const router = express.Router();
const { user } = require('../controllers');

router.post('/user', user.save);

module.exports = router;
