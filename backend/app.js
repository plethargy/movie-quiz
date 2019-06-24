const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const userRoutes = require('./api/routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "*"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET');
        return res.status(200).json({});
    }
    next();
  });
  
  app.use('/user', userRoutes);
  
  app.use((req, res, next) => {
    var error = new Error("Resource not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        status: error.status,
        message: error.message
      }
    });
  });

module.exports = app;