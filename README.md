Mini-project02

<a href="https://codeclimate.com/github/Sukhmandeep04/ProjectsMini/maintainability"><img src="https://api.codeclimate.com/v1/badges/88d8c12f03478b996b4d/maintainability" /></a>

📗server.js

File Operations
readUserData(callback): Reads user data from 'users.json' and handles JSON parsing and error management.
writeUserData(userData, callback): Writes user data to 'users.json' and converts data to JSON format with proper indentation.
HTTP Server
Server Creation: The 'http' module is used to create an HTTP server.
Routes Handling: GET /api/users: Retrieves user data. POST /api/users: Creates a new user. PUT /api/users/:userId: Updates an existing user. DELETE /api/users/:userId: Deletes an existing user.
Request Handling Functions: handleGetUsers(req, res): Handles GET requests for user data. handlePostUser(req, res): Handles POST requests to create a new user. handlePutUser(req, res): Handles PUT requests to update an existing user. handleDeleteUser(req, res): Handles DELETE requests to delete an existing user.
Response Handling
sendJSONResponse(res, status, data): Sends JSON responses with the specified status code.
sendPlainTextResponse(res, status, message): Sends plain text responses with the specified status code and message.
sendErrorResponse(res, status, message): Sends error responses with a specified status code and message.
