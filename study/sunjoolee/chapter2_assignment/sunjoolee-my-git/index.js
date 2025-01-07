#!/usr/bin/env node

import myGit from './src/my-git.js'

/**
 * @fileoverview
 * 1주차 과제 - Git 구현하기
 * 직접 실행 가능한 스크립트로 정의
 * - 파일 실행 권한 추가 chmod +x my-git.js
 * - package.json bin 속성에 실행 파일 지정
 * - npm link로 전역 설치
 * @example my-git {command} {argument list}
 */


const [command, args] = process.argv.slice(2)
myGit(command, args)
