'use strict';

var fs = require('fs')
  , path = require('path')
  , basename = path.basename(module.filename)
  , config = {};

fs
  .readdirSync(__dirname)
  .forEach(function (filename) {
    if (filename.indexOf('.') > 0 && filename !== basename) {
      config[path.basename(filename, path.extname(filename))] = JSON.parse(fs.readFileSync(path.resolve(__dirname, filename)));
    }
  });

module.exports = config;
