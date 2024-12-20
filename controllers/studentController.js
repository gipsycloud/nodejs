const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
  res.render('student/addoredit', {
    viewTitle: 'Student Insert'
  });
}); //

router.post('/', function (req, res) {
  if (req.body._id == '') {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

async function insertRecord(req, res) {
  try {
    const student = new Student({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    });
    const result = await student.save();
    console.log(result);
    res.redirect('student/list');
  } catch (err) {
    console.log('Error during record insertion: ', err);
    res.send('Error during record insertion: ', err);
  }
}

async function updateRecord(req, res) {
  try {
    const doc = await Student.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true } // return updated document instead of original
    );
    res.redirect('student/list');
  } catch (err) {
    console.log('Error during record update: ', err);
    res.send('Error during record update: ', err);
  }
};

router.get('/list', async (req, res) => {
  try {
    const student = await Student.find();
    res.render('student/list', { list: student });
  } catch (err) {
    console.log('Error in retrieving student list', err);
    res.send('Error in retrieving student list');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render('student/addoredit', { viewTitle: 'Student Update', student: student });
  } catch (err) {
    console.log('Error in retrieving student: ', err);
    res.send('Error in retrieving student');
  }

});

router.get('/delete/:id', async (req, res) => {
  try {
    const doc = await Student.findByIdAndDelete(req.params.id);
    if (doc) {
      res.redirect('/student/list');
    } else {
      res.send('Error in deleting student');
    }
  } catch (err) {
    console.log('Error in student delete: ', err);
  }
})

module.exports = router;

