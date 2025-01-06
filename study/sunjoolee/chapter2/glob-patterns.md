## Glob Patterns (Globs)

### 기본 와일드 카드

- \*
  - **0개 이상의 문자와 매칭**
  - 디렉토리 구분자(리눅스 \, 윈도우 /)는 예외
  - 예. a*
    - a 매칭
    - aa 매칭
    - abc 매칭
    - abc/ 매칭 X (매칭되는 Globs: a*/)
  - 예. dir/\*.\*
    - dir/img.jpg 매칭
    - dir/img.png 매칭
    - dir/img. 매칭
    - dir/subdir/img.png 매칭 X
    - dir/.png 매칭 X (**예외: .으로 시작하는 파일명은 .으로 시작하는 Globs와만 매칭됨**, 매칭되는 Globs: dir/.*)
- ?
  - **정확히 1개의 문자와 매칭**
  - 예. a?
    - a 매칭 X
    - aa 매칭
    - a1 매칭
    - abc 매칭 X
- []
  - **문자 집합 매칭**
  - 예. [aeiou]*
    - 소문자 모음으로 시작하는 파일 매칭
  - 예. \*[12345] (동일한 Globs: \*[1-5])
    - a1 매칭
    - a2 매칭
    - a6 매칭 X (범위 밖 문자)
  - **문자 범위 매칭**
  - 예. [!A-Z]*
    - 대문자로 시작하지 않는 파일 매칭

### 확장 패턴

- ?(p) - 0개 또는 1개 p 매칭
  - 예. ?(a|abc)
    - 공백 매칭
    - a 매칭
    - abc 매칭
- *(p) - 0개 이상의 p 매칭
  - 예. *(a|abc)
    - 공백 매칭
    - a 매칭
    - abc 매칭
    - aabc 매칭 (a abc)
    - abcabcaabc 매칭 (abc abc a abc)
- +(p) - 1개 이상의 p 매칭
- @(p) - 정확히 p 매칭
- !(p) - p 매칭되지 않는 모든 값 매칭

#### 중괄호 패턴

- {p1, p2} - 선택적으로 p1 또는 p2 매칭
  - 예. img.{jpg, JPG}
    - img.jpg 매칭
    - img.JPG 매칭
- {a..z} - 숫자/문자 범위와 매칭

### 디렉토리 매칭

- \*\*
  - **현재 디렉토리 & 모든 하위 디렉토리 매칭**
  - 디렉토리 재귀적 탐색에 사용
  - 예. dir/\*\*/\*.\*
    - dir/img.jpg 매칭
    - dir/subdir1/img.jpg 매칭
    - dir/subdir1/subdir2/img.jpg 매칭
