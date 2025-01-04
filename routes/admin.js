const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = './layouts/blog/admin';
const jwtSecret = process.env.JWT_SECRET;

// middleware to check if user is logged in
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // get the token from the brower cookies
  // console.log(req.cookies.token);
  if (!token) {
    // return res.redirect('/admin', { message: 'You must be logged in' });
    return res.redirect('/admin');
  }
  const decodedToken = jwt.verify(token, jwtSecret); // decode the token to get the user id and secret from the token object returned by jwt.verify method of the jsonwebtoken package
  const user = User.findById(decodedToken.userId);
  if (!user) {
    return res.redirect('/admin');
  }
  req.user = user;
  next();
};

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
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credntials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ message: 'Invalid credntials' });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie('token', token, { httpOnly: true });

    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
});

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find();
    res.render('admin/dashboard', { title: 'Dashboard', description: 'Welcome to the admin panel', posts });
  } catch (err) {
    console.log(err);
  }
  res.render('admin/dashboard', { title: 'Dashboard', description: 'Welcome to the admin panel' });
});

// create new post
router.get('/admin/posts/new', authMiddleware, async (req, res) => {
  try {
    const data = await Post.find();
    res.render('admin/posts/new', { layout: adminLayout, title: 'New Post', description: 'Create a new post', data });
  } catch (err) {
    console.log(err);
  }
});

router.get('/admin/posts/:id/edit', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('admin/posts/show', { layout: adminLayout, title: post.title, description: post.description, post });
  } catch (err) {
    console.log(err);
  }
});

// login a user
router.get('/login', (req, res) => {
  res.render('admin/index', { title: 'Admin', description: 'Welcome to my blog' });
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

router.get('/register', (req, res) => {
  res.render('admin/register', { title: 'Admin Register', description: 'Welcome to my blog' });
});

module.exports = router;