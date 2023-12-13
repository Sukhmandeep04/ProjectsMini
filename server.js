// Importing the HTTP module for creating an HTTP server
const http = require('http');
 // Importing the File System module for file operations
const fs = require('fs');
// Importing the Path module for working with file paths
const path = require('path');


// Function to read user data from the JSON file
function readUserData(callback) {
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      try {
        const userData = JSON.parse(data);
        callback(null, userData);
      } catch (error) {
        callback(error);
      }
    }
  });
}

// Function to write user data to the JSON file
function writeUserData(userData, callback) {
  fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(userData, null, 2), (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

// Create an HTTP server and handle different HTTP methods and routes
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/users') {
    handleGetUsers(req, res);
  } else if (req.method === 'POST' && req.url === '/api/users') {
    handlePostUser(req, res);
  } else if (req.method === 'PUT' && req.url.startsWith('/api/users/')) {
    handlePutUser(req, res);
  } else if (req.method === 'DELETE' && req.url.startsWith('/api/users/')) {
    handleDeleteUser(req, res);
  } else {
    sendErrorResponse(res, 404, 'Not Found');
  }
});

// Handle GET requests to retrieve user data
function handleGetUsers(req, res) {
  readUserData((err, data) => {
    if (err) {
      sendErrorResponse(res, 500, 'Internal Server Error');
      return;
    }
    sendJSONResponse(res, 200, data);
  });
}

// Handle POST requests to create a new user
function handlePostUser(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const newUser = JSON.parse(body);
      readUserData((err, data) => {
        if (err) {
          sendErrorResponse(res, 500, 'Internal Server Error');
          return;
        }
        data.push(newUser);
        writeUserData(data, (err) => {
          if (err) {
            sendErrorResponse(res, 500, 'Internal Server Error');
            return;
          }
          sendPlainTextResponse(res, 201, 'User created successfully');
        });
      });
    } catch (error) {
      sendErrorResponse(res, 400, 'Invalid JSON format');
    }
  });
}


// Handle PUT requests to update an existing user
function handlePutUser(req, res) {
  const userId = req.url.split('/').pop();
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const updatedUser = JSON.parse(body);
      readUserData((err, data) => {
        if (err) {
          sendErrorResponse(res, 500, 'Internal Server Error');
          return;
        }
        const userIndex = data.findIndex((user) => user.id === userId);
        if (userIndex === -1) {
          sendErrorResponse(res, 404, 'User not found');
          return;
        }
        data[userIndex] = { ...data[userIndex], ...updatedUser };
        writeUserData(data, (err) => {
          if (err) {
            sendErrorResponse(res, 500, 'Internal Server Error');
            return;
          }
          sendPlainTextResponse(res, 200, 'User updated successfully');
        });
      });
    } catch (error) {
      sendErrorResponse(res, 400, 'Invalid JSON format');
    }
  });
}

// Handle DELETE requests to delete an existing user
function handleDeleteUser(req, res) {
  const userId = req.url.split('/').pop();
  readUserData((err, data) => {
    if (err) {
      sendErrorResponse(res, 500, 'Internal Server Error');
      return;
    }
    const userIndex = data.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      sendErrorResponse(res, 404, 'User not found');
      return;
    }
    data.splice(userIndex, 1);
    writeUserData(data, (err) => {
      if (err) {
        sendErrorResponse(res, 500, 'Internal Server Error');
        return;
      }
      sendPlainTextResponse(res, 200, 'User deleted successfully');
    });
  });
}

// Helper function to send JSON responses with a specified status code
function sendJSONResponse(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Helper function to send plain text responses with a specified status code
function sendPlainTextResponse(res, status, message) {
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.end(message);
}

// Helper function to send error responses with a specified status code and message
function sendErrorResponse(res, status, message) {
  sendPlainTextResponse(res, status, message);
}

// Start the server on port 3000 and log a message when it starts
server.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
});
