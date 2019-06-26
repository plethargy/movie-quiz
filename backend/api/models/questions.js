'use strict'
const mongoose = require('mongoose')

// Create Category Schema for MongoDB
const questionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question: String,
  choice1: Array,
  choice2: Array,
  choice3: Array,
  category: Number,
  image: String
})

module.exports = mongoose.model('question', questionSchema)
