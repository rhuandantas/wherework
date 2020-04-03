require('./database/database');
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);

module.exports = app;