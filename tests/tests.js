/*
 * A basic set of tests for the Timestamp Microservice.
 * Alex Kozlov, 2020
 */

const assert = require('assert');
const fetch = require('node-fetch');
require('dotenv').config();

/*
 * Perform a request and validate the response.
 */

const validateRequest = (
  requestDateString,
  expectedResponseJSON
) => fetch(process.env.APP_URL + requestDateString)
  .then(response => response.json())
  .then(json => {
    if (expectedResponseJSON) {
      assert.strictEqual(json.unix, expectedResponseJSON.unix);
      assert.strictEqual(json.utc, expectedResponseJSON.utc);
    }
    else {
      assert.strictEqual(json.error, "Invalid Date");
    }

    console.log(`Test passed for date string: '${requestDateString}'`);
  });

/*
 * Run some basic tests.
 */

 async function runTests() {
   console.log(`Running tests on app URL: '${process.env.APP_URL}'`);

   await validateRequest('2015-12-25', {
     unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"
   });
   await validateRequest(1451001600000, {
     unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"
   });
   await validateRequest('1995-12-17T03:24:00', {
     unix: 819123840000, utc: "Sat, 16 Dec 1995 14:24:00 GMT"
   });
   await validateRequest(0, {
     unix: 0, utc: "Thu, 01 Jan 1970 00:00:00 GMT"
   });
   await validateRequest(0.1, {
     unix: 0, utc: "Thu, 01 Jan 1970 00:00:00 GMT"
   });
   await validateRequest(-1, {
     unix: -1, utc: "Wed, 31 Dec 1969 23:59:59 GMT"
   });
   await validateRequest('invalid', null);
   await validateRequest('', null);
 }

runTests();
