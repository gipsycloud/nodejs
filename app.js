require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser'); // save session for username and password when we login with session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const path = require('path');

// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// connect to db
const connectDb = require('./server/config/db');
connectDb();

// routes
const { isActiveRoute } = require('./server/helpers/routeHelpers');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); // override the method of the form
app.use(morgan('dev'));  // log the request

app.use(express.static('public'));  // serve static files
app.use(expressLayout);
app.set('layout', './layouts/blog/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,  // you can add your own secret here (e.g. pass, mysecret)
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    // maxAge: 2678400000 // 31 days
    maxAge: 86400000 // 24 hours
  },
}))

// create global variables
app.locals.isActiveRoute = isActiveRoute;

app.use('/', require('./routes/main'));
app.use('/', require('./routes/admin'));

var ProgressBar = require('./progressbar.js');

// mongodb+srv://lesson:lesson123@lesson.mudrs.mongodb.net/?retryWrites=true&w=majority&appName=lesson
// app.use(express.json());
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
