const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./routes/api');

const app = express();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
/* eslint-disable no-console */
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected To DB!'));
/* eslint-enable no-console */

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
