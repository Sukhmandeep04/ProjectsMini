Mini-Project-9

Dependencies:

Mongoose User Schema:
* A Mongoose schema (userSchema) is defined to represent the structure of user documents in the MongoDB collection.
* The schema includes fields such as username and password, with specific validations and requirements.
  
Express Middleware:
* Body-parser middleware is employed to seamlessly handle incoming JSON requests, making it easier to extract data from the request body.
* The middleware is applied to the Express application using app.use() to ensure its execution for all incoming requests.
  
Passport.js Configuration:
* Passport.js is configured to handle user authentication using the local strategy.
* Sessions are employed to persist user login state, enhancing the security and user experience of the authentication process.
  
User Registration Route:
* Endpoint: /api/register
* Method: POST
    * Functionality:
    * Accepts a JSON payload containing username and password.
    * Utilizes Bcrypt.js to securely hash the password.
    * Creates a new user in the MongoDB database with the hashed password.
    * Responds with an appropriate status message.
      
User Login Route:
* Endpoint: /api/login
* Method: POST
    * Functionality:
    * Employs Passport.js local strategy for user authentication.
    * Provides a success message upon a successful login attempt.
      
User Logout Route:
* Endpoint: /api/logout
* Method: GET
    * Functionality:
    * Logs out the currently authenticated user.
    * Returns a success message to acknowledge the logout.
      
Additional Considerations:
* The code includes considerations for session management using Express sessions.
* Passport middleware is used for streamlined user authentication during login.
  
Server Initialization:
* The server is set to listen on port 3000, and a console log message indicates the server's successful initiation.
