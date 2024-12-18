const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', function (req, res) {
  res.render('student/addOredit', {
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

function insertRecord(req, res) {
  var student = new Student({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact
  });
  student.save((err, doc) => {
    if (!err)
      res.redirect('student/list');
    else {
      console.log('Error during record insertion: ', err);
      res.send('Error during record insertion: ', err);
    }
  });
}

function updateRecord(req, res) {
  Student.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact
  }, (err, doc) => {
    if (!err) {
      res.redirect('student/list');
    } else {
      console.log('Error during record update: ', err);
      res.send('Error during record update: ', err);
    }
  });
};

// router.get('/list', (req, res) => {
//   Student.find((err, docs) => {
//     if (!err) {
//       res.render('student/list', {
//         list: docs
//       });
//     } else {
//       console.log('Error in retrieving student list: ', err);
//     }
//   });
// }); //

router.get('/list', async (req, res) => {
  try {
    const student = await Student.find();
    res.render('student/list', { list: student });
  } catch (err) {
    console.log('Error in retrieving student list');
    res.send('Error in retrieving student list');
  }
});

// router.get('/:id', (req, res) => {
//   Student.findById(req.params.id, (err, doc) => {
//     if (!err) {
//       res.render('student/addOredit', {
//         viewTitle: 'Student Update',
//         student: doc
//       }); console.log(doc);
//     } else {
//       console.log('Error in student update: ', err);
//     }
//   });
// });

router.get('/:id', async (req, res) => {
  try {
    const doc = await Student.findById(req.params.id);
    if (!doc) {
      return res.status(404).send('student not found');
    }
    res.render('student/addOredit', {
      viewTitle: 'Student Update',
      student: doc
    }); console.log(doc);
  } catch (err) {
    console.log('Error in student update: ', err);
    res.status(500).send('Server Error');
  }
});

// router.get('delete/:id', (req, res) => {
//   Student.findByIdAndRemove(req.params.id, (err, doc) => {
//     if (!err) {
//       res.redirect('/student/list');
//     } else {
//       console.log('Error in student delete: ', err);
//     }
//   });
// });
router.delete('delete/:id', async (req, res) => {
  try {
    const result = await Student.findByIdAndRemove(req.params.id);
    if (!result) {
      return res.status(404).send('student not found');
    }
    res.send('Student deleted successfully');
  } catch (err) {
    console.log('Error in student delete: ', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;