const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/sign_up.html')
})

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
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
  }

  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

})

app.listen(3000, () => {
  console.log("server at port 3000")
});