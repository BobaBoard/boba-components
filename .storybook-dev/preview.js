import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { DocsPage, DocsContainer } from "@storybook/addon-docs";

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
  },
  controls: { expanded: true },
});

addParameters({
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
    },
  },
});
