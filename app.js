require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const connectDb = require('./server/config/db');

// connect to db
connectDb();
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use(expressLayout);
app.set('layout', './layouts/blog/main');
app.set('view engine', 'ejs');

app.use('/', require('./routes/main'));
app.use('/', require('./routes/admin'));

// Middleware
// app.use(cors());
// app.use(bodyParser.json());

// Mogodb connection
// mongoose.connect('mongodb://localhost:27017')
//   .then(() => console.log('Connected! app'))
//   .catch((err) => {
//     console.log(err);
//   });

var ProgressBar = require('./progressbar.js');

// mongodb+srv://lesson:lesson123@lesson.mudrs.mongodb.net/?retryWrites=true&w=majority&appName=lesson
// app.use(express.json());
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
