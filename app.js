const express = require('express');
const mongoose = require('mongoose');
const coronaRoute = require('./routes/virus');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// const ProgressBar = require('progress');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mogodb connection
mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log('Connected! app'))
  .catch((err) => {
    console.log(err);
  });

var ProgressBar = require('./progressbar.js');

// mongodb+srv://lesson:lesson123@lesson.mudrs.mongodb.net/?retryWrites=true&w=majority&appName=lesson
// app.get('/', (req, res) => {
//   // res.send('Hello, World!');
//   res.json({country: 'USA'});
// });

// middleware
// app.use('/', (req, res, next) => {
//   console.log('/ middleware');
//   next();  // async function

// });

// );
// app.use(express.json());
app.use('/api/coronas', coronaRoute);
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
