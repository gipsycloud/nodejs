const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: 'Title is required',
    minlength: 4,
    maxlength: 150
  },
  completed: Boolean,
  description: {
    type: String,
    // required: 'Description is required',
    minlength: 4,
    maxlength: 2000
  },
  status: {
    type: String,
    // required: 'Status is required',
    enum: ['pending', 'completed', 'in progress'],
    default: 'pending'
  },
  dueDate: {
    type: Date,
    // required: 'Due date is required'
  },
  priority: {
    type: String,
    // required: 'Priority is required',
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  }
});

module.exports = mongoose.model('Todo', todoSchema);