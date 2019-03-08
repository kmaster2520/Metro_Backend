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
      res.status(200).send({ success: false });
    } else {
      // check if password is correct
      hash.verifyHash(password, user.p_hash, (same) => {
        if (same) {
          // send json web token upon successful login
          const token = authToken.create({ subject: user.username });
          res.status(200).send({ success: true, token });
        } else {
          res.status(200).send({ success: false });
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
  let validation_err_string = validation.errorsInUserInfo(usernname, password, cpassword);
  if (validation_err_string) {
    res.status(400).send({ msg: validation_err });
    return;
  }

  // check if user exists
  dbCon.getUserByName(username, (user) => {
    if (user) {
      res.status(400).send({ msg: 'User Already Exists' });
    } else {

      // generate hash
      hash.generateHash(password, (hash) =>  {
        if (hash) {

          // add user to database
          dbCon.registerUser(username, hash, (registeredUser) => {
            if (registeredUser) {
              res.status(200).send({ msg: 'Register Successful' });
            } else {
              res.status(500).send({ msg: 'Server Error' });
            }
          });

        } else {
          res.status(500).send({ msg: 'Server Error' });
        }
      });

    }
  });
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