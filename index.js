const express = require('express');
const config = require('config');
const morgan = require('morgan');
const MongoDBConnection = require('./database/mongodbconnect');
const sendMsg = require('./util/sendMsg');


//// INITIALIZATION

const app = express();

// Get Environment
const isDev = app.get('env') === 'development' ? true : false;
console.log('Is Dev Environment?: ' + isDev);

// Setup Database Connection
const dbInfo = config.get('mongoDB_info');
const dbCon = new MongoDBConnection(dbInfo);


//// DEFINE SIMPLE FUNCTIONS ////

//// MIDDLEWARE ////

// Turn input into JSON
app.use(express.json());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// Log requests when in dev environment
if (isDev)
  app.use(morgan('tiny'));


//// ENDPOINTS ////

// Test
app.get('/', (req, res) => {
  sendMsg.obj(res, 200, {value: 5, req: req.body});
});

/*
app.get('/rails', (req, res) => {
  dbCon.getRails((err, rows) => {
    if (err) {
      sendMsg.msg(res, 500, '500 - Server Error');
    } else {
      rails = [];
      for (var i = 0; i < rows.length; i++) {
          rails.push(rows[i].id);
      }
      sendMsg.obj(res, 200, { rails: rails, count: rails.length });
    }
  });
});
*/

// Register New User
const register = require('./routes/register');
app.post('/register', (req, res) => {
    register(req.body, res, dbCon);
});

// Login Returning User
/*
const login = require('./routes/login');
app.post('/login', (req, res) => {
    console.log(req.body);
    const username = db.sanitize(req.body.username);
    const password = req.body.password;
    const params = { username, password };
    login(params, res, dbCon);
});
*/

// Delete User
/*
const deleteUser = require('./routes/deleteUser');
app.delete('/deleteUser', (req, res) => {
    const username = db.sanitize(req.body.username);
    const password = req.body.password;
    const params = { username, password };
    deleteUser(params, res, dbCon);
});
*/



// Intialize Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));