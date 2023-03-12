// 给控制台输出上色
const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const {
    promisify
} = require('util')
// require('down-git-repo') 引入的时候一个函数，promisify 把这个函数改造成promise函数。这样不会出现回调地狱的情况
// download-git-repo 这个插件帮你下载仓库代码
const download = promisify(require('download-git-repo'))

const projectPro = require('../config/projectPath')

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
    const cwd = others.cwd || process.cwd()
    const targetDir = path.resolve(cwd, project || '.')
    // 1 clone project
    console.log()
    console.log(chalk.green('Creating project ~'))
    console.log()

    if (fs.existsSync(targetDir)) {
        const {
            ok
        } = await inquirer.prompt([{
            name: 'ok',
            type: 'confirm',
            message: `Generate project in current directory?`
        }])
        if (!ok) return
        const {
            action
        } = await inquirer.prompt([{
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
            choices: [{
                    name: 'Overwrite',
                    value: 'overwrite'
                },
                {
                    name: 'Cancel',
                    value: false
                }
            ]
        }])
        if (!action) return
        console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
        await fs.remove(targetDir)
    }
    // const featurePrompt = {
    //     name: 'features',
    //     when: true,
    //     type: 'checkbox',
    //     message: 'Select the type of your project',
    //     choices: [],
    //     pageSize: 10
    // }

    // await inquirer.prompt(featurePrompt)
    const projectTypes = [{
            name: 'SelectType',
            when: true,
            type: 'list',
            message: 'Select the type of your project ?',
            choices: [{
                    name: 'Vue 2.0 (default)',
                    value: 'vue2'
                },
                {
                    name: 'Vue 3.0 + Ts',
                    value: 'vue3_ts'
                },

                {
                    name: 'Vue 3.0 + Ts - Class-Style Component',
                    value: 'vue3_ts_class'
                },
                {
                    name: 'Vue 3.0 + Vite',
                    value: 'vue3_vite'
                }
            ]
        }
        // {
        //   name: 'save',
        //   when: true,
        //   type: 'confirm',
        //   message: 'Save this as a preset for future projects?',
        //   default: false
        // },
        // {
        //   name: 'saveName',
        //   when: true,
        //   type: 'input',
        //   message: 'Save preset as:'
        // }
    ]
    const {
        SelectType
    } = await inquirer.prompt(projectTypes)
    console.log(projectPro[SelectType])
    // vueProject: 项目地址  project：新建的项目名称  { clone: true }： 是否克隆git记录

    await download(projectPro[SelectType], project, {
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