const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

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

module.exports = router;