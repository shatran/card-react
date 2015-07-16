saveLicense = require 'uglify-save-license'

module.exports = ->
  @loadNpmTasks "grunt-contrib-uglify"

  @config "uglify",
    js:
      options:
        preserveComments: saveLicense
      expand: true,
      cwd: '<%= config.tmp%>/'
      src: '**/*.js',
      dest: '<%= config.lib%>/'

