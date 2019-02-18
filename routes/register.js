bcrypt = require('bcrypt');
const validation = require('../util/validation');

// Status Codes
const registerSuccess = { code: 0, msg: 'Register Successful' };
const serverError = { code: 9, msg: '500: Register Error'  };
const invalidUsername = { code: 1, msg: 'Invalid Username' };
const invalidPassword = { code: 2, msg: 'Invalid Password' };
const passwordsDontMatch = { code: 3, msg: 'Passwords Don\'t Match' };
const userAlreadyExists = { code: 4, msg: 'User Already Exists' };

function register(params, res, dbCon) {
    // validate params
    if (!inputValidation(params, res))
        return;
    
    // generate hash
    bcrypt.hash(params.password, 10, function(err, hash) {
        if (err) {
            res.status(500); res.send(serverError);
        } else {
            dbCon.registerUser(params.username, hash, (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        res.status(400); res.send(userAlreadyExists);
                    } else {
                        res.status(500); res.send(serverError);
                    }
                } else {
                    res.status(200); res.send(registerSuccess);
                }
            });
        }
    });
}

function inputValidation(params, res) {
    // check if valid username
    if (!validation.validateUsername(params.username)) {
        res.status(400);
        res.send(invalidUsername);
        return false;
    }

    // check if valid password
    if (!validation.validatePassword(params.password)) {
        res.status(400);
        res.send(invalidPassword);
        return false;
    }

    // check if passwords match
    if (params.password !== params.cpassword) {
        res.status(400);
        res.send(passwordsDontMatch);
        return false;
    }

    return true;
}


module.exports = register;