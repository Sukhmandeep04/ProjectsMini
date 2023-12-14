Mini-Project-10

<a href="https://codeclimate.com/github/Sukhmandeep04/ProjectsMini/maintainability"><img src="https://api.codeclimate.com/v1/badges/88d8c12f03478b996b4d/maintainability" /></a>

Express Setup:
- An Express application is created using express().
- The server is configured to listen on port 3000.

MongoDB Connection:
- The MongoDB connection details, such as the URL and database name, are specified.
- Mongoose is used to connect to MongoDB with the provided connection details.
- Event listeners are set up to handle connection errors and log a successful connection.

Mongoose Schemas:
- Two Mongoose schemas are defined: userSchema and fitnessSchema.
  - userSchema specifies the structure of user documents in the MongoDB collection, including fields like 'username', 'password', and 'role'.
  - fitnessSchema specifies the structure of fitness documents in the MongoDB collection, including fields like 'posted_by' to associate fitness data with a user.

Express Middleware:
- Body-parser middleware is used to parse incoming JSON requests.
- CORS middleware is enabled using app.use(cors()) to allow cross-origin resource sharing.

Passport.js Configuration:
- Express-session, passport initialization, and session middleware are set up for user authentication.
- LocalStrategy is configured to authenticate users based on their username and password.
- Passport serialization and deserialization functions are defined for session management.

JWT Implementation:
- A route for user login (/api/login) is modified to use JWT for user authorization.
- When a user successfully logs in, a JWT token is generated and sent back as a response.

User Registration and Authentication:
- Routes for user registration (/api/register) and logout (/api/logout) are defined.
- User registration involves hashing the password and saving the user data to the MongoDB collection.
- User authentication is handled using Passport.js local strategy.

Fitness Model Update:
- The fitness schema is modified to include a 'posted_by' field, referencing the User model to associate fitness data with a user.

HTTPS Implementation:
- The Node.js HTTPS module is used to create an HTTPS server.
- Private key and certificate files are read and provided to create secure HTTPS connections.
