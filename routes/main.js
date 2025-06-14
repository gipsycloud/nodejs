const express = require('express');
const router = express.Router();
const fs = require('fs');
const { shortenerController } = require('../controllers/shortenerController');
const Post = require('../models/Post');
const { fetchContributions } = require('../helper/github').default;
// const Shortener = require('../models/shortenerModel');
// const path = require('path');

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
router.get('/portfolio', async (req, res) => {
  try {
    let perPage = 5;
    let page = req.query.page || 1;
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }, { $skip: (perPage * page) - perPage }, { $limit: perPage }]).exec();

    const count = await Post.countDocuments();
    console.log(count);
    const nextPage = parseInt(page) + 1;
    const prevPage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('blog/portfolio', {
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/',
      title: 'Blog',
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

router.get('/shortener', (req, res) => {
  res.render('blog/shortener', {
    title: 'URL Shortener',
    description: 'Welcome to my URL Shortener',
    currentRoute: '/shortener'
  });
});

// router.post('/shorten', shortenerController);

// router.post('/shorten', async (req, res) => {
//   const originalUrl = req.body.fullUrl;
//   const shortUrl = `${baseUrl}/${shortId.generate()}`;
//   res.render('blog/shortener', {
//     shortUrl,
//     originalUrl
//   });
// });

router.get('/', async (req, res) => {
  try {
    const {contributions, commitContributions} = await fetchContributions(
      process.env.GITHUB_USERNAME,
      process.env.GITHUB_TOKEN
    );
    if (!contributions) {
      throw new Error('Failed to fetch contributions');
    }
    const contributionDays = contributions.contributionCalendar.weeks.flatMap(week => 
      week.contributionDays.map(day => ({
        date: day.date,
        contributionCount: Number(day.contributionCount) || 0,
      }))
    );

    // Total commits across repositories
    const totalCommits = contributions.commitContributionsByRepository.reduce(
      (sum, repo) => sum + (repo.contributions.totalCount || 0),
      0
    );

    const commitStats = {
      total: commitContributions.reduce((sum, repo) => sum + (repo.contributions.totalCount || 0), 0),
      byRepo: commitContributions.map(repo => ({
        name: repo.repository.nameWithOwner,
        count: repo.contributions.totalCount || 0
      })),
    }

    // Calculate total contributions
    const monthLabels =[]
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let currentMonth = null;
    contributions.contributionCalendar.weeks.forEach((week, weekIndex) => {
      const firstDay = week.contributionDays[0].date;
      if(firstDay) {
        const date = new Date(firstDay);
        const month = date.getMonth();
        if (currentMonth !== month) {
          currentMonth = month;
          monthLabels.push({month: monthNames[currentMonth], weekIndex});
          currentMonth = month;
        }
      }
    });

    res.render('blog/index', {
      totalContributions: contributions.contributionCalendar.totalContributions,
      totalCommits,
      contributionDays,
      monthLabels,
      commitStats,
      title: 'My Portfolio',
      description: 'Welcome to my Protfolio',
      currentRoute: '/'
  });
  } catch (err) {
    console.log(err);
  }
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