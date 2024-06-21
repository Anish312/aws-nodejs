const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes

// Error handling middleware
app.use(errorMiddleware);



module.exports = app;
