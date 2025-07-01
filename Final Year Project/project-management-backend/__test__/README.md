# Tests

This folder contains the unit tests for the backend features. These tests use the supertest npm package to create test requests to the API. The Jest framework is use to check that the response codes and bodies match the expected outputs.  

# To Read Before Attempting To Execute Tests

It is important that the express-rate-limit middleware in the backend is disabled by commenting out line 33 in the server.js file before running the tests. Otherwise the requests created by the unit tests will exceed the acceptable limit and HTTP 429 errors will be returned, failing the tests.

It is also important to note that these tests were validated using data within the local database on my machine and therefore, may produce different results for you.

# To Run The Test Files

Open a terminal window and enter the command "npm run test"