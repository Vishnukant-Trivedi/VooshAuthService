const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your Name"]
    },
    bio:{
        type: String,
        required: [true, "Please enter your Bio"]
    },
    phone:{
        type: String,
        required: [true, "Please enter your Phone Number"],
        default:"1234567890"
    },
    email:{
        type: String,
        required: [true, "Please enter your Email"],
        default:"yourName@email.com"
    },
    password:{
        type: String,
        required:[true, "Please enter your Password"]
    },
    photo:{
        type: String,
        required:false
    },
    is_Admin:{
        type: Boolean,
        required: true,
        default: false
    },
    is_Public:{
        type:Boolean,
        required: true,
        default: false
    },
    access_token:{
        type: String,
        required: true
    }
},
{
    timestamps: true
}
); 

const User = mongoose.model('User', UserSchema);
module.exports = User;