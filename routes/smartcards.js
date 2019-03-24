const express = require('express');
const router = express.Router();
const config = require('config');


// Database Setup
const MongoDBConnection = require('../database/mongodbconnect');
const dbInfo = config.get('mongoDB_info');
const dbCon = new MongoDBConnection(dbInfo);


// CREATE NEW CARD
router.post('/new', (req, res) => {
  res.status(501).send({});
});

// CANCEL CARD
router.delete('/delete', (req, res) => {
  res.status(501).send({});
});

// RELOAD CARD
router.post('/reload', (req, res) => {
  let amount = req.body.amount;
  res.status(501).send({});
});

// GET CARD INFO
router.get('/info', (req, res) => {
  res.status(501).send({});
});

// (UN)SUSPEND CARD (ADMIN ONLY)
router.patch('/suspend', (req, res) => {
  res.status(501).send({});
});





module.exports = router;