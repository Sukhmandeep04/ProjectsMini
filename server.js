const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

// Create an Express application
const app = express();
const port = 3000;

// MongoDB connection
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'Mini001';

mongoose.connect(`${mongoUrl}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

// Mongoose User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' } // Add role field
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(cors()); // Enable CORS middleware

// Passport.js configuration
app.use(require('express-session')({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Define route for user registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    sendResponse(res, 201, 'text/plain', 'User registered successfully');
  } catch (error) {
    sendResponse(res, 400, 'text/plain', 'Invalid registration data');
  }
});

// Define route for user login with JWT
app.post('/api/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.status(500).json({ message: 'Internal Server Error' }); }
    if (!user) { return res.status(401).json({ message: 'Authentication failed' }); }

    const token = jwt.sign({ username: user.username, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token: token });
  })(req, res);
});

// Define route for user logout
app.get('/api/logout', (req, res) => {
  req.logout();
  sendResponse(res, 200, 'text/plain', 'Logout successful');
});

// Update Fitness Model: Add posted_by field
const fitnessSchema = new mongoose.Schema({
  posted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const FitnessModel = mongoose.model('FitnessModel', fitnessSchema);

// Enable HTTPS
const privateKey = fs.readFileSync('path/to/private-key.pem', 'utf8');
const certificate = fs.readFileSync('path/to/certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Server running on https://localhost:${port}/`);
});

function sendResponse(res, status, contentType, message) {
  res.status(status).contentType(contentType).send(message);
}
