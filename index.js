const express = require('express');
const config = require('config');
const morgan = require('morgan');
const db = require('./dbconnect');
const register = require('./register');
const validation = require('./validation');

const app = express();

// Get Environment
const isDev = app.get('env') === 'development' ? true : false;
console.log('Is Dev Environment?: ' + isDev);

// Setup Database Connection
const dbInfo = config.get('dbInfo');
const dbCon = new db.DBConnection(dbInfo);

// Turn input into JSON
app.use(express.json());
// Log requests when in dev environment
if (isDev)
    app.use(morgan('tiny'));

const a = '232;"--';
console.log(db.sanitize(a));

// Endpoints

app.get('/', (req, res) => {
    res.send('test');
    console.log(req.body);
});

app.post('/register', (req, res) => {
    const username = db.sanitize(req.body.username).slice(1,-1);
    const password = req.body.password;
    const cpassword = req.body.cassword;

    // check if valid username
    if (!validation.validateUsername(username)) {
        res.send('{ "err": "Invalid Username" }');
        return;
    }

    // check if valid password
    if (!validation.validatePassword(password)) {
        res.send('{ "err": "Invalid Password" }');
        return;
    }

    // check if passwords match
    if (password !== cpassword) {
        res.send('{ "err": "Passwords Do Not Match" }');
        return;
    }
    // check if username already exists

    register.registerUser(username, password, dbCon);

    res.send('{ "msg": "Register Success" }');
});



// Intialize Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));