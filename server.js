require('dotenv').config();

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const appPage = require('./app')

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config web routes
appPage.initWebRoutes(app);

let port = process.env.PORT || 4040;

app.listen(port, () => {
    console.log(`SERVER JS 19 - Messenger bot is running at the port ${port}`);
});