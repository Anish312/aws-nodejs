const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const products = require('./routes/productRoute');  // Corrected the path if needed
const errorMiddleware = require('./middleware/error');

const app = express();
const port = 80;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/v1", products);  // Added the leading slash and fixed the route path

// Error handling middleware
app.use(errorMiddleware);

// Starting the server after syncing with the database
sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

