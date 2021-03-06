
# API Project: Timestamp Microservice for FCC

### User stories:

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure 
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
5. If the date string is **invalid** the api returns a JSON having the structure `{"error" : "Invalid Date" }`.

### Demo App

A demo app can be found at the link below. At the backend it is implemented in *Node.js* and *Express*. The server source can be found in `server.js`. At the frontend the app contains a *React* component for fetching and displaying the timestamp. React source can be found at `views/src/`, and it was built with *Parcel*. Source maps were generated and the original source can be viewed in browser developer tools.

* https://akoz002-nodejs-timestamp.herokuapp.com/

Project template and requirements provided by freeCodeCamp (FCC). Tests and app implementation by Alex Kozlov (akoz002).

#### Example usage:
* https://akoz002-nodejs-timestamp.herokuapp.com/api/timestamp/2015-12-25
* https://akoz002-nodejs-timestamp.herokuapp.com/api/timestamp/1451001600000

#### Example output:
* { "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }

#### Tests

A set of basic tests can be found at `tests/tests.js`. To execute the tests in a local environment, first start the server with `npm start`. Then to execute the tests run `npm test`. Environment variable `APP_URL` is used by the tests to locate the app server. This defaults to a local server at `http://localhost:3000/api/timestamp/`. You can also define a local `.env` file, and it will be read by the app.
