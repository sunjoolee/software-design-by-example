
import fs from 'fs-extra';
import pkg from 'glob';
import path from 'path';
import { MY_GIT_FILE, MY_GIT_IGNORE_FILE, MY_STAGING_AREA } from './constants.js';
import { writeToDst } from './utils.js';
const { glob } = pkg;

/**
 * @fileoverview
 * init - 새로운 저장소 생성
 */

/**
 * - 현재 디렉토리에 .mygit, .mygitignore 파일 생성
 * - 현재 디렉토리에 .myStagingArea 디렉토리 생성
 * - 이미 저장소가 생성된 디렉토리인 경우, throw error
 * @function
 * @example my-git init
 */
export default function myGitInit() {

  const curDir = process.cwd()
  const myGitPath = path.join(curDir, MY_GIT_FILE)
  fs.access(myGitPath, fs.constants.F_OK, error => {
    // .mygit 파일에 접근할 수 있는 경우, 이미 저장소 생성되어있음
    if (!error) {
      console.error("my-git is already initiated")
      process.exit()
    }

    // .my-git 파일 생성
    writeToDst(myGitPath, "# This is .mygit file.")

    // .my-gitignore 파일 생성
    const myGitIgnorePath = path.join(curDir, MY_GIT_IGNORE_FILE)
    writeToDst(myGitIgnorePath, "# This is .mygitignore file.")

    // stage 디렉토리 생성
    const stagePath = path.join(curDir, MY_STAGING_AREA)
    fs.ensureDir(stagePath, (error) => {
      if (error) console.error(`Cannot ensure path ${stagePath}\n`, error)
    })
  })
}
