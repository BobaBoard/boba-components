const ReactDocgenTypescriptPlugin = require("react-docgen-typescript-plugin")
  .default;

module.exports = {
  stories: ["../stories/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
  ],
  plugins: [
    // Will default to loading your root tsconfig.json
    new ReactDocgenTypescriptPlugin(),
  ],
};
