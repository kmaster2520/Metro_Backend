const express = require('express');
const router = express.Router();
const config = require('config');


// Database Setup
const MongoDBConnection = require('../database/mongodbconnect');
const dbInfo = config.get('mongoDB_info');
const dbCon = new MongoDBConnection(dbInfo);

// START TRIP
router.post('/start', (req, res) => {
  res.status(501).send({});
});

// END TRIP
router.post('/end', (req, res) => {
  res.status(501).send({});
});

// GET TRIP HISTORY
router.get('/history', (req, res) => {
  res.status(501).send({});
});






module.exports = router;