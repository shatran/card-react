module.exports = ->
  @loadNpmTasks "grunt-browserify"

  devFiles =
    '<%= config.tmp %>/example/card-loader.js': ['example/card-loader.cjsx']

  prodFiles =
    '<%= config.lib %>/card-react-form-container.js': ['<%= config.src %>/coffee/card-react-form-container.cjsx']
    '<%= config.lib %>/card-react-component.js': ['<%= config.src %>/coffee/card-react-component.cjsx']


  browserifyOptions =
    paths: ['./<%= config.src %>', './example', './<%= config.src %>/coffee']
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

      prod:
        files : prodFiles
        options:
          watch: false
          external: ['react', 'classnames', 'payment', './card-react-component']
          browserifyOptions: browserifyOptions
