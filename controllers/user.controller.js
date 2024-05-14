const User = require('../models/user.model.js')


const createUser = async (req, res) => {
    try {
        const { name, bio, phone, email, password, is_Admin, is_Public, access_token } = req.body;
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
            is_Public,
            access_token
        });
        const savedUser = await newUser.save({
            name,
            bio,
            phone,
            email,
            password,
            is_Admin,
            is_Public,
            access_token
        });
        res.status(200).json({message: "Registration successful! Please login to use services."});
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        res.status(200).json({message:"Login successful",token: token });
    } catch (error) {
        res.status(500).json({ message: error });
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
        res.status(200).json(publicProfiles);
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        if(res.isVerified.userId != id){
            return res.status(404).json({message: "Unauthorized user"});
        }
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err){
        res.status(500).json({message: err.message})
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
        console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
 
module.exports = {
    getUsers,
    getUser,
    createUser,
    loginUser,
    updateUserDetails
};