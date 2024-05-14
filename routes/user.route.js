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

// Create User API
router.post('/', upload.single('photo'), userController.createUser);

// Login API
router.post('/login', upload.none(), userController.loginUser);

// Log out API
router.get('/logout', upload.none(), userController.logoutUser);

// Login SSO
router.post('/login/google', upload.none(), authMiddleware.getUserToken, authMiddleware.getUserData, userController.googleLogin);

// Get all user API for {admin, normal} user
router.get('/all-users', authMiddleware.checkAuthToken, userController.getUsers); 

// Get profile API for both {admin, normal} user
router.get('/profile/:id', authMiddleware.checkAuthToken, userController.getUser); 

// Update user data {name,bio,phone,email,photo,password,is_Admin,is_Public}
router.patch('/:id', upload.none(), authMiddleware.checkAuthToken, userController.updateUserDetails);

// Update user data by upload {photo}
router.patch('/upload/photo/:id',upload.single('photo'), authMiddleware.checkAuthToken, userController.updateUserUploadedPhoto);

// Update user data by url {photo}
router.patch('/upload/photo/url/:id',upload.none(), authMiddleware.checkAuthToken, userController.updateUserPhotoUrl);

// Google code
router.get('/code', userController.getCode);

module.exports = router;