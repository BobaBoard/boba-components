export default {
  testEnvironment: "jsdom",
  transform: {
    "\\.(js|ts|tsx)$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/utils/fileTransformer.js",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "^react($|/.+)": "<rootDir>/node_modules/react$1",
  },
  transformIgnorePatterns: [
    "/!node_modules\\/fitty/",
    "/!node_modules\\/@bobaboard/boba-editor",
  ],
  setupFilesAfterEnv: ["./tests/utils/jestSetup.ts"],
};
