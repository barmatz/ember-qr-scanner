'use strict';

var fs = require('fs')
  , path = require('path')
  , basename = path.basename(module.filename);

module.exports = function (grunt) {
  fs
    .readdirSync(__dirname)
    .forEach(function (filename) {
      if (filename.indexOf('.') > 0 && filename !== basename) {
        require(path.resolve(__dirname, filename))(grunt);
      }
    });
};
