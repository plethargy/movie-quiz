'use strict'
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Questions = require('../models/questions')

router.get('/:id', (req, res, next) => {
  // Return questions according to category from the database
  Questions.find({ category: req.params.id })
    .then(data => {
      res.status(200).json({
        status: true,
        results: data
      })
    })
  // Was there an error?
    .catch(err => {
      res.status(500).json({
        status: false,
        results: err
      })
    })
})

// Mock Question creation
router.post('/create', (req, res, next) => {
  const question = new Questions({
    _id: new mongoose.Types.ObjectId(),
    question: req.body.question,
    choice1: req.body.choice1,
    choice2: req.body.choice2,
    choice3: req.body.choice3,
    category: req.body.category,
    image: req.body.image
  })

  question.save()
    .then(data => {
      res.status(200).json({
        status: true,
        results: data
      })
    })
    .catch(err => {
      res.status(500).json({
        status: false,
        results: err
      })
    })
})


router.post('/delete', (req, res, next) =>{
  Questions.deleteOne({ category: req.body.category },  (err) => {
    if (err) 
      res.status(200).json({
        status: false,
        results: err
      }); 
  })
  .then(data => {
    res.status(200).json({
      status: true,
      results: data
    });
  })
  .catch(err => {
    res.status(500).json({
      status: false,
      results: err
    });
  });
});

module.exports = router
