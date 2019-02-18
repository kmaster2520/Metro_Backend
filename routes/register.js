bcrypt = require('bcrypt');
const validation = require('../util/validation');

// Status Codes
const registerSuccess = { code: 0, msg: 'Register Successful' };
const serverError = { code: 9, msg: '500: Register Error'  }

function register(params, res, dbCon) {
    // validate params
    if (!inputValidation(params, res))
        return;
    
    // generate hash
    bcrypt.hash(params.password, 10, function(err, hash) {
        if (err) {
            res.status(500);
            res.send(serverError);
            return;
        }

        dbCon.registerUser(params.username, hash, (err) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.send(serverError);
            } else {
                res.status(200);
                res.send(registerSuccess);
            }
        });

    });
}

function inputValidation(params, res) {
    // check if valid username
    if (!validation.validateUsername(params.username)) {
        res.status(400);
        res.send({ msg: 'Invalid Username' });
        return false;
    }

    // check if valid password
    if (!validation.validatePassword(params.password)) {
        res.status(400);
        res.send({ msg: 'Invalid Password' });
        return false;
    }

    // check if passwords match
    if (params.password !== params.cpassword) {
        res.status(400);
        res.send({ msg: 'Passwords Do Not Match' });
        return false;
    }

    return true;
}


module.exports = register;