import pkg from 'glob';
import myGitAdd from './add.js';
import myGitInit from './init.js';
import isLocalRepo from './is-local-repo.js';
const { glob } = pkg;

/**
 * @function
 * @param {string} command my-git 명령어
 * @param {string[] | undefined} args my-git 명령어 인수 목록
 */
export default function myGit(command, args) {
  isLocalRepo((isLocalRepo) => {
    if (command === 'init') {
      // init 명령어인 경우, 로컬 저장소가 아니어야
      if (isLocalRepo) console.error("my-git is already initiated")
      else myGitInit()
    } else {
      // init 외 명령어인 경우, 로컬 저장소이어야
      if (!isLocalRepo) console.error("my-git is not initiated")
      else switch (command) {
        case 'add':
          myGitAdd(args)
          break
        default:
          console.error("Unknown my-git function!", command)
          process.exit()
      }
    }
  })
}


