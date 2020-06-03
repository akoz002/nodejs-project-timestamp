/*
 * A basic set of tests for the Timestamp Microservice.
 * Alex Kozlov, 2020
 */

const assert = require('assert');
const fetch = require('node-fetch');
require('dotenv').config();

/*
 * Validator functions for the JSON response.
 */

function validateEqual(dateString, responseJSON, expectedJSON) {
  assert.strictEqual(responseJSON.unix, expectedJSON.unix);
  assert.strictEqual(responseJSON.utc, expectedJSON.utc);
  assert.ok(!responseJSON.error);
  console.log(`Validated equality for date string: '${dateString}'`);
}

function validateOk(dateString, responseJSON) {
  assert.ok(responseJSON.unix);
  assert.ok(responseJSON.utc);
  assert.ok(!responseJSON.error);
  console.log(`Validated 'ok' for date string: '${dateString}'`);
}

function validateError(dateString, responseJSON) {
  assert.ok(responseJSON.error);
  assert.strictEqual(responseJSON.error, "Invalid Date");
  assert.ok(!responseJSON.unix);
  assert.ok(!responseJSON.utc);
  console.log(`Validated error for date string: '${dateString}'`);
}

/*
 * Perform a request and validate the response.
 */

const validateRequest = (
  dateString,
  expectedJSON,
  validatorFunc = validateEqual
) => fetch(process.env.APP_URL + dateString)
  .then(response => response.json())
  .then(json => validatorFunc(dateString, json, expectedJSON));

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
  await validateRequest('1995-12-17T03:24:00.000Z', {
   unix: 819170640000, utc: 'Sun, 17 Dec 1995 03:24:00 GMT'
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
  await validateRequest('invalid', null, validateError);
  await validateRequest('', null, validateOk);
}

runTests();
