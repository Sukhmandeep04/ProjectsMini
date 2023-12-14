Mini-Project-8

<a href="https://codeclimate.com/github/Sukhmandeep04/ProjectsMini/maintainability"><img src="https://api.codeclimate.com/v1/badges/88d8c12f03478b996b4d/maintainability" /></a>
Imports:
- The code starts by importing necessary modules for building a web server, parsing JSON, connecting to MongoDB, and handling validation using express, body-parser, MongoDB, and Mongoose.

Express Setup:
- An Express application is created using express().
- The server is configured to listen on port 3000.

MongoDB Connection:
- The MongoDB connection details, such as the URL and database name, are specified.
- Mongoose is used to connect to MongoDB with the provided connection details.
- Event listeners are set up to handle connection errors and log a successful connection.

Mongoose Schema:
- A Mongoose schema (workoutSchema) is defined for the "Workout" model, specifying the structure of workout documents in the MongoDB collection.

Express Middleware:
- Body-parser middleware is used to parse incoming JSON requests.

CRUD Operations:
Routes are defined for CRUD operations on workouts (/api/workouts):
- Create (POST): Handles the creation of a new workout. Validates the request body using express-validator and saves the workout to the MongoDB database.
- Read (GET): Retrieves all workouts from the database and sends a JSON response.
- Update (PUT): Updates an existing workout based on the workout ID. Validates the request body and uses findByIdAndUpdate to update the workout.
- Delete (DELETE): Deletes an existing workout based on the workout ID.

Validation with Express-Validator:
- The express-validator library is used for input validation in the POST and PUT routes. It checks if the required fields are present and provides error messages if validation fails.

MongoDB Operations (Mongoose):
- Functions (readUserData and writeUserData) are defined for reading and writing workout data to MongoDB.
- These functions use MongoClient to connect to the database, perform operations, and close the connection afterward.

Response Handling Functions:
- sendResponse and sendJSONResponse are functions used for sending HTTP responses. sendJSONResponse is specifically designed for sending JSON responses with the appropriate headers.

Server Start:
- The server initiates, and a log message is printed to indicate it is running.

