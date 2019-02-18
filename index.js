const express = require('express');
const config = require('config');
const morgan = require('morgan');
const db = require('./database/dbconnect');
const validation = require('./util/validation');


//// INITIALIZATION

const app = express();

// Get Environment
const isDev = app.get('env') === 'development' ? true : false;
console.log('Is Dev Environment?: ' + isDev);

// Setup Database Connection
const dbInfo = config.get('dbInfo');
const dbCon = new db.DBConnection(dbInfo);


//// DEFINE SIMPLE FUNCTIONS

// sends simple message
function sendMsg(res, code, msg) {
    res.status(code);
    msg = { msg: msg };
    res.send(msg);
}

// sends JSON object
function sendObj(res, code, obj) {
    res.status(code);
    res.send(obj);
}


//// MIDDLEWARE

// Turn input into JSON
app.use(express.json());

// Log requests when in dev environment
if (isDev)
    app.use(morgan('tiny'));


//// ENDPOINTS

// Test
app.get('/', (req, res) => {
    sendObj(res, 200, {value: 5, req: req.body});
});

// Register New User
const register = require('./routes/register');
app.post('/register', (req, res) => {
    // sanitize inputs
    const username = db.sanitize(req.body.username);
    const password = req.body.password;
    const cpassword = req.body.cassword;
    const params = { username, password, cpassword };

    register(params, res, dbCon);
});

// Login Returning User
const login = require('./routes/login');
app.post('/login', (req, res) => {
    const username = db.sanitize(req.body.username);
    const password = req.body.password;
    const params = { username, password };
    login(params, res, dbCon);
});

app.delete('/deleteUser', (req, res) => {
    const username = db.sanitize(req.body.username);
    const password = req.body.password;
})



// Intialize Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));