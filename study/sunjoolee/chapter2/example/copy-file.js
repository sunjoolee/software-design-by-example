import fs from 'fs-extra';
import pkg from 'glob';
import path from 'path';
const { glob } = pkg;

/**
 * @fileoverview
 * - 챕터2 예제 코드
 * - srcRoot 디렉토리 하위의 모든 파일들을 dstDir 디렉토리로 복사하는 프로그램
 */

/**
 * @example node copy-file.js srcRoot dstRoot
 * - process.argv
 *   - process.argv[0] - 코드 실행에 사용되는 프로그램, node
 *   - process.argv[1] - 실행될 프로그램, example-copy-file.js
 *   - process.argv[2] - srcRoot - 복사해올 디렉토리
 *   - process.argv[3] - dstRoot - 복사본 저장될 디렉토리
 */
const [srcRoot, dstRoot] = process.argv.slice(2)
console.log(srcRoot, dstRoot)

/**
 * srcRoot의 특정 파일 복사하여 dstRoot에 저장
 * @function
 * @param {string} srcName 복사할 파일 이름
 */
const copyFileToDst = (srcName) => {
  const dstName = srcName.replace(srcRoot, dstRoot)
  const dstDir = path.dirname(dstName) // 경로명 조작 필요 시, path 모듈 사용
  fs.ensureDir(dstDir, (error) => { // ensureDir: 해당 디렉토리 존재하지 않을 경우, 생성
    if (error) {
      console.error(error)
      return
    }
    fs.copy(srcName, dstName, error => {
      if (error) {
      console.error(error)
      return
      }
    })
  })
}

/**
 * @function 패턴과 일치하는 항목 찾기 & 해당 항목 파일인 경우, `copyFileToDst` 함수 호출
 */
glob(
  `${srcRoot}/**/*.*`,
  // { ignore: [`${srcRoot}/**/*.js`] }, // 제외할 파일 이름 패턴 지정 가능
  (error, matches) => {
    if (error) {
      console.error(error)
      return
    }

    console.log(matches)
    matches.forEach(match => {
      fs.stat(match, (error, stats) => {
        if (error) {
          console.error(error)
          return
        }
        if (stats.isFile()) { // 파일인지 아닌지 확인
          copyFileToDst(match)
        }
      })
    })
  }
)
