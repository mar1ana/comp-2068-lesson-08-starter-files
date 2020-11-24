// Setting up environment variables
require('dotenv').config();

// Our server setup
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// Connecting Mongo and setting up Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.catch(error => console.error(`Error: ${error}`));

// Implementing Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// registering the routes
const routes = require('./routes');
const router = routes(express.Router());
app.use(router);

// error handling
const { handle404s, errorHandler } = require('./errorHandling');
app.use(handle404s);
app.use(errorHandler);

app.listen(4000, () => console.log("Always watching... on port 4000"));
