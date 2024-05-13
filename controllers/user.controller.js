const User = require('../models/user.model.js')
const { genSaltSync, hashSync } = require('bcrypt');


const createUser = async (req, res) => {
    try {
        console.log(req.body.name);
        const { name, bio, phone, email, password, is_Admin, is_Public, access_token } = req.body;
        const avatar = req.file;
        console.log(avatar.filename);
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
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(200).json(savedUser).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
    createUser
};