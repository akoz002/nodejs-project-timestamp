/*
 * freeCodeCamp APIs and Microservices Certification
 * Project 1: Timestamp Microservice
 * Alex Kozlov, 2020
 */

/*
 * The main node.js app script for the Timestamp Microservice.
 */

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// mount the asset folder 'public'
app.use(express.static('public'));

// serve 'index.html' at the root path
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * The Timestamp Microservice API endpoint.
 */
app.get("/api/timestamp/:date_string?", function (req, res) {
  console.log(`Received request with date string: '${req.params.date_string}'`);

  // isNaN() converts to Number and then checks the result for NaN
  let date;
  if (req.params.date_string === undefined) {
    // use the current time
    date = new Date();
  }
  else if (isNaN(req.params.date_string)) {
    // it's a string
    date = new Date(req.params.date_string);
  }
  else {
    // it's a number
    date = new Date(Number(req.params.date_string));
  }

  // compose the response JSON
  if (date.toUTCString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }
  else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// listen for requests
require('dotenv').config();
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('App is listening on port: ' + listener.address().port);
});
