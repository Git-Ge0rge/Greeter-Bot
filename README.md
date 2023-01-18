# Greeter Bot

## Workplace by Meta - Custom Integration

### About the Project

Greeter Bot is a great organizational tool used to clean out inactive users from a company's database. Greeter bot utilizes .csv files to be able to send a basic greeting message to all users (emails) contained within the .csv file. If the user is a current member of the workplace, it will send a success (Status 200 HTTP code).

### Technologies Used

- JavaScript
- Node
- Git
- Fast-csv? node-csv?

### Task

You are required to build a Workplace chatbot that accepts a csv file from a Workplace user as input and sends a greeting message to the emails in csv if they exist on Workplace.

After sending all the messages, the bot should return the csv to the original user with added column to show if the message was sent.

The original csv should have one column email and the returned csv should have two columns email and message status. The message status column can have any of the three values (SUCCESS, FAILURE(Network Issue), USER_DOES_NOT_EXIST).

### Thought Process

To get this done, a few things need to happen. Let's break down this problem.

**1. Accepting the CSV file:** We can use the multer middleware for Express to handle file uploads and accept a CSV file as input. In this specific use case, I would assume we would need to setup a webhook to grab the file from the messenger chat to be able to be read, manipulated, and have requests executed upon the stored data. (I ended up trying to configure a webhook via NGROK instead of using Multer as it did not fit this use case.)

**1.5. CSV STORAGE:** Will we need to store the csv file anywhere while the file is being read, executed upon and overwritten? (AWS Bucket, google drive api etc.). Currently CSV files are being written to the local directory.

**2. Reading the CSV file:** Once the chatbot has received the CSV file, it will need to be able to read the contents of the file. We can use a library like csv-parser or fast-csv to read the contents of the CSV file, which will give us an array of objects, where each object represents a row in the CSV file.

**3. Sending the messages:** Once the chatbot has the list of email addresses, it will need to send a message to each one. To do this, we can use the Workplace Graph API.

To check if user exist in the workplace we will have to use the /user endpoint of the API and check if user is present or not. If present then we can send message, otherwise we can mark the status as USER_DOES_NOT_EXIST

**4. Returning the CSV:** After sending the messages, the chatbot will need to return the original CSV file to the user, with an added column to show the message status. We can add the status column by iterating through the array of objects and adding a new key-value pair to each object. We can return the modified CSV using response.send() or response.download() method of express.

**5. Error handling:** We will need to handle the cases where the message was not sent or if the network issue occurs. We can use try-catch block to handle errors.

### Getting Started

- "/Users/george/Downloads/ngrok http 4040" to start up ngrok server. // /Users/george/Downloads/ngrok http --host-header=rewrite localhost:4040

- Node App.js to start bot.
- Auto start scripts to be added.

### Screenshots

- To be added.

### Next Steps / Ice Box Features

- To be added.
