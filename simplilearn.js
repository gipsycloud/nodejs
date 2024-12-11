const express = require('express');
const app = express();
const ProgressBar = require('progress');
const jwt = require('jsonwebtoken');
const port = 3000; // You can change this port if needed

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./routes/api/users'));
// app.use('/jwt', require('./routes/api/users'));

app.get('/jwt', (req, res) => {
  res.json({ message: 'API is running!' });
});

app.post('/jwt/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403); // forbidden
    } else {
      res.json({
        message: 'Post created by authenticated user',
        authData,
      });
    }
  });
  // res.json({ message: 'Posts created!' });
}); //

app.post('/jwt/login', (req, res) => {
  const user = {
    id: 1, username: 'maung maung', email: 'maung@gmail.com' //
  };
  jwt.sign({ user: user }, 'secretkey', (err, token) => {
    res.json({ token });
  })
}); //

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next();
  } else {
    res.sendStatus(403);
    return;
  }
};



const bar = new ProgressBar(':bar :rate/bps :percent :etas', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);

app.listen(port, () => {

  console.log(`listening on port ${new Date()}`);
}

);