const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let index = require('../routes/index');

let db_config = {
  development: 'mongodb://localhost/stackoverflow-dev',
  test: 'mongodb://localhost/stackoverflow-test'
}

let app_env = app.settings.env;

mongoose.connect(db_config[app_env], function(err, res) {
  console.log(`connected to database ${db_config[app_env]}`);
});


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', index);

let port = 3000;
app.listen(port);
console.log(`listening to ${port}`);
