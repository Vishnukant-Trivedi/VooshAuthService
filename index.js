const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route.js')
const dotenv = require('dotenv');
dotenv.config();
const app = express()

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// routes
app.use('/api/user', userRoute);

app.use('/profile', express.static('upload/images'));

app.get('/', (req,res) => {
    res.send('App is running!!');
})


mongoose.connect("mongodb+srv://vishnutrd11:qgZvua2xZigWKkcS@cluster0.lrkquyr.mongodb.net/Voosh_db?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port 3030');
    })
})
.catch(()=>{
    console.log('Connection Failed');
})