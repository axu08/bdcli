// 给控制台输出上色
const chalk = require('chalk')
const {
    promisify
} = require('util')
// require('down-git-repo') 引入的时候一个函数，promisify 把这个函数改造成promise函数。这样不会出现回调地狱的情况
// download-git-repo 这个插件帮你下载仓库代码
const download = promisify(require('download-git-repo'))

const {
    vue2Project, vue3Project
}= require('../config/projectPath')

const {
    commandSpawn
} = require('../utils/terminal')
// 1 clone project
// 2 npm install
// 3 npm run serve
// const cracteProjectAction = (project, others) => {
//     console.log(project, others)
//     download().then(res => {
//         console.log(res)
//     }).catch(err => {
//         console.log(err)
//     })
// }
const cracteProjectAction = async (project, others) => {
    // 1 clone project
    console.log(chalk.green('Creating project ~'))

    // vueProject: 项目地址  project：新建的项目名称  { clone: true }： 是否克隆git记录

    await download(vue3Project, project, {
        clone: true
    })
    // 2 npm install    {cwd: `./${project}`: 进入这个目录运行npm
    // console.log(process.platform).
    /**
     * await spawn('npm', ['install'], { cwd: `./${name}` }) 会报错
     * 报错原因：在windows下npm的执行命令不同
     */
    await commandSpawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], {
        cwd: `./${project}`
    })

    await commandSpawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'serve'], {
        cwd: `./${project}`
    })
}

module.exports = {
    cracteProjectAction
}