#!/usr/bin/env node
const commander = require('commander')
const createCommand = require('./lib/core/create')

// commander.version('1.0.0')
commander.version(require('./package.json').version)

createCommand.createProject()

commander.parse(process.argv)