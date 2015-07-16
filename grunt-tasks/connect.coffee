module.exports = ->
  @loadNpmTasks "grunt-contrib-connect"

  @config "connect",
    server:
      options:
        port: 8000,
        base: ['./', './.tmp', './example', './lib']