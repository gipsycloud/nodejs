import pinoHttp from 'pino-http';
import logger from './src/utils/logger';

import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { randomUUID } from "node:crypto";
import { SpeedInsights } from "@vercel/speed-insights/next"

require('dotenv').config();
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser'); // save session for username and password when we login with session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const path = require('path');
const shortId = require('shortid');

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
app.set('views', path.join(process.cwd(), 'views'));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(pinoHttp({ logger,
  genReqId(req, res) {
      const suppliedId = req.headers["x-request-id"];

      const requestId =
        typeof suppliedId === "string" &&
        suppliedId.length <= 100 &&
        /^[A-Za-z0-9._:-]+$/.test(suppliedId)
          ? suppliedId
          : randomUUID();

      res.setHeader("x-request-id", requestId);

      return requestId;
    },
    customLogLevel(_req, res, err) {
      if (err || res.statusCode >= 500) {
        return "error";
      }

      if (res.statusCode >= 400) {
        return "warn";
      }

      return "info";
    }
 }));

const mongoUrl = process.env.MONGODB_URI;
if (!mongoUrl) {
  throw new Error('Cannot init client. Please provide correct options');
}

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,  // you can add your own secret here (e.g. pass, mysecret)
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl }),
  cookie: {
    // maxAge: 2678400000 // 31 days
    maxAge: 86400000 // 24 hours
  },
}))

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
// create global variables
app.locals.isActiveRoute = isActiveRoute;

app.use('/', require('./routes/main'));
app.use('/', require('./routes/admin'));

var ProgressBar = require('./progressbar');

// Deliberate training-only error.
app.get(
  "/training/trigger-error",
  (_req: Request, _res: Response, next: NextFunction) => {
    next(new Error("Simulated database connection failure"));
  }
);

// mongodb+srv://lesson:lesson123@lesson.mudrs.mongodb.net/?retryWrites=true&w=majority&appName=lesson
// app.use(express.json());
// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
// Unknown route handler.
app.use(
  (req: Request, res: Response) => {
    logger.warn(
      {
        requestId: res.getHeader("x-request-id"),
        method: req.method,
        path: req.path
      },
      "Route not found"
    );
    return res.status(404).json({
      error: "Route not found"
    });
  }
);

// Centralized error handler.
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const requestId = res.getHeader("x-request-id");

    logger.error(
      {err,
      requestId,
      method: req.method,
      path: req.path},
      "Unhandled application error"
    );
    return res.status(500).json({
      error: "Internal server error",
      requestId
    });
  }
);

app.listen(3000, () => {
  logger.info("Server running on port ${PORT}");
});
