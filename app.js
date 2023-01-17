const express = require('express');
const app = express();

// Use dotenv to run local instances with env variables
require('dotenv').config({path: './.env'})

// Calling ENV variables
const
    APP_ID = process.env.APP_ID,
    APP_SECRET = process.env.APP_SECRET,
    VERIFY_TOKEN = process.env.VERIFY_TOKEN,
    NGROK_TOKEN = process.env.NGROK_TOKEN,
    PORT = process.env.PORT,
    SERVER_URL = process.env.SERVER_URL // Will change on new instance of ngrok -- Look for alternative that has permanent URLs 

// Error handling for dotenv
if (!(APP_ID && APP_SECRET && VERIFY_TOKEN && NGROK_TOKEN)) {
    console.error('Missing environment values.');
    process.exit(1);
}

app.get('/getData', function(req, res){
    res.status(200).send({
        success:"true",
        name:"Greeter-Bot",
        response: "Working"
    })
})

app.listen(PORT, ()=>{
    console.log(`server running on port no ${PORT}`)
})

