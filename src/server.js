const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const injectUser = require('./api/middlewares/injectUser.middleware');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tasksdb', {useNewUrlParser: true, useUnifiedTopology: true});

const routes = require('./api/routes');

const app = express();
const port = process.env.PORT || 3333;

app.use(injectUser)
app.use(bodyParser.json());

app.use(routes);

app.listen(port);
