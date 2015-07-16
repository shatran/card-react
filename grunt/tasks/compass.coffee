module.exports = ->
  @loadNpmTasks "grunt-contrib-compass"

  @config "compass",
    dist:
      options:
        sassDir: '<%= config.src %>/scss'
        cssDir: '<%= config.tmp %>/'
        javascriptsDir: '<%= config.src %>/coffee'
        importPath: 'node_modules/bourbon/app/assets/stylesheets'
