# Tests

This folder contains the unit tests for the frontend. These tests use the React-Testing-Library to render the UI components and simulate user interactions with the system. The Vitest framework is use to check that the outputs of the test match the expected outputs of the test cases. 

Features such as login, sign-up and change password are not tested within here as they are provided within the Auth0 UI with cannot be accessed by the React-Testing-Library. 

# To Read Before Attempting To Execute Tests

It is important that the express-rate-limit middleware in the backend is disabled by commenting out line 33 in the server.js file before running the tests. Otherwise the requests created by the unit tests will exceed the acceptable limit and HTTP 429 errors will be returned, failing the tests.

It is also important to note that these tests were validated using data within the local database on my machine and therefore, may produce different results for you.

# To Run The Test Files

Open a terminal window and enter the command "npm run test"