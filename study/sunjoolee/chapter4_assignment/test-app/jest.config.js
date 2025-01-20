module.exports = {
  testEnvironment: "jsdom", // React 컴포넌트 테스트를 위한 환경 설정
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Babel을 통해 JSX 변환
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // CSS 파일 무시
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // 추가 설정 파일
};
