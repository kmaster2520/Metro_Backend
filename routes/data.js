const express = require('express');
const router = express.Router();
const config = require('config');

// Database Setup
const MongoDBConnection = require('../database/mongodbconnect');
const dbInfo = config.get('mongoDB_info');
const dbCon = new MongoDBConnection(dbInfo);


// GET LINE DATA
router.get('/rails', (req, res) => {
  dbCon.getRails((lines) => {
    res.status(200).send({ lines });
  });
});


module.exports = router;