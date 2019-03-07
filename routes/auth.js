const express = require('express');
const router = express.Router();
const config = require('config');


// Database Setup
const MongoDBConnection = require('../database/mongodbconnect');
const dbInfo = config.get('mongoDB_info');
const dbCon = new MongoDBConnection(dbInfo);

// User Control Modules
const hash = require('../util/hash');
const authToken = require('../util/authToken');
const validation = require('../util/validation');


// LOGIN
router.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  dbCon.getUserByName(username, (user) => {
    if (!user) {
      res.status(200).send({ success: false, msg: 'Incorrect Login' });
    } else {
      // check if password is correct
      hash.verifyHash(password, user.p_hash, (same) => {
        if (same) {
          // send json web token upon successful login
          const token = authToken.create({ subject: user.username });
          res.status(200).send({ success: true, token });
        } else {
          res.status(200).send({ success: false, msg: 'Incorrect Login' });
        }
      });

    }
  });
});


// REGISTER
router.post('/register', (req, res) => {

  let username = req.body.username;
  let password = req.body.password;
  let cpassword = req.body.cpassword;

  // validate params
  if (!inputValidation(params, res))
  return;

  let validation_err_string = errorsInUserInfo(usernname, password, cpassword);
  if (validation_err_string) {
    res.status(400).send({ msg: validation_err });
    return;
  }

  // generate hash
  hash.generateHash(password, (hash) =>  {
    if (!hash) {
      res.status(500).send({ msg: 'Server Error' });
    } else {

      // check if username already exists
      dbCon.getUserByName(username, (user) => {
        if (user) {

          // add user to database
          dbCon.registerUser(username, hash, (registeredUser) => {
            if (registeredUser) {
              res.status(200).send({ success: true });
            } else {
              res.status(500).send({ msg: 'Server Error' });
            }
          });

        } else {
          res.status(400).send({ msg: 'User Already Exists' });
        }
      });

    }
  });
});


function errorsInUserInfo(username, password, cpassword) {
  // check if valid username
  if (!validation.validateUsername(username)) {
    return 'Username Invalid';
  }

  // check if valid password
  if (!validation.validatePassword(password)) {
    return 'Password Invalid';
  }

  // check if passwords match
  if (password !== cpassword) {
    return 'Passwords Don\'t Match';
  }

  return null;
}



module.exports = router;