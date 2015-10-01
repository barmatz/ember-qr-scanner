'use strict';

module.exports = function (grunt) {
  grunt.registerTask('scripts', [ 'lint:scripts', 'build:scripts' ]);
};