Mini-project03

<a href="https://codeclimate.com/github/Sukhmandeep04/ProjectsMini/maintainability"><img src="https://api.codeclimate.com/v1/badges/88d8c12f03478b996b4d/maintainability" /></a>

📗server.js

API Versioning It operates under version 1 (/api/v1/users). It supports future versions for effective updates.

Query Parameters GET /api/v1/users supports: name for filtering users by name. Email for filtering users by email.

Pagination it manages large datasets with pagination. Users navigate using the page query parameter.

Error Handling Robust error handling with informative HTTP status codes and messages.

Routes and HTTP Methods GET /api/v1/users: Retrieves user data with optional query parameters. POST /api/v1/users: Creates a new user. PUT /api/v1/users/:userId: Updates an existing user. DELETE /api/v1/users/:userId: Deletes an existing user.

Request Handling Functions handleGetUsers(req, res): Handles GET requests for user data, supporting query parameters. handlePostUser(req, res): Handles POST requests to create a new user. handlePutUser(req, res): Handles PUT requests to update an existing user. handleDeleteUser(req, res): Handles DELETE requests to delete an existing user.

Response Handling sendJSONResponse(res, status, data): Sends JSON responses with a specified status code. sendPlainTextResponse(res, status, message): Sends plain text responses with a specified status code and message. sendErrorResponse(res, status, message): Sends error responses with a specified status code and message.
