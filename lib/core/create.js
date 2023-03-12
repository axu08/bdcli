const commander = require('commander')
const { cracteProjectAction } = require('./actions')

const createProject = () => {
    commander
        .command('create <project> [others...]')
        .description('clone a template project to you new project')
        .action(cracteProjectAction)
}

module.exports = {
    createProject
}