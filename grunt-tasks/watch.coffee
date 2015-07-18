module.exports = (grunt, options) ->
  @loadNpmTasks "grunt-contrib-watch"

  @config "watch",
    livereload:
      options:
        livereload: grunt.option('livereload') || true
      files: [ '<%= config.lib %>/**/*','<%= config.tmp %>/**/*']

    compass:
      files: ['<%= config.src %>/scss/{,*/}*.{scss,sass}']
      tasks: ['compass']

    cjsx:
      files: ['<%= config.src %>/components/{,*/}*.{cjsx,coffee}']
      tasks: ['cjsx']

    browserify:
      files: ['example/{,*/}*.{cjsx, coffee}']
      tasks: ['browserify']

  @event.on 'watch', (action, filepath, target) =>
    @log.writeln "#{target}:  #{filepath} has #{action}.."
