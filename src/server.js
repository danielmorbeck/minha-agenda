const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tasksdb', {useNewUrlParser: true, useUnifiedTopology: true});

const routes = require('./api/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(routes);

app.listen(port);
