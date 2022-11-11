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
