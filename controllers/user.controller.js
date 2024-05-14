const User = require('../models/user.model.js')

const createUser = async (req, res) => {
    try {
        const { name, bio, phone, email, password, is_Admin, is_Public } = req.body;
        const userExists = await User.userExists(email);
        if (userExists) {
            return res.status(400).json({ error: 'User with this email already exists!' });
        }
        const photo = `${process.env.LOCAL_DEV_URL}${req.file.filename}`
        const newUser = new User({
            name,
            bio,
            phone,
            email,
            photo,
            password,
            is_Admin,
            is_Public
        });
        const savedUser = await newUser.save();
        return res.status(200).json({message: "Registration successful! Please login to use services."});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = await user.generateToken();
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        });
        return res.status(200).json({message:"Login successful",token: token });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const getUsers = async (req, res) => {
    try {
        const {is_Admin, userId} = res.isVerified
        if(is_Admin){
            let allProfiles = await User.find({});
            allProfiles = allProfiles.filter(profile => profile._id.toString() !== userId.toString());
            return res.status(200).json(allProfiles);
        }
        const publicProfiles = await User.find({ is_Public: true });
        return res.status(200).json(publicProfiles);
    } catch (err){
        return res.status(500).json({message: err.message})
    }
}

const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        if(res.isVerified.userId != id){
            return res.status(404).json({message: "Unauthorized user"});
        }
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (err){
        return res.status(500).json({message: err.message})
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        if(res.isVerified.userId != userId){
            return res.status(404).json({message: "Unauthorized user"});
        }
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({message: "User updated successfully"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateUserUploadedPhoto = async (req, res) => {
    try {
        const userId = req.params.id;
        if(res.isVerified.userId != userId){
            return res.status(404).json({message: "Unauthorized user"});
        }
        const photo = `${process.env.LOCAL_DEV_URL}${req.file.filename}`
        const updatedUser = await User.findByIdAndUpdate(userId, {photo}, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({message: "User photo updated successfully"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateUserPhotoUrl = async (req, res) => {
    try {
        const userId = req.params.id;
        if(res.isVerified.userId != userId){
            return res.status(404).json({message: "Unauthorized user"});
        }
        const { photo } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, {photo}, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({message: "User photo url updated successfully"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const googleLogin = async (req, res) => {
    try {
        const { name, email} = res.userMetaData;
        const photo = res.userMetaData.picture;
        delete res.userMetaData;
        const userExists = await User.userExists(email);
        if (userExists) {
            const user = await User.findOne({ email });
            const token = await user.generateToken();
            return res.status(200).json({message:"Login successful",token: token });
        }
        const newUser = new User({
            name,
            email,
            photo,
            password:email,
            provider: "Google"
        });
        const savedUser = await newUser.save();
        return res.status(200).json({message: "Registration successful! Please login to use services."});   
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true
    });
    res.status(200).json({ message: 'Log-out successful' });
}

const getCode = async (req, res) => {
    const { code }= req.query;
    if (!code) {
        return res.status(400).json({ error: 'Missing code parameter' });
    }
    res.status(200).json({ message: 'Code received successfully', code });
}
 
module.exports = {
    getUsers,
    getUser,
    createUser,
    loginUser,
    updateUserDetails,
    updateUserUploadedPhoto,
    updateUserPhotoUrl,
    googleLogin,
    logoutUser,
    getCode
};