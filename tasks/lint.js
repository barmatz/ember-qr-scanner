'use strict';

module.exports = function (grunt) {
  grunt.registerTask('lint', [ 'lint:scripts', 'lint:stylesheets' ]);
};