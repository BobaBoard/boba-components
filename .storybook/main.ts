import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import { StorybookConfig } from "@storybook/react-webpack5";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
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
      typescript: {
        configOverwrite: {
          compilerOptions: {
            noUnusedLocals: false,
          },
        },
      },
    },
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (config) => {
    if (config.resolve) {
      const nodePlugin = new NodePolyfillPlugin();

      config.plugins?.push(nodePlugin);
      config.resolve.plugins = [
        // @ts-ignore
        ...(config.resolve.plugins || []),
        // @ts-ignore
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ];
    }
    return config;
  },

  docs: {
    autodocs: true,
  },
};

export default config;
