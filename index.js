const express = require('express');
const config = require('config');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const dbconnect = require('./dbconnect');

const app = express();

// Get Environment
const isDev = app.get('env') === 'development' ? true : false;
console.log('Is Dev Environment?: ' + isDev);

// Setup Database Connection
const dbInfo = config.get('dbInfo');
const dbCon = new dbconnect.DBConnection(dbInfo);

// Turn input into JSON
app.use(express.json());
// Log requests when in dev environment
if (isDev)
    app.use(morgan('tiny'));

// Endpoints

app.get('/', (req, res) => {
    res.send(req.query);
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    // check if passwords match
    if (password !== cpassword) {
        return;
    }
    // check if username already exists

    // generate hash
    bcrypt.hash(password, 10, function(err, hash) {
        console.log(hash);
        // store username and hash on server
    });
});



// Intialize Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));