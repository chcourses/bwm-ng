const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/user');

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
  });

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(3001, () => {
  console.log('I am running');
});