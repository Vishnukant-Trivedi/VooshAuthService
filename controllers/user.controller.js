const User = require('../models/user.model.js')


const createUser = async (req, res) => {
    try {
        const { name, bio, phone, email, password, is_Admin, is_Public, access_token } = req.body;
        const avatar = req.file;
        const newUser = new User({
            name,
            bio,
            phone,
            email,
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
        res.status(200).json({message: newUser, token: await newUser.generateToken(), userId: newUser._id.toString(),
        });
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
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err){
        res.status(500).json({message: err.message})
    }
}
 
module.exports = {
    getUsers,
    getUser,
    createUser,
    loginUser
};