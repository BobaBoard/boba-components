const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: ["../stories/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "storybook-addon-pseudo-states",
    "@storybook/addon-interactions",
  ],
  typescript: {
    check: true,
    checkOptions: {
      compilerOptions: {
        noUnusedLocals: false,
        // This should keep it from reporting errors from node_modules, but doesn't seem to work
        // (see docs here: https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/blob/v4.1.6/README.md#options)
        reportFiles: [
          "src/**/*.{ts,tsx}",
          "stories/**/*.{ts,tsx}",
          "!node_modules/**",
        ],
      },
    },
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  framework: "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      })
    );

    return config;
  },
};
