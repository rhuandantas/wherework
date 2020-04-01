const express = require('express');
const router = express.Router();
const { spot } = require('../controllers');
const multer = require('multer');
const uploadConfig = require('../multer');
const upload = multer(uploadConfig);

router.post('/spot', upload.single('thumbnail'), spot.save);
router.get('/spot', spot.getByTechs);
router.get('/dashboard', spot.getByUserID);

module.exports = router;
