const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile } = require('../Controllers/upload');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), uploadFile);

module.exports = router;
