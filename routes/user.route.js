const express = require('express')
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/user.controller.js');
const path = require('path');
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage:storage
})

router.get('/', userController.getUsers); 

router.get('/:id', userController.getUser); 

module.exports = router;