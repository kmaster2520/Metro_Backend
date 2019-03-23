const express = require('express');
const router = express.Router();
const config = require('config');


// Database Setup
const MongoDBConnection = require('../database/mongodbconnect');
const dbInfo = config.get('mongoDB_info');
const dbCon = new MongoDBConnection(dbInfo);


// CREATE STATION (ADMIN ONLY)
router.post('/add', (req, res) => {
  res.status(501).send({});
});

// CREATE STATION (ADMIN ONLY)
router.delete('/delete', (req, res) => {
  res.status(501).send({});
});

// SET MAXIMUM FARE (ADMIN ONLY)
router.patch('/maxfare', (req, res) => {
  res.status(501).send({});
});

// SET MINIMUM FARE (ADMIN ONLY)
router.patch('/minfare', (req, res) => {
  res.status(501).send({});
});

// SET STATION FARE (MANAGER ONLY)
router.patch('/setfare', (req, res) => {
  res.status(501).send({});
});

// OPEN/CLOSE STATION (MANAGER AND ADMIN ONLY)
router.patch('/setstatus', (req, res) => {
  res.status(501).send({});
});

// REQUEST OWNERSHIP TRANSFER (MANAGER ONLY)
router.post('/requesttransfer', (req, res) => {
  res.status(501).send({});
});

// TRANSFER OWNERSHIP (ADMIN ONLY)
router.patch('/transfer', (req, res) => {
  res.status(501).send({});
});

// GET LINE DATA
router.get('/rails', (req, res) => {
  dbCon.getRails((lines) => {
    res.status(200).send({ lines });
  });
});








module.exports = router;