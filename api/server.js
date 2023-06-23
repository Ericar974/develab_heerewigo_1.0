const dotenv = require('dotenv')
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const { auth } = require('express-openid-connect');
const db = require("./database/db");
const router = require('./routes');
const {query} = require("./database/db");
const app = express();
const bodyParser = require('body-parser');

db.up()

dotenv.load();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true
};

const port = process.env.PORT_API || 3000;
const url = process.env.BASE_URL || 'http://localhost'
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT_API && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}else {
  config.baseURL = process.env.BASE_URL;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  // redirect
  if (req.headers.host === '167.172.101.15:3000') {
    return res.redirect(301, process.env.BASE_URL + req.url);
  }
  res.locals.user = req.oidc.user;
  next();
});

app.use('/', router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  res.render('404', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});

http.createServer(app)
  .listen(3000, () => {
    console.log(`Listening on ${config.baseURL}`);
  });

