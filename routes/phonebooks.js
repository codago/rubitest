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

router.get('/:id', function(req, res, next) {
  Phonebook.findById(req.params.id, function(err, phonebook){
    if(err){
      res.json({'ERROR': err})
    }else{
      res.json(phonebook);
    }
  })
});

router.post('/', function(req, res, next){
  let phonebook = new Phonebook({
    name: req.body.name,
    phone: req.body.phone
  });
  phonebook.save(function(err, data){
    if(err){
      res.json({'ERROR': err})
    }else{
      res.json({'SUCCESS': data})
    }
  })
})

router.put('/:id', function(req, res, next){
  Phonebook.findById(req.params.id, function(err, phonebook){
    if(err){
      res.json({'ERROR': err})
    }else{
      phonebook.name = req.body.name;
      phonebook.phone = req.body.phone;
      phonebook.save(function(err){
        if(err){
          res.json({'ERROR': err});
        }else{
          res.json({'UPDATED': phonebook});
        }
      })
    }
  })
})

router.delete('/:id', function(req, res, next){
  Phonebook.findById(req.params.id, function(err, phonebook){
    if(err){
      res.json({'ERROR': err});
    }else{
      phonebook.remove(function(err){
        if(err){
          res.json({'ERROR': err});
        }else{
          res.json({'REMOVED': phonebook})
        }
      })
    }
  })
})

module.exports = router;
