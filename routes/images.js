const { Router } = require('express');
const multer = require('multer');
const { uploadFileToS3 } = require('../controllers/profile');

const upload = multer({ dest: 'uploads/' });

const imageRouter = Router();

imageRouter.post('', upload.single('image'), uploadFileToS3);

module.exports = imageRouter;
