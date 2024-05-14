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

// Login SSO
router.get('/login/google');
router.get('/login/github');

// Get all user API for {admin, normal} user
router.get('/all-users', authMiddleware.checkAuthToken, userController.getUsers); 

// Get profile API for both {admin, normal} user
router.get('/profile/:id', authMiddleware.checkAuthToken, userController.getUser); 

// Update user data
router.patch('/:id',authMiddleware.checkAuthToken)

module.exports = router;