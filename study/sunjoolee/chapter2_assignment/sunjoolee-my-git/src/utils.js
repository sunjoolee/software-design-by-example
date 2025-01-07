import fs from 'fs-extra';
import pkg from 'glob';
import path from 'path';
const { glob } = pkg;

/**
 * @function
 * @param {string} dstRoot write할 파일 경로
 * @param {string} content write할 내용
 */
export function writeToDst(dstRoot, content) {
  fs.writeFile(dstRoot, content, 'utf8', error => {
    if (error) console.error(`Cannot write to file ${path.split('/').reverse()[0]}\n`, error)
  })
}

/**
 * @function
 * @param {string} srcRoot 복사할 경로
 * @param {string} dstRoot 복사될 경로
 * @param {string[] | undefined} ignorePatterns 무시할 Glob 패턴 목록
 */
export function copySrcToDst(srcRoot, dstRoot, ignorePatterns) {
  glob(`${srcRoot}/**/*.*`, { ignore: ignorePatterns }, (error, matches) => {
    if (error) {
      console.error(`Error matching pattern ${srcRoot}\n`, error)
      return
    }

    console.log(`matches to pattern ${srcRoot}: `, matches)
    matches.forEach(match => {
      fs.stat(match, (error, stats) => {
        if (error) {
          console.error(`Cannot get file stats of ${match}\n`, error)
        } else {
          if (stats.isFile()) {
            const dstPath = match.replace(process.cwd(), dstRoot)
            const dstDir = path.dirname(dstPath)
            fs.ensureDir(dstDir, (error) => {
              if (error) {
                console.error(`Cannot find dir ${dstDir}\n`, error)
              } else {
                fs.copy(match, dstPath, error => {
                  if (error) console.error(`Error copying ${match} to ${dstPath}\n`, error)
                })
              }
            })
          }
        }
      })
    })
  }
  )
}
