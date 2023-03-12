// 终端指令
// 子进程
const { spawn } = require('child_process')

const commandSpawn = (a, b, c) => {
    return new Promise((resolve, reject) => {
        // 开启子进程去运行npm install
        const spawnResult = spawn(a, b, c)
        // 把子进程的控制台信息输出到当前进程控制台
        spawnResult.stdout.pipe(process.stdout)
        spawnResult.stderr.pipe(process.stderr)
        // 监听 npm完毕，子进程关闭
        spawnResult.on('close', () => {
            resolve()
        })
    })
} 

module.exports = {
    commandSpawn
}