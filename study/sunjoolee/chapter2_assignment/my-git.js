import fs from 'fs-extra';
import pkg from 'glob';
import path from 'path';
const { glob } = pkg;

/**
 * @fileoverview
 * - 1주차 과제 - Git 구현하기
 * @example node {path to my-git.js} {current path} {my-git command} {argument list (optional)}
 */

const args = process.argv.slice(2)
if (args.length < 2) throw SyntaxError("Wrong number of arguments! Enter at least 2 argument")

const curDir = args[0]
/**
 * my-git 명령어 파싱
 * - init - 새로운 저장소 생성
 */
console.log(args[1])
switch (args[1]) {
  case 'init':
    init(args.slice(2))
    break
  default:
    throw SyntaxError("Unknown my-git function!")
}

/**
 * init - 새로운 저장소 생성
 * - 현재 디렉토리에 .my-gitignore 파일 생성
 * - 현재 디렉토리에 stage 디렉토리 생성
 * @function
 * @param {string[]} args 인수 목록 (명령어 포함)
 * @example node my-git.js ./projectA init
 */
function init(args){
  if (args.length > 0) throw SyntaxError("init - Too many arguments!")

  // .my-gitignore 파일 생성
  const myGitIgnorePath = path.join(curDir,'.my-gitignore')
  fs.writeFile(myGitIgnorePath, "# This is my-gitignore file.", 'utf8', error => {
    if(error) console.error("Cannot write .my-gitignore file\n", error)
  })

  // stage 디렉토리 생성
  const stagePath = path.join(curDir,'/stage')
  fs.ensureDir(stagePath, (error) => {
    if (error) {
      console.error(`Cannot ensure path ${stagePath}\n${error}`)
      return
    }
  })
}
