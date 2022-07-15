#!/usr/bin/env node
import inquirer from "inquirer"
import fs from "fs"
import path from "path"
import ejs from "ejs"
import url from "url"
const __filename = url.fileURLToPath(import.meta.url)


// const __dirname = path.resolve()
inquirer.prompt([
  {
    type: "input",
    message: "请输入",
    name: "name"
  }
]).then((answers) => {
  console.log(answers)
  console.log(__filename)
  const templateDir = path.join(__filename, "../template")
  // process.cwd 获取当前正在执行命令的目录
  const destDir = process.cwd()
  fs.readdir(templateDir, (err, fileList) => {
    if (err) throw err
    fileList.forEach((file) => {
      // console.log(file) // index.css  index.js
      const templateFilePath = path.join(templateDir, file)
      // 三个参数，第一个是模版路径，第二个是填入参数，第三个是毁掉
      ejs.renderFile(templateFilePath, answers, (err, result) => {
        if (err) throw err
        console.log(result)
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })


})

