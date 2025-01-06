import fs from 'fs-extra';
import pkg from 'glob';
import path from 'path';
const { glob } = pkg;

const _MY_GIT_FILE = ".mygit"
const _MY_GIT_IGNORE_FILE = ".mygitignore"
const _MY_STAGING_AREA = ".myStagingArea"

/**
 * @fileoverview
 * - 1주차 과제 - Git 구현하기
 * @example node {path to my-git.js} {current path} {my-git command} {argument list (optional)}
 */

const args = process.argv.slice(2)
if (args.length < 2) throw SyntaxError("Wrong number of arguments! Enter at least 2 argument")

/**
 * my-git 명령어 대상 디렉토리
 */
const curDir = args[0]
console.log("curDir:", curDir)

/**
 * my-git 명령어 파싱
 * - init - 새로운 저장소 생성
 * - add {디렉토리/파일 목록} - 디렉토리/파일 목록 staging area에 올리기
 */
console.log("my-git command: ", args[1])
switch (args[1]) {
  case 'init':
    init(args.slice(2))
    break
  case 'add':
    add(args.slice(2))
    break
  default:
    throw SyntaxError("Unknown my-git function!")
}

/**
 * init - 새로운 저장소 생성
 * - 현재 디렉토리에 .mygit, .mygitignore 파일 생성
 * - 현재 디렉토리에 .myStagingArea 디렉토리 생성
 * - 이미 저장소가 생성된 디렉토리인 경우, throw error
 * @function
 * @param {string[]} args 인수 목록 
 * @example node my-git.js ./projectA init
 */
function init(args) {
  if (args.length > 0) throw SyntaxError("init - Too many arguments! No arguments needed")

  const myGitPath = path.join(curDir, _MY_GIT_FILE)
  fs.access(myGitPath, fs.constants.F_OK, error => {
    if (!error) {
      // .mygit 파일에 접근할 수 있는 경우, 이미 저장소 생성되어있음
      throw Error('my-git is already initiated')
    }
    // .my-git 파일 생성
    fs.writeFile(myGitPath, "# This is .mygit file.", 'utf8', error => {
      if (error) console.error("Cannot write .mygit file\n", error)
    })

    // .my-gitignore 파일 생성
    const myGitIgnorePath = path.join(curDir, _MY_GIT_IGNORE_FILE)
    fs.writeFile(myGitIgnorePath, "# This is .mygitignore file.", 'utf8', error => {
      if (error) console.error("Cannot write .mygitignore file\n", error)
    })

    // stage 디렉토리 생성
    const stagePath = path.join(curDir, _MY_STAGING_AREA)
    fs.ensureDir(stagePath, (error) => {
      if (error) {
        console.error(`Cannot ensure path ${stagePath}\n`, error)
        return
      }
    })
  })
}

/**
 * add { 디렉토리/파일 목록 } 
 * - 디렉토리/파일 목록 staging area에 복사하기 (중복되는 경우, 덮어쓰기)
 * - 디렉토리/파일 목록에 매칭되는 항목 없을 경우 throw error
 * @function
 * @param {string[]} args 인수 목록 
 * @example node my-git.js ./projectA add a.js b.js
 */
function add(args) {
  if (args.length < 1) throw SyntaxError("add - Too less arguments! Enter at file/directory path to add to staging area")

  args.forEach(srcName => {
    fs.stat(path.join(curDir, srcName), (error, stats) => {
      if (error) {
        console.error(`Cannot get stats of ${srcName}\n`, error)
        return
      }

      if (stats.isFile()) {
        // 파일 staging area에 복사
        _copyToStagingArea(srcName)
      }
      else if (stats.isDirectory()) {
        // todo:디렉토리 하위 파일 모두 staging area에 복사
        glob(`${curDir}/${srcName}/**/*.*`, (error, matches) => {
          if (error) {
            console.error(error)
            return
          }
          matches.forEach(match => { })
        })
      }
    })
  })
}

/**
 * 파일 staging area에 복사
 * @function
 * @param {string} srcName 복사될 파일 이름
 */
function _copyToStagingArea(srcName) {
  const dstName = srcName.replace(curDir, path.join(curDir, _MY_STAGING_AREA))
  const dstDir = path.dirname(dstName)
  fs.ensureDir(dstDir, (error) => {
    if (error) {
      console.error(`Cannot ensure path ${dstDir}\n`, error)
      return
    }
    fs.copy(srcName, dstName, error => {
      if (error) {
        console.error(`Cannot copy ${srcName}\n`, error)
        return
      }
    })
  })
}