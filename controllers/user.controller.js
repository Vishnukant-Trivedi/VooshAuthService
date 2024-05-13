const User = require('../models/user.model.js')


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
    getUser
};