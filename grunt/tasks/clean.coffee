module.exports = ->
  @loadNpmTasks "grunt-contrib-clean"

  # Wipe out previous builds and test reporting.
  @config "clean",
    build: ['<%= config.tmp %>']
    dist: ['<%= config.dist %>']
