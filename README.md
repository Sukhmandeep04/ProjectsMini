Mini-project03

<a href="https://codeclimate.com/github/Sukhmandeep04/ProjectsMini/maintainability"><img src="https://api.codeclimate.com/v1/badges/88d8c12f03478b996b4d/maintainability" /></a>


📗server.js

Promises and Async/Await readUserData(): Uses Promises and async/await to read user data from 'users.json'. writeUserData(userData): Implements Promises and async/await for writing user data to 'users.json'.

Callbacks handlePostUser(req, res): Highlights where callbacks are still helpful, specifically in handling POST requests where data parsing occurs asynchronously.

Event Loop Operates seamlessly within the Node.js event loop, ensuring efficient handling of asynchronous operations.

Error Handling It provides robust error handling for asynchronous operations, including appropriate HTTP status codes and messages for various error scenarios.

Response Handling sendJSONResponse(res, status, data): Sends JSON responses with specified status codes. sendResponse(res, status, contentType, data): Sends responses based on content type. Request Handling Functions handleGetUsers(req, res): Asynchronously handles GET requests for user data. handlePostUser(req, res): Manages POST requests asynchronously, utilizing callbacks for data parsing. handlePutUser(req, res, userId): Asynchronously handles PUT requests, updating user data. handleDeleteUser(req, res, userId): Asynchronously handles DELETE requests, deleting user data.

HTTP Server Creates an HTTP server using async/await to handle various HTTP methods and routes for user data.
