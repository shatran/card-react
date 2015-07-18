module.exports = ->
  @loadNpmTasks "grunt-coffee-react"

  @config "cjsx",
    build:
      files:
        '<%= config.lib %>/card-react-form-container.js': '<%= config.src %>/components/card-react-form-container.cjsx'
        '<%= config.lib %>/card-react-component.js': '<%= config.src %>/components/card-react-component.cjsx'
