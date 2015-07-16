
module.exports = (grunt) ->

  config =
    src: "src"
    lib: "lib"
    tmp: ".tmp"

  @initConfig
    config: config
  # Load task configurations.
  @loadTasks "grunt/tasks"

  @registerTask "build", [
    "clean"
    "browserify:prod"
    "compass"
    "cssmin"
    "clean:build"
  ]

  @registerTask "default", [
    "clean"
    "browserify:dev"
    "compass"
    "connect"
    "watch"
  ]

  return