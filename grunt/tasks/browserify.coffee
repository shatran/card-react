module.exports = ->
  @loadNpmTasks "grunt-browserify"

  devFiles =
    '<%= config.tmp %>/card.js': ['<%= config.src %>/coffee/card.cjsx']
    '<%= config.tmp %>/example/card-loader.js': ['example/card-loader.cjsx']

  prodFiles =
    '<%= config.dist %>/card.js': ['<%= config.src %>/coffee/card.cjsx']

  @config "browserify",
      options:
        transform: ['coffee-reactify']
        extensions: ['.coffee', '.cjsx']
      dev:
        files : devFiles
        options:
          watch: true
          browserifyOptions: # Doesn't work if placed in the task-level options. See https://github.com/jmreidy/grunt-browserify/issues/280
            paths: ['./<%= config.src %>', './example']
            debug: true
      prod:
        files : prodFiles
        options:
          watch: false
          external: ['react']
          browserifyOptions:
            paths: ['./<%= config.src %>']
            debug: false