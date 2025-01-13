
import pkg from 'glob';
const { glob } = pkg;

/**
 * @fileoverview
 * status - 파일 상태 출력하기
 */

/**
 * - 파일 목록 조회
 * - staging area 파일 목록 조회 => tracked/untracked 상태 판별
 * - staging area 파일 내용 비교 => modified/unmodified 상태 판별
 * @function
 * @example my-git status
 */
export default function myGitStatus() {

}

/**
 * - 파일 목록 조회
 * @function
 * @param {} callback
 */
function _getAllFiles() {

}

/**
 * - staging area 파일 목록 조회
 * @function
 * @param {} callback
 */
function _getAllStagedFiles() { }

/**
 * - staging area 파일 내용 비교 => modified/unmodified 상태 판별
 * @function
 * @param {} callback
 */
function _isFileModified() {}
