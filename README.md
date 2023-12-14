Mini-Project-7



📘 server.js
________________________
Imports:
  The code starts by importing the necessary modules:
    - Express: Web application framework for Node.js.
    - Body-parser: Middleware for handling JSON request bodies.
    - MongoClient from MongoDB: MongoDB driver for Node.js.
    
Express Setup:
    - It creates an Express application (app).
    - Specifies the port (3000) on which the server will listen.
    - It defines the MongoDB connection details (mongoUrl and dbName).
    
Middleware Configuration:
    - Configures Express to use body-parser for parsing JSON in request bodies.
    
API Endpoints:
  Defines several API endpoints for user management:
    - GET /api/users: Retrieves all users from MongoDB and sends a JSON response.
    - POST /api/users: Add a new user to the MongoDB collection.
    - PUT /api/users/:userId: Updates an existing user in the MongoDB collection.
    - DELETE /api/users/:userId: Deletes a user from the MongoDB collection.
    
MongoDB Operations:
   - Provides functions (readUserData and writeUserData) for reading and writing user data to/from MongoDB.
   - It uses MongoClient to connect to the MongoDB instance, perform operations, and close the connection afterward.
     
Response Handling Functions:
   - sendResponse: Sends a custom HTTP response with the specified status code, content type, and data.
   - sendJSONResponse: Sends a JSON response using sendResponse.
     
Server Initialization:
   - The Express app listens on port 3000.
   - Upon successful server startup, a message will be logged to the console.
