const mongoose = require('mongoose');
var studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Student', studentSchema)

// const newStudent = new Student({
//   name: 'John Doe',
//   email: 'johndoe@example.com',
//   age: 25,
// });

// newStudent.save()
//   .then(user => console.log(user, 'created'))
//   .catch(err => console.log(err, 'error saving student'));