const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// Function to read user data from the JSON file using Promises
async function readUserData() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

// Function to write user data to the JSON file using Promises
async function writeUserData(userData) {
  try {
    await fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(userData, null, 2));
  } catch (error) {
    throw error;
  }
}

// Helper function to send responses
function sendResponse(res, status, contentType, data) {
  res.writeHead(status, { 'Content-Type': contentType });
  res.end(data);
}

// Refactored function to send JSON responses
function sendJSONResponse(res, status, data) {
  sendResponse(res, status, 'application/json', JSON.stringify(data));
}

// Function to handle GET requests for /api/users
async function handleGetUsers(req, res) {
  try {
    const data = await readUserData();
    sendJSONResponse(res, 200, data);
  } catch (error) {
    sendResponse(res, 500, 'text/plain', 'Internal Server Error');
  }
}

// Function to handle POST requests for /api/users
async function handlePostUser(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const newUser = JSON.parse(body);
      const data = await readUserData();
      data.push(newUser);
      await writeUserData(data);
      sendResponse(res, 201, 'text/plain', 'User created successfully');
    } catch (error) {
      sendResponse(res, 400, 'text/plain', 'Invalid JSON format');
    }
  });
}

// Function to handle PUT requests for /api/users/:userId
async function handlePutUser(req, res, userId) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const updatedUser = JSON.parse(body);
      const data = await readUserData();
      const userIndex = data.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        sendResponse(res, 404, 'text/plain', 'User not found');
      } else {
        data[userIndex] = { ...data[userIndex], ...updatedUser };
        await writeUserData(data);
        sendResponse(res, 200, 'text/plain', 'User updated successfully');
      }
    } catch (error) {
      sendResponse(res, 400, 'text/plain', 'Invalid JSON format');
    }
  });
}

// Function to handle DELETE requests for /api/users/:userId
async function handleDeleteUser(req, res, userId) {
  const data = await readUserData();
  const userIndex = data.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    sendResponse(res, 404, 'text/plain', 'User not found');
  } else {
    data.splice(userIndex, 1);
    await writeUserData(data);
    sendResponse(res, 200, 'text/plain', 'User deleted successfully');
  }
}

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/api/users') {
    await handleGetUsers(req, res);
  } else if (req.method === 'POST' && req.url === '/api/users') {
    await handlePostUser(req, res);
  } else if (req.method === 'PUT' && req.url.startsWith('/api/users/')) {
    const userId = req.url.split('/').pop();
    await handlePutUser(req, res, userId);
  } else if (req.method === 'DELETE' && req.url.startsWith('/api/users/')) {
    const userId = req.url.split('/').pop();
    await handleDeleteUser(req, res, userId);
  } else {
    sendResponse(res, 404, 'text/plain', 'Not Found');
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
});
