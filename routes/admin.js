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
    res.render('admin/index', {
      title: 'Login | admin.js',
      description: 'Welcome to my blog',
      layout: adminLayout
    });
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

// dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find();
    res.render('admin/dashboard', { title: 'Dashboard', description: 'Welcome to the admin panel', posts, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

// show a post
router.get('/admin/posts/:id', async (req, res) => {
  try {
    let slug = req.params.id;
    const post = await Post.findById({ _id: slug });
    res.render('admin/posts/show', { post, title: post.title, description: post.body });
  } catch (err) {
    console.log(err);
  }
});

// create new post
router.get('/admin/posts/new', authMiddleware, async (req, res) => {
  try {
    const post = await Post.find();
    res.render('admin/posts/new', { layout: adminLayout, title: 'New Post', description: 'Create a new post', post });
  } catch (err) {
    console.log(err);
  }
});

// add a new post
router.post('/add-post', authMiddleware, async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      // content: req.body.content
    });
    await post.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
});

// edit a post
router.get('/admin/posts/:id/edit', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.render('admin/posts/edit', { post, title: post.title, description: post.body, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

// edit a post
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      // content: req.body.content
      upatedAt: Date.now()
    });
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

// delete a post
router.delete('/admin/delete-post/:id', authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
}); //

// login a user
router.get('/login', (req, res) => {
  res.render('admin/index', { title: 'Admin', description: 'Welcome to my blog' });
});

// logout a user
router.get('/logout', (req, res) => {
  res.clearCookie('token'); // clear the token from the browser cookies
  res.redirect('/');
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