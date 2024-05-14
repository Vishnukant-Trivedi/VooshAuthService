const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route.js')
const cookieParser = require('cookie-parser');
const { swaggerServer, swaggerSetup } = require('./config.js')
require('dotenv').config();
const app = express()


// routes
app.use('/api/user', userRoute);
app.use('/api-docs', swaggerServer, swaggerSetup);

// middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use('/profile', express.static('upload/images'));

app.get('/', (req,res) => {
    res.send('App is running!!');
})


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port 3030');
    })
})
.catch(()=>{
    console.log('Connection Failed');
})