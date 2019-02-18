const express = require('express');
const config = require('config');
const morgan = require('morgan');
const db = require('./database/dbconnect');
const register = require('./access/register');
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
app.post('/register', (req, res) => {
    // sanitize inputs
    const username = db.sanitize(req.body.username);
    const password = req.body.password;
    const cpassword = req.body.cassword;

    // check if valid username
    if (!validation.validateUsername(username)) {
        sendMsg(res, 400, 'Invalid Username');

        return;
    }

    // check if valid password
    if (!validation.validatePassword(password)) {
        sendMsg(res, 400, 'Invalid Password');
        return;
    }

    // check if passwords match
    if (password !== cpassword) {
        sendMsg(res, 400, 'Passwords Do Not Match');
        return;
    }
    // check if username already exists

    // finally, register user
    register.registerUser(username, password, dbCon, (err, rows) => {
        if (err) {
            console.log(err);
            sendMsg(res, 500, 'Registration Error');
        } else {
            sendMsg(res, 200, 'Registration Successful');
        }
    });

    
});

// Login User
app.post('/login', (req, res) => {
    const username = db.sanitize(req.body.username);
    const password = req.body.password;
});

app.delete('/deleteUser', (req, res) => {
    const username = db.sanitize(req.body.username);
    const password = req.body.password;
})



// Intialize Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));