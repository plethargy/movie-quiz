'use strict'
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Category = require('../models/category')

router.get('/', (req, res, next) => {
  Category.find()
    .then(results => {
      res.send(results)
    })
    .catch(err => {
      res.send(err)
    })
})

// Mock creation of a question

router.get('/create', (req, res, next) => {
  const c = new Category({
    _id: new mongoose.Types.ObjectId(),
    id: 2,
    category: 'History'
  })
  c.save()
    .then(results => {
      // console.log(results)
      res.send(results)
    })
    .catch(err => {
      // console.log(err)
      res.send(err)
    })
})

module.exports = router
