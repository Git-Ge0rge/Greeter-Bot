const express = require('express');
const app = express();

app.get('/getData', function(req, res){
    res.status(200).send({
        success:"true",
        name:"Greeter-Bot",
        response: "Working"
    })
})

const PORT = 5555
app.listen(PORT, ()=>{
    console.log(`server running on port no ${PORT}`)
})