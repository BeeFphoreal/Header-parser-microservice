// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

app.set('trust proxy', true)

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', (req, res) => {
  //request for ip, use x-forward in case app is behind proxy so it gets user ip
   const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  //request accepted languages
   const language = req.headers['accept-language'];
  //request user-agent
   const userAgent = req.headers['user-agent'];

console.log(ip);
console.log(language);
console.log(userAgent)
//set format for response into a variable
const response = {
  ipaddress: ip,
   language: language,
    software: userAgent
  };
//response
   res.json(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
