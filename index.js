const express = require('express');
const config = require('config');
const morgan = require('morgan');
const db = require('./database/dbconnect');
const sendMsg = require('./util/sendMsg');


//// INITIALIZATION

const app = express();

// Get Environment
const isDev = app.get('env') === 'development' ? true : false;
console.log('Is Dev Environment?: ' + isDev);

// Setup Database Connection
const dbInfo = config.get('dbInfo');
const dbCon = new db.DBConnection(dbInfo);


//// DEFINE SIMPLE FUNCTIONS ////

//// MIDDLEWARE ////

// Turn input into JSON
app.use(express.json());

// Log requests when in dev environment
if (isDev)
    app.use(morgan('tiny'));


//// ENDPOINTS ////

// Test
app.get('/', (req, res) => {
    sendMsg.obj(res, 200, {value: 5, req: req.body});
});

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

// Delete User
const deleteUser = require('./routes/deleteUser');
app.delete('/deleteUser', (req, res) => {
    const username = db.sanitize(req.body.username);
    const password = req.body.password;
    const params = { username, password };
    deleteUser(params, res, dbCon);
});



// Intialize Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));