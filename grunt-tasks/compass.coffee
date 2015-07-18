module.exports = ->
  @loadNpmTasks "grunt-contrib-compass"

  @config "compass",
    lib:
      options:
        sassDir: '<%= config.src %>/scss'
        cssDir: '<%= config.lib %>/'
        javascriptsDir: '<%= config.src %>/components'
        importPath: 'node_modules/bourbon/app/assets/stylesheets'
