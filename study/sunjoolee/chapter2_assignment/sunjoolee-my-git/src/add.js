
import fs from 'fs-extra';
import pkg from 'glob';
import path from 'path';
import { MY_GIT_IGNORE_FILE, MY_STAGING_AREA } from './constants.js';
import { copySrcToDst } from './utils.js';
const { glob } = pkg;

/**
 * @fileoverview
 * add - 파일 목록 스테이징
 * - 디렉토리/파일 목록 staging area에 복사하기 (중복되는 경우, 덮어쓰기)
 * - .mygitignore 속 패턴과 일치하는 파일은 제외한다
 */

/**
 * @function
 * @param {string[]} args 인수 목록
 * @example my-git add { 디렉토리/파일 목록 }
 */
export default function myGitAdd(args) {
  console.log(`args: `, args)
  if (args.length < 1) {
    console.error("add - Too less arguments! Enter file/directory paths to add")
    process.exit()
  }

  _getIgnorePatterns((ignorePatterns) => {
    const distRoot = path.join(process.cwd(), MY_STAGING_AREA)
    Array.from(args).forEach(pattern => {
      const srcRoot = path.join(process.cwd(), pattern)
      copySrcToDst(srcRoot,distRoot, ignorePatterns)
    })
  })
}

/**
 * 스크립트 실행 디렉토리의 .mygitignore 함수를 읽어, 무시할 glob 패턴 목록 배열 계산
 * @function
 * @param {undefined | (ignorePatterns: string[]) => void} callback 콜백함수
 */
async function _getIgnorePatterns(callback) {
  const ignorePath = path.join(process.cwd(), MY_GIT_IGNORE_FILE)

  fs.readFile(ignorePath, 'utf8', (error, data) => {
    if (error) {
      console.error("Cannot read .mygitignore file\n", error)
    } else {
      const ignorePatterns = data
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '' && !line.startsWith('#'))
        .map(p => {
          if (p.split('.').length > 1) return p
          else return `${p}/**/*.*`
        })
        .map(p => path.join(process.cwd(), p))

      console.log("patterns to ignore:", ignorePatterns)
      callback && callback(ignorePatterns)
    }
  })
}
