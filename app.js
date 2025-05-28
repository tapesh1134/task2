const express = require('express');
const app = express();
const auth = require('./routes/auth');
const event = require('./routes/event');
const book = require('./routes/booking');

app.use(express.json());
app.use('/auth', auth);

app.use('/event', event);

app.use('/book', book);

app.get('/', (req, res) => res.send('Hello'));

module.exports = app;
