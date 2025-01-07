import pkg from 'glob';
import myGitAdd from './add.js';
import myGitInit from './init.js';
const { glob } = pkg;

/**
 * @function
 * @param {string} command my-git 명령어
 * @param {string[] | undefined} args my-git 명령어 인수 목록
 */
export default function myGit(command, args) {
  switch (command) {
    case 'init':
      myGitInit()
      break
    case 'add':
      myGitAdd(args)
      break
    default:
      console.error("Unknown my-git function!", command)
      process.exit()
  }
}


