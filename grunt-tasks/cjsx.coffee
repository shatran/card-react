module.exports = ->
  @loadNpmTasks "grunt-coffee-react"

  @config "cjsx",
    build:
      files:
        '<%= config.lib %>/card-react-form-container.js': '<%= config.src %>/coffee/card-react-form-container.cjsx'
        '<%= config.lib %>/card-react-component.js': '<%= config.src %>/coffee/card-react-component.cjsx'
