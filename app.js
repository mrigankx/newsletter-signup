//jshint esversion: 6
const express = require('express');
const app = express();
const request = require("request");
const bodyparser = require("body-parser");
const https = require("https");
const port = process.env.PORT;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html"); 
});
app.post("/", (req, res) => {
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]

    };
    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/c34235ce17";
    const options = {
        method: "POST",
        auth: "mrigankx:3c60af6bce2ab58330e2b56c4604abac-us7"
    };
    const request = https.request(url, options, (response) => {
        var status = response.statusCode;
        if (status == 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on('data', (data) => {
            console.log(JSON.parse(data));
        });
    });
    // request.write(jsonData);
    request.end();
});
app.listen(port || 3000, () => {
    console.log("Server is running on port: " + port); 
});


//api: 3c60af6bce2ab58330e2b56c4604abac-us7
//list-id: c34235ce17