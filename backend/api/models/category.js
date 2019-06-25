'use strict'
const mongoose = require('mongoose')

// Create Category Schema for MongoDB
const catSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  category: String
})

module.exports = mongoose.model('category', catSchema)
