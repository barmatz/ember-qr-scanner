'use strict';

module.exports = function (grunt) {
  grunt.registerTask('build:scripts', [ 'emberTemplates', 'concat', 'uglify', 'clean' ]);
};