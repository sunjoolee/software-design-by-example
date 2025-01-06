import fs from 'fs-extra';
import pkg from 'glob';
const { glob } = pkg;

/**
 * @fileoverview
 * - 챕터2 연습 문제
 * - 디렉토리 각 파일의 줄 수 & 모든 파일의 줄 수 합 출력 프로그램
 */

const args = process.argv.slice(2)
if (args.length !== 1) throw SyntaxError("Wrong number of arguments! Enter 1 argument")
const [srcRoot] = args

/**
 * 특정 파일이 몇 줄인지 계산
 * @function
 * @param {string} srcName 줄 수 셀 파일 이름
 * @param {(lineCount: number) => void} callback 파일 줄 수 계산 후, 호출될 콜백 함수
*/
const getLineCount = (srcName, callback) => {
  fs.readFile(srcName, 'utf8', (error, data) => {
    if (error) {
      console.error(error)
      return
    }
    const lineCount = data.split('\n').length // 줄바꿈 기호 기준, 몇 줄인지 계산

    const splitSrcName = srcName.split('/')
    const trimmedSrcName = splitSrcName[splitSrcName.length-1] // 경로를 제외한 파일 이름

    console.log(`${trimmedSrcName} ${lineCount}`)
    callback(lineCount) // 콜백 함수 호출
  })
}

glob(
  `${srcRoot}/**/*.*`,
  (error, matches) => {
    if (error) {
      console.error(error)
      return
    }

    let lineCountSum = 0 // 모든 파일의 줄 수 합
    let fileCount = 0 // 줄 수 계산한 파일 수
    matches.forEach( match => {
      fs.stat(match, (error, stats) => {
        if (error) {
          console.error(error)
          return
        }
        if (stats.isFile()) {
          getLineCount(
            match,
            (lineCount) => {
              lineCountSum += lineCount
              fileCount++
              // 모든 파일 줄 수 계산 완료 시, 총 합 출력
              if(fileCount === matches.length) console.log(`total ${lineCountSum}`)
            }
          )
        }
      })
    })
  }
)
