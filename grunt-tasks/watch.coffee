module.exports = (grunt, options) ->
  @loadNpmTasks "grunt-contrib-watch"

  @config "watch",
    livereload:
      options:
        livereload: grunt.option('livereload') || true
      files: ['<%= config.tmp %>/**/*']

    compass:
      files: ['<%= config.src %>/scss/{,*/}*.{scss,sass}']
      tasks: ['compass']

  @event.on 'watch', (action, filepath, target) =>
    @log.writeln "#{target}:  #{filepath} has #{action}.."
