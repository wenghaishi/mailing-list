const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/sign_up.html')
})

app.post('/', (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      { 
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://us9.api.mailchimp.com/3.0/lists/b832680292';

  const options = {
    method: "POST",
    auth: "sam:64af96b9e1ede50c3c6b45ac59b972e8-us9"
  };

  const request = https.request(url, options, (response) => {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

})

app.listen(3000, () => {
  console.log("server at port 3000")
});