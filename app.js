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

  return app.use("/", router)
}

const  exportObject = {
  initWebRoutes
};

module.exports = exportObject;


// // Creates the endpoint for our webhook 
// app.post('/webhook', (req, res) => {  
//     console.log("Post request started")
//     let body = req.body;
  
//     // Checks this is an event from a page subscription
//     if (body.object === 'page') {
  
//       // Iterates over each entry - there may be multiple if batched
//       body.entry.forEach(function(entry) {
  
//         // Gets the message. entry.messaging is an array, but 
//         // will only ever contain one message, so we get index 0
//         let webhook_event = entry.messaging[0];
//         console.log(webhook_event);
//       });
  
//       // Returns a '200 OK' response to all requests
//       res.status(200).send('EVENT_RECEIVED');
//     } else {
//       // Returns a '404 Not Found' if event is not from a page subscription
//       res.sendStatus(404);
//     }
  
//   });

// app.get('/getData', function(req, res){
//     res.status(200).send({
//         success:"true",
//         name:"Greeter-Bot",
//         response: "Working"
//     })
// })




