const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

// Set The Storage Engine
router.get('/download', (req, res) => {
  console.log(`public/upload/`);
  const file_path = 'public/upload/ATW_ROR_PO_F.pdf';
  if (fs.existsSync(file_path)) {
    res.download(file_path, 'ATW_ROR_PO_F.pdf', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File downloaded successfully');
      }
    });
  } else {
    res.status(404).send('File not found');
  }
});
// routes
router.get('', async (req, res) => {
  try {
    // const homes = {
    //   title: 'Home',
    //   description: 'Welcome to my blog'
    // }
    let perPage = 5;
    let page = req.query.page || 1;
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }, { $skip: (perPage * page) - perPage }, { $limit: perPage }]).exec();

    const count = await Post.countDocuments();
    console.log(count);
    const nextPage = parseInt(page) + 1;
    const prevPage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('blog/index', {
      // homes,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/',
      title: 'Home',
      description: 'Welcome to my blog'
    });

  } catch (err) {
    console.log(err);

  }
});

router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    res.render('blog/post', {
      data,
      currentRoute: '/post/' + slug,
      title: data.title,
      description: data.body
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/search', async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialCharacters = searchTerm.replace(/[^a-zA-Z0-9]/g, '');
    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialCharacters, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialCharacters, 'i') } }
      ]
    });
    res.render('blog/search', {
      data,
      title: 'Search',
      description: 'Welcome to my blog'
    });
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
  res.render('blog/about', {
    title: 'About',
    description: 'Welcome to my blog',
    currentRoute: '/about'
  });
});

router.get('/contact', (req, res) => {
  res.render('blog/contact', {
    title: 'Contact',
    description: 'Welcome to my blog',
    currentRoute: '/contact'
  });
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