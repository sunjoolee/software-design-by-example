import fs from 'fs-extra';
import pkg from 'glob';
import path from 'path';
import { MY_GIT_FILE } from './constants.js';
const { glob } = pkg;

/**
 * @fileoverview
 * 스크립트 실행 디렉토리 로컬 저장소인지 아닌지 판별
 */

/**
 * @function
 * @param {(isLocalRepo: boolean) => void} callback
 */
export default function isLocalRepo(callback) {
  // 스크립트 실행 디렉토리의 .mygit 파일에 접근할 수 있다면 true
  const myGitPath = path.join(process.cwd(), MY_GIT_FILE)
  fs.access(myGitPath, fs.constants.F_OK, error => {
    callback(error ? false : true)
  })
}
