// Use dotenv to run local instances with env variables
require('dotenv').config({path: './.env'});
const request = require("request");
const fs = require('fs'); // file structure for downloading files and reading etc. 

const file = fs.createWriteStream('emails-13.csv'); // add in unique naming conventions after. Also find somewhere to store files rather than on local directory. 

let getWebhook = (req, res) => {
    // Verify token. Should be a random string
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN 

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Check if token and mode is in the query string of the request
    if (mode && token) {

        // checks the mmode and token sent is correct
        if (mode = 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the requests
            console.log('WEBHOOK VERIFIED')
            res.status(200).send(challenge);
        } else {
            // responds with '403 forbidden' if verify tokens do not match
            res.sendstatus(403);
        }
    }
}

let postWebhook = (req, res) => {
    console.log(`req.body = ${req.body}`)
    let body = req.body;
    console.log(`cb line 32 - ${body}`)

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterate over each entry - can be multiple if batched
        body.entry.forEach(function (entry) {
            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0]
            console.log(webhook_event)

            // Grab url of .csv file
            // The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth
            // flatmap() does the same and maps the item thereafter
            let url = body.entry
                .flatMap(entry => entry.messaging)
                .flatMap(messaging => messaging.message.attachments)
                .find(attachment => attachment.type === "file")
                .payload.url;
            console.log(`51 - URL : ${url}`);

            // get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log(`Sender PSID: ${sender_psid}`)

                    
            let downloadCSV = (req, res) => {
                request.get(url)
                .pipe(file)
                .on('finish', () => {
                    console.log('File successfully downloaded');
                })
            }

            downloadCSV();
        })

        // returns '200 OK' response to all requests
        res.status(200).send('EVENT RECEIVED')


    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

}

const  exportObject = {
    getWebhook, 
    postWebhook
};
  
module.exports = exportObject;
