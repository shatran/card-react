module.exports = ->
  @loadNpmTasks "grunt-contrib-cssmin"

  @config "cssmin",
    target:
      files: [
        expand: true
        cwd: '<%= config.tmp %>'
        src: ['**/*.css', '!**/*.min.css']
        dest: '<%= config.lib %>'
      ]