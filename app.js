/* eslint linebreak-style: ["error", "windows"] */
const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const gifRoutes = require('./routes/gif');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/article', articleRoutes);
app.use('/api/v1/gif', gifRoutes);

app.listen(port, () => console.log(`you are running on ${port}`));
module.exports = app;
