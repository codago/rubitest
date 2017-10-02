'use strict'

const express = require('express');
const router = express.Router();
const Phonebook = require('../models/phonebook');


/* GET users listing. */
router.get('/', function(req, res, next) {
  Phonebook.find(function(err, phonebooks){
    if(err){
      res.json({'ERROR': err})
    } else {
      res.json(phonebooks)
    }
  })
});

module.exports = router;
