/* eslint linebreak-style: ["error", "windows"] */
const express = require('express');

const app = express();

const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/article', articleRoutes);

app.listen(port, () => console.log(`you are running on ${port}`));
module.exports = app;
