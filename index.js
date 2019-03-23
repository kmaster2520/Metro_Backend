const express = require('express');
const config = require('config');
const morgan = require('morgan');
const middleware = require('./util/middleware');
const MongoDBConnection = require('./database/mongodbconnect');


//// INITIALIZATION

const app = express();
//
const auth = require('./routes/auth');
const stations = require('./routes/stations');
const trips = require('./routes/trips');
const smartcards = require('./routes/smartcards');

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
app.use(middleware.headers);
// Log requests when in dev environment
if (isDev)
  app.use(middleware.logger); 


//// ENDPOINTS ////

// Authentication
app.use('/auth', auth);
// Trips
app.use('/trips', trips);
// Stations
app.use('/stations', stations);
// Smartcards
app.use('/smartcards', smartcards);

// Test
app.get('/', (req, res) => {
  res.send(req.body);
});



// Intialize Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));