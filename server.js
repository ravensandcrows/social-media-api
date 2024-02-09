const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//start once the datbase has begun
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Running server on port ${PORT}`);
    });
  });