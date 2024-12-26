const express = require('express');
const router = express.Router();

// routes
router.get('', (req, res) => {
  const homes = {
    title: 'Home',
    description: 'Welcome to my blog'
  }
  res.render('blog/index', { homes });
});

router.get('/about', (req, res) => {
  res.render('blog/about', { title: 'About' });
});

module.exports = router;