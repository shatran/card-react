module.exports = ->
  @loadNpmTasks "grunt-contrib-sass"

  @config "sass",
    dist:
      files: [{
        expand: true,
        cwd: 'src/scss',
        src: ['*.scss'],
        dest: '<%= config.tmp %>/',
        ext: '.css'
      }]
