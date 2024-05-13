const mongoose = require('mongoose');
const { genSaltSync, hashSync, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        required: false
    }
},
{
    timestamps: true
}
); 

UserSchema.pre("save", async function(next){
    const user = this

    if(!user.isModified("password")){
        next();
    }
    try {
        const saltRound = genSaltSync(10);
        const hash_password = hashSync(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await compare(candidatePassword, this.password);
    } catch (error) {
        console.error(error);
    }
};

UserSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            is_Admin: this.is_Admin,
            is_Public: this.is_Public
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1d"
        }
    );
    } catch (error) {
        console.error(error);
    }
};


const User = mongoose.model('User', UserSchema);
module.exports = User;