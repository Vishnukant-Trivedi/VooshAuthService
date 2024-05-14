const jwt = require('jsonwebtoken');
const axios = require('axios');
const decodeUriComponent = require('decodeuricomponent');

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

const getUserToken = async (req, res, next) => {
    try {
        const code = decodeUriComponent(req.body.code);
        const response = await axios({
            method: 'post',
            url: process.env.GOOGLE_ACCESS_TOKEN_URL,
            params: {
              code: code,
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              grant_type: 'authorization_code',
              redirect_uri: 'http://localhost:3030'
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          res.tokenMetaData = response.data;
        next();  
    } catch (error) {
        res.status(500).json({message:"Axios Error: Please generate new code"})
    }
}

const getUserData = async (req, res, next) => {
    try {
        const { access_token, id_token } = res.tokenMetaData;
        const response = await axios({
            method: 'get',
            url: process.env.GOOGLE_GET_USER_URL,
            params: {
              alt: 'json',
              access_token: access_token
            },
            headers: {
              Authorization: `Bearer ${id_token}`
            }
          });
          res.userMetaData = response.data
          delete res.tokenMetaData;
        next();  
    } catch (error) {
        res.status(500).json({message:"Axios Error: Please generate new code"})
    }
}


module.exports ={
    checkAuthToken,
    getUserToken,
    getUserData
}