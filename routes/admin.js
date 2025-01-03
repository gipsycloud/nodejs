const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = './layouts/blog/admin';

router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: 'Admin',
      description: 'Welcome to the admin panel'
    }

    res.render('admin/index', { locals, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (req.body.username === 'admin' && req.body.password == 'password') {
      res.send('You are logged in');
    } else {
      res.send('Invalid credentials');
    }
  } catch (err) {
    console.log(err);
  }
});

// register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword.toString(), req.body);
    try {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
      });
      console.log(user);
      await user.save();
      res.status(201).json({ message: 'User created', user });
    } catch (err) {
      if (err.code === 11000) {
        res.send('User already exists');
      }
      res.status(500).send('Server error');
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;