// Use dotenv to run local instances with env variables
require('dotenv').config({path: './.env'});
const request = require("request");

// Initializing csv read/write tools - fs, fast-csv, etc.
// FAST-CSV
const fs = require('fs') // file structure library for downloading files and reading etc. 
const csv = require('fast-csv');
const data = [] // stays empty and will console log as empty even after adding new file. unless a file is already there then

const downloadFile = fs.createWriteStream('emails-13.csv'); // add in unique naming conventions after. Also find somewhere to store files rather than on local directory. 
// https://www.makeuseof.com/node-js-csv-files-read-how/
const readFile = fs.readFile('emails-13.csv', 'utf8', function (err, data) {
        // parse data  
})
// const readline = require("readline");
// const stream = fs.createReadStream("./emails-13.csv");
// const rl = readline.createInterface({ input: stream });

// Creating temporary readstream for csv reading // move this out of this function after
    // rl.on("line", (row) => {
    //     data.push(row.split(","));    
    // });
                    
    // rl.on("close", () => {
    //     console.log(`83 --- CSV DATA: ${data}`);
    // });

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
            // console.log(`51 - URL : ${url}`);

            // get the sender PSID
            let sender_psid = webhook_event.sender.id;

            // Download the CSV to local directory 
            let downloadCSV = (req, res) => {
                request.get(url)
                .on('response', () => { // response listener added to wait for response from url before trying to read the file thats being downloaded
                    console.log("File is downloading...")

                    // Creating the read stream to work with each entry individually. 
                    fs.createReadStream('./emails-13.csv')
                    .pipe(csv.parse({ headers: true }))
                    .on('error', error => console.error(error))
                    .on('data', row => data.push(row))
                    .on('end', () => console.log(`92 --- CSV DATA:${data}`));
                })
                .pipe(downloadFile)
                .on('finish', () => {
                    console.log('File successfully downloaded');
                });
            }
            
            downloadCSV(); // calling the function 

             
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
