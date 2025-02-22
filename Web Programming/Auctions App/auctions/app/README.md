# Backend

This folder contains the backend for the auctions app, it uses:
- The ExpressJS framework
- MVC architecture to split the system into separate layers to increase maintainability and scalability
- CORS middleware to allow requests to the backend
- A local postgres database created and manipulated via Knex functions
- Seed files containing test data for the application

Note: The backend requires a local postgres database with matching values in the .env file