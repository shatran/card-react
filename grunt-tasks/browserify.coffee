module.exports = ->
  @loadNpmTasks "grunt-browserify"

  devFiles =
    '<%= config.tmp %>/example/card-loader.js': ['example/card-loader.cjsx']

  browserifyOptions =
    paths: ['./<%= config.src %>', './example', './<%= config.src %>/components']
    extensions: ['.coffee', '.cjsx']
    debug: true

  @config "browserify",
      options:
        transform: ['coffee-reactify']
      dev:
        files : devFiles
        options:
          watch: true
          browserifyOptions: browserifyOptions # Doesn't work if placed in the task-level options. See https://github.com/jmreidy/grunt-browserify/issues/280