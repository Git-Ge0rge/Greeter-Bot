const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

// Use dotenv to run local instances with env variables
require('dotenv').config({path: './.env'})

//config body-parser to post data 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// calling external utilities
const chatbotController = require("./chatbotController")
const userService = require("./userService")

// Calling ENV variables
const
    APP_ID = process.env.APP_ID,
    APP_SECRET = process.env.APP_SECRET,
    VERIFY_TOKEN = process.env.VERIFY_TOKEN,
    FB_TOKEN = process.env.FB_TOKEN,
    NGROK_TOKEN = process.env.NGROK_TOKEN,
    PORT = process.env.PORT,
    SERVER_URL = process.env.SERVER_URL // Will change on new instance of ngrok -- Look for alternative that has permanent URLs 

// Error handling for dotenv
if (!(APP_ID && APP_SECRET && VERIFY_TOKEN && NGROK_TOKEN)) {
    console.error('Missing environment values.');
    process.exit(1);
}

// app.listen(PORT, ()=>{
//   console.log(`server running on port no ${PORT}`)
  
// })

let initWebRoutes = (app) => {
  // router.get("/", chatbotController.test)
  
  router.get("/webhook", chatbotController.getWebhook)
  router.post("/webhook", chatbotController.postWebhook)
  router.get('/user', (req, res) => {
    // call the userLookup function
    userService.userLookup();
    res.send('Searching for user...');
});

  return app.use("/", router)
}

const  exportObject = {
  initWebRoutes
};

module.exports = exportObject;


