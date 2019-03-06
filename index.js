const express = require('express');
const config = require('config');
const morgan = require('morgan');
const MongoDBConnection = require('./database/mongodbconnect');


//// INITIALIZATION

const app = express();
const auth = require('./routes/auth');
const data = require('./routes/data');

// Get Environment
const isDev = config.get('development');
console.log('Is Dev Environment?: ' + isDev);

// Setup Database Connection
//const dbInfo = config.get('mongoDB_info');
//const dbCon = new MongoDBConnection(dbInfo);


//// MIDDLEWARE ////

// Turn input into JSON
app.use(express.json());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// Log requests when in dev environment
if (isDev)
  app.use(morgan('tiny'));


//// ENDPOINTS ////

// Authentication
app.use('/auth', auth);

// Data
app.use('/data', data);

// Test
app.get('/', (req, res) => {
  res.send(req.body);
});





// Intialize Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));