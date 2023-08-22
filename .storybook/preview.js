import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
    },
  },
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
};
