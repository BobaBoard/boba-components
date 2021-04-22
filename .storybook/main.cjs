module.exports = {
  stories: ["../stories/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-controls",
    "@storybook/addon-viewport/register",
    "@storybook/addon-actions",
    "@storybook/addon-a11y",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              ["styled-jsx/babel", { optimizeForSpeed: true }],
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
        },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
