
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
 * @function
 * @example my-git init
 */
export default function myGitInit() {
  const curDir = process.cwd()

  // .my-git 파일 생성
  const myGitPath = path.join(curDir, MY_GIT_FILE)
  writeToDst(myGitPath, "# This is .mygit file.")

  // .my-gitignore 파일 생성
  const myGitIgnorePath = path.join(curDir, MY_GIT_IGNORE_FILE)
  writeToDst(myGitIgnorePath, "# This is .mygitignore file.")

  // stage 디렉토리 생성
  const stagePath = path.join(curDir, MY_STAGING_AREA)
  fs.ensureDir(stagePath, (error) => {
    if (error) console.error(`Cannot ensure path ${stagePath}\n`, error)
  })
}

