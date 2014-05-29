module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    sass:
      dist:
        options:
          sourcemap: true
        files:
          'lazyColor.css': 'lazyColor.sass'
    autoprefixer:
      options:
        browsers: ['last 3 versions', 'ie 8']
        diff: true
        map: true
      single_file:
        src: 'lazyColor.css'
        # overwrite original
        dest: 'lazyColor.css'
    jshint:
      all: 'js/*.js'
    browserify:
      options:
        bundleOptions:
          debug: true
        transform: ['browserify-shim']
      all:
        files:
          'lazyColor.js': 'js/main.js'
    watch:
      options:
        livereload: true
      sass:
        files: ['*.sass']
        tasks: ['sass', 'autoprefixer']
        options:
          livereload: false
          # spawn has to be on or else the css watch won't catch changes
          spawn: true
      css:
        files: ['*.css']
        options:
          spawn: false
      js:
        files: ['js/*.js']
        tasks: ['browserify']
        options:
          spawn: false


  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # build the assets needed
  grunt.registerTask('build', ['sass', 'autoprefixer', 'browserify'])
  # build the assets with sanity checks
  grunt.registerTask('default', ['sass', 'autoprefixer', 'jshint', 'browserify'])
  # build assets and automatically re-build when a file changes
  grunt.registerTask('dev', ['build', 'watch'])
