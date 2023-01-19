require('dotenv').config({path: './.env'});
const axios = require('axios');

// Calling ENV variables
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const FB_TOKEN = process.env.FB_TOKEN;

const email = "george.haddad77@yahoo.com";

const url = `GET https://graph.facebook.com/v14.0/george/search?type=user&q=${email}&access_token=${FB_TOKEN}`

// add params for pass through of the forEach afterwards. Currently Hardcoded for my main email
const userLookup = () => {
    axios.get(url)
        .then(function (response) {
            if(response.data.data.length>0){
                console.log(`User found: ${response.data.data[0].name}`);
            }else{
                console.log(`User not found.`);
            }
        })
        .catch(function (error) {
        console.log(`Error searching user: ${error}`);
        });  
}

const exportObject = {
    userLookup
};
  
module.exports = exportObject;
