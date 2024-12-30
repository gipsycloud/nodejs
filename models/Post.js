const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  body: {
    type: String,
    required: [true, 'Please provide a body']
  },
  // content: {
  //   type: String,
  //   required: [true, 'Please provide content']
  // },
  createAt: {
    type: Date,
    default: Date.now
  },
  upatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);