'use strict';

var express = require('express')
  , morgan = require('morgan')
  , path = require('path')
  , app = express();

app
  .use(morgan('dev'))
  .use('/vendor', express.static(path.resolve(__dirname, 'bower_components')))
  .use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(process.env.PORT || 3000, function () {
  console.log('Started server...');
});