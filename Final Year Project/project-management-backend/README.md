# Express backend for the final year project

Notes:
- Contains the models, controllers and unit tests for a MVC project management application
- Knex:
    - Connects to the local PostgreSQL database
    - Migrations to create tables
    - Seeds to populate tables with test data
- Middleware:
    - ExpressJS backend framework
    - CORS for connecting with the frontend
    - Perfect-express-santizer for preventing SQLi and XSS attacks
    - Express-rate-limit for preventing DoS attacks
    - Express-fileupload for user file uploads
- Jest
    - Unit tests for the main routes and user functions