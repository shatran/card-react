
module.exports = (grunt) ->

  config =
    src: "src"
    lib: "lib"
    tmp: ".tmp"

  @initConfig
    config: config
  # Load task configurations.
  @loadTasks "grunt-tasks"

  @registerTask "build", [
    "clean"
    "cjsx"
    "sass"
    "cssmin"
    "clean:build"
  ]

  @registerTask "dev", [
    "clean"
    "cjsx"
    "browserify:dev"
    "sass"
    "connect"
    "watch"
  ]

  return
