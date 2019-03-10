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

  // check if user exists, if not, return failed login
  function checkIfUserExists() {
    dbCon.getUserByName(username, (user) => {
      if (!user) {
        res.status(200).send({ success: false });
      } else {
        verifyHash(user.p_hash);
      }
    });
  }

  // verify hash, if correct, sent JSON web token
  function verifyHash(check_hash) {
    hash.verifyHash(password, check_hash, (same) => {
      if (same) {
        const token = authToken.create({ subject: username });
        res.status(200).send({ success: true, token });
      } else {
        res.status(200).send({ success: false });
      }
    });
  }

  checkIfUserExists();
});


// REGISTER
router.post('/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let cpassword = req.body.cpassword;

  // validate params
  let validation_err_string = validation.errorsInUserInfo(username, password, cpassword);
  if (validation_err_string) {
    res.status(400).send({ msg: validation_err });
    return;
  }

  // check if user already exists, if so, registration fails
  function checkIfUserExists() {
    dbCon.getUserByName(username, (user) => {
      if (user) {
        res.status(400).send({ msg: 'User Already Exists' });
      } else {
        generateHash(password);
      }
    });
  }

  // generate a hash to store in the database
  function generateHash(password) {
    hash.generateHash(password, (p_hash) => {
      if (p_hash) {
        registerUser(p_hash);
      } else {
        res.status(500).send({ msg: 'Server Error' });
      }
    });
  }

  // send user data to database
  function registerUser(p_hash) {
    dbCon.registerUser(username, p_hash, (registeredUser) => {
      if (registeredUser) {
        res.status(200).send({ msg: 'Register Successful' });
      } else {
        res.status(500).send({ msg: 'Server Error' });
      }
    });
  }

  checkIfUserExists();
});

/*
// DELETE USER
router.delete('/deleteUser', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let cpassword = req.body.cpassword;

});
*/




module.exports = router;