const ReactDocgenTypescriptPlugin =
  require("react-docgen-typescript-plugin").default;
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
  plugins: [
    // Will default to loading your root tsconfig.json
    new ReactDocgenTypescriptPlugin(),
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      })
    );

    return config;
  },
};
