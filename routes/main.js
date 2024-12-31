const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// routes
router.get('', async (req, res) => {
  try {
    const homes = {
      title: 'Home',
      description: 'Welcome to my blog'
    }
    let perPage = 5;
    let page = req.query.page || 1;
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }, { $skip: (perPage * page) - perPage }, { $limit: perPage }]).exec();

    const count = await Post.countDocuments();
    console.log(count);
    const nextPage = parseInt(page) + 1;
    const prevPage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('blog/index', {
      homes,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null
    });

  } catch (err) {
    console.log(err);

  }
});

router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    const homes = {
      title: data.title,
      description: data.body
    }
    res.render('blog/post', { homes, data });
  } catch (err) {
    console.log(err);
  }
});

// router.get('', async (req, res) => {
//   const homes = {
//     title: 'Home',
//     description: 'Welcome to my blog'
//   }
//   try {
//     const data = await Post.find();
//     res.render('blog/index', { homes, data });
//   } catch (err) {
//     console.log(err);

//   }
// });

router.get('/about', (req, res) => {
  res.render('blog/about', { title: 'About' });
});

router.get('/contact', (req, res) => {
  res.render('blog/contact', { title: 'Contact' });
});

router.get('/posts', async (req, res) => {

});

function insertPostData() {
  Post.insertMany([{
    title: 'Post 1',
    body: 'This is post 1'
  }, {
    title: 'Post 2',
    body: 'This is post 2'
  }, {
    title: 'Post 3',
    body: 'This is post 3'
  }])
}

// insertPostData();

module.exports = router;