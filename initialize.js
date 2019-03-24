const express = require('express');
const router = express.Router();
const config = require('config');

const hash = require('./util/hash');
const authToken = require('./util/authToken');
const validation = require('./util/validation');

const MongoDBConnection = require('./database/mongodbconnect');
const dbInfo = config.get('mongoDB_info');
const adminInfo = config.get('admin_info');
const dbCon = new MongoDBConnection(dbInfo);

function registerAdmin(adminInfo) {

  let username = adminInfo.user.toLowerCase();
  let password = adminInfo.password;

  // validate params
  let validation_err_string = validation.errorsInUserInfo(username, password, password);
  if (validation_err_string) {
    console.log('Validation Error');
    return;
  }

  // check if user already exists, if so, registration fails
  function checkIfUserExists() {
    dbCon.getUserByName(username, (user) => {
      if (user) {
        console.log('User Already Exists');
        return;
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
        console.log('Hash Error');
      }
    });
  }

  // send user data to database
  function registerUser(p_hash) {
    dbCon.registerUser(username, p_hash, 'A', (registeredUser) => {
      if (registeredUser) {
        console.log('Registration Successful');
      } else {
        console.log('Registration Not Successful');
      }
      return;
    });
  }

  checkIfUserExists();
};

registerAdmin(adminInfo);