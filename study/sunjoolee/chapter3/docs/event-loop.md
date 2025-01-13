## 이벤트 루프(Event Loop)

- [이벤트 루프(Event Loop)란?](https://kay0426.tistory.com/23)

### Node.js 스레드

- Node.js는 싱글 스레드 기반의 런타임 환경
  - JS 코드를 실행하는 **메인 스레드는 단일 스레드로 동작**
  - 하지만, **멀티 스레드 활용 기능 내장** -> 이벤트 루프 & 백그라운드 작업
- 콜 스택(Call Stack)
  - JS가 **동기적으로** 실행할 함수 저장 & 관리
  - 함수 호출 시, 스택에 push, 함수 실행 완료 시 스택에서 pop
- 이벤트 루프(Event Loop)
  - Node.js의 **메인 스레드에서 실행**
  - **비동기 작업 콜백 관리**, 타이머 처리, I/O 작업 완료 시 콜백 실행
  - **콜 스택이 비어있을 때만** 콜백 실행 가능
- 백그라운드 스레드 풀(libuv Thread Pool)
  - Node.js의 일부 비동기 작업 처리
    - 예. 파일 시스템 작업, 일부 네트워크 요청, 암호화 작업, CPU 집약적 작업
  - libuv: Node.js에서 사용되는 C 라이브러리, 비동기 I/O 작업 처리
    - 쓰레드 풀: 기본적으로 4개의 워커 스레드 -> **병렬 처리**

- 예.

  ```js
  const callback = (err, data) => {
    if (err) throw err;
    console.log('File content:', data);
  }

  fs.readFile('example.txt', 'utf8', cb);
  ```

  - 콜 스택에 `fs.readFile` 함수 push
  - 메인 스레드에서 콜 스택에 올라온 `fs.readFile` 함수 실행
    - Node.js 메인 스레드에서 JS 코드 실행, **Javascript call stack**에서 처리
    - libuv가 이 요청을 백그라운드 스레드 풀에 전달
  - 콜 스택에서 `fs.readFile` 함수 pop
  - 백그라운드 스레드 풀에서 I/O 작업 수행
    - libuv 레이어에서 처리
    - 작업 완료 시, **작업 결과 & 콜백(`callback`) 이벤트 루프의 대기(poll phase) 큐로 등록**
  - **콜 스택 비어있는 경우**, 메인 스레드에서 이벤트 루프 단계적으로 진행
    - 특정 phase에서 대기 중인 `callback`함수 큐에서 꺼냄
  - 콜 스택에 `callback` 힘수 push
  - 메인 스레드에서 콜 스택에 올라온 `callback` 함수 실행
  - 콜 스택에서 `callback` 함수 pop

- 예.

  ```js
  console.log("Start");

  setTimeout(() => {
    console.log("Timeout");
  }, 0);

  while (true) {} // 무한 루프

  console.log("End");
  ```

  - 콜 스택에 `console.log("Start")` 함수 push
  - 메인 스레드에서 콘솔 "Start" 출력
  - 콜 스택에서 `console.log("Start")` 함수 pop
  - 콜 스택에 `setTimeout` 함수 push
  - 메인 스레드에서 `setTimeout` 함수 실행
    - libuv가 이 요청을 백그라운드 스레드 풀에 전달
  - 백그라운드 스레드에서 타이머 동작
    - libuv 레이어에서 처리
    - 설정된 지연 시간 후, **작업 결과 & 콜백(`console.log("Timeout")`) 이벤트 루프의 타이머(timer phase) 큐**로 등록
  - 콜 스택에서 `setTimeout` 함수 pop
  - 콜 스택에 `while(true){}` 함수 push
  - 메인 스레드에서 `while(true){}` 함수 실행
    - 무한 루프 -> 함수 실행 완료되지 X, 콜 스택에서 pop 되지 X
  - 콜 스택 비워지지 X 이벤트 루프 실행되지 X
    - 타이머 큐에 실행될 수 있는 콜백 함수가 있지만, 실행되지 X

### 이벤트 루프 Phase

- 이벤트 루프는 **고정된 순서**에 따라 단계별로 **순차적으로 실행**
- 이벤트 루프 주요 Phase
  - Timers Phase
    - `setTimeout`, `setInterval`에 의해 예약된 콜백 실행
    - 지연 시간: **최소** 지연 시간 보장, 정확히 맞지 X
  - **Pending** Callbacks Phase
    - **이전 이벤트 루프 사이클**에서 완료된 비동기 작업 중, **연기된 콜백** 실행
      - Timer Phase/Poll Phase에서 처리되지 못한 시스템 수준의 콜백
      - **네트워크 error** 이벤트 처리 콜백
  - Idle, Prepare Phase
    - 이벤트 루프가 다음 작업을 준비하는 단계
    - Node.js 내부적으로 사용
  - **Poll Phase**
    - **실제 I/O 작업 결과 처리 단계**
      - **대기 중인 I/O 작업 콜백** 실행
      - 대기 중인 작업 콜백 없을 경우, 일정 시간 동안 새로운 I/O 작업이 완료될 때까지 대기(poll)
  - Check Phase
    - `setImmediate`에 의해 예약된 콜백 수행
      - `setImmediate`:  Node.js 제공 함수, **이벤트 루프의 현재 주기가 끝난 뒤 곧바로 실행할 콜백 등록**
    - Poll phase 종료 후, 바로 실행됨
  - Close Callbacks Phase
    - 일부 닫기 이벤트 수행
    - 예. `socket.on('close', ...)`

- 예. Poll Phase에서 타이머 작업이 완료된 경우, 해당 콜백이 등록되는 이벤트 루프 큐는? 실행되는 시점은?
  - 타이머 작업에 의한 콜백은 timers phase 큐에 등록됨
  - 이벤트 루프 단계는 순차적으로 실행 -> **다음 이벤트 루프**에서 실행 (poll -> check -> close -> timers)
- 예. Check Phase에서 네트워크 에러가 발생한 경우, 해당 콜백이 등록되는 이벤트 큐는? 실행되는 시점은?
  - 네트워크 에러에 의한 콜백은 pending callbacks phase 큐에 등록됨
  - 이벤트 루프 단계는 순차적으로 실행 -> **다음 이벤트 루프**에서 실행 (poll -> check -> close -> timers -> pending callbacks)
- 예. Poll Phase에서 I/O 작업이 완료된 경우, 해당 콜백이 등록되는 이벤트 루프 큐는? 실행되는 시점은?
  - I/O 작업 처리 콜백은 poll phase 큐에 등록됨
  - 현재 Phase에서 바로 실행

### Microtask Queue

- `Promise`와 `process.nextTick`**(최우선)** 콜백 수행
  - `process.nextTick`: Node.js 제공 함수, 현재 실행 중인 작업이 완료된 후 곧바로 실행할 콜백 등록
- **이벤트 루프 Phase와 별개로 동작**
  - 각 이벤트 루프 Phase가 완료된 후, 마이크로 태스크 큐가 먼저 비워진다

```js
setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate"));
Promise.resolve().then(() => console.log("Promise"));
process.nextTick(() => console.log("nextTick"));
```

- 예.
  - nextTick 출력 - Microtask 큐, 우선순위 **최우선**
  - Promise 출력 - Microtask 큐
  - setTimeout 또는 setImmediate 출력 - OS에 따라 상이

### +

- 이벤트 콜백 큐가 가득 차는 경우?
  - 이벤트 콜백 큐 최대 크기?
    - Node.js는 특정 한도로 제한하진 X
    - OS/메모리의 물리적 제한이 결정
  - 발생 원인
    - 너무 많은 비동기 작업 요청 (ex. 초당 수천 건의 HTTP 요청, 대량의 I/O 작업)
    - 콜백 실행 속도보다 작업 등록 속도가 빠른 경우
    - 이벤트 루프가 블로킹 코드로 인해 멈춘 경우 (ex. 무한 루프)
  - 발생 결과
    - **백 프레셔(Back Pressure) 발생**
      - 콜백이 큐에 추가되길 기다리며, 처리 속도가 늦어지는 현상
    - Out Of Memory(OOM) 오류 발생
    - HTTP 서버의 경우, 요청을 처리하지 못하고 연결이 끊어져 Unhandled Request 발생
  - 방지 방법
    - 클라이언트 요청 수 제한 (ex. throttle, debounce)
    - 파일/네트워크 데이터 처리 시, **Stream API**로 데이터 청크 단위 처리
    - 로드 밸런싱 - 여러 Node.js 프로세스/서버에 작업 분산 (ex. Clustering, 로드 밸런서(Nginx, HAProxy)
