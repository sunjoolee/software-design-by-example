import fs from 'fs-extra';
import pkg from 'glob';
import path from 'path';
const { glob } = pkg;

/**
 * @fileoverview
 * - 챕터2 연습 문제
 * - srcRoot 디렉토리 하위의 모든 파일들을 dstDir 디렉토리로 복사하는 프로그램
 * - 명령줄 인수 개수 확인 & 에러 메세지 출력
 */

const args = process.argv.slice(2)
if (args.length !== 2) throw SyntaxError("Wrong number of arguments! Enter 2 arguments")

const [srcRoot, dstRoot] = args
console.log(srcRoot, dstRoot)

const copyFileToDst = (srcName) => {
  const dstName = srcName.replace(srcRoot, dstRoot)
  const dstDir = path.dirname(dstName)
  fs.ensureDir(dstDir, (error) => {
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

glob(
  `${srcRoot}/**/*.*`,
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
        if (stats.isFile()) {
          copyFileToDst(match)
        }
      })
    })
  }
)
