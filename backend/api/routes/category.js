'use strict'
const express = require('express')
const router = express.Router()

const Category = require('../models/category')

router.get('/', (req, res, next) => {
  // Return categories from the database
  Category.find()
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

module.exports = router
