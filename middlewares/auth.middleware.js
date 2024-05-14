const jwt = require('jsonwebtoken');

const checkAuthToken = async (req, res, next) => {
    const  token = req.header('Authorization');
    if(!token){
        return res.status(401).json({ message:"Unauthorized HTTP, Token not provided" }).send();
    }
    const jwtToken = token.replace("Bearer","").trim();
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
        res.isVerified = isVerified;
        next();   
    } catch (error) {
        res.status(500).json({message: error.message + " Token"})
    }
}


module.exports ={
    checkAuthToken
}