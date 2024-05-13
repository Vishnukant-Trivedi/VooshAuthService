const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/', (req,res) => {
    res.send('App is running!!');
})


mongoose.connect("mongodb+srv://vishnutrd11:qgZvua2xZigWKkcS@cluster0.lrkquyr.mongodb.net/Voosh_db?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to Database");
    app.listen(3033, () => {
        console.log('Server is running on port 3033');
    })
})
.catch(()=>{
    console.log('Connection Failed');
})