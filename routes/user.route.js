const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage:storage
})
router.post('/', upload.single('photo'), userController.createUser);
router.post('/login',upload.none(),userController.loginUser);
router.get('/all-users',authMiddleware.checkAuthToken, userController.getUsers); 
router.get('/:id', userController.getUser); 

module.exports = router;