import { Meta, Story } from "@storybook/react";
import TextSection, { TextSectionProps } from "sidebar/TextSection";

import DefaultTheme from "theme/default";
import React from "react";

export default {
  title: "Sidebar/Text Section",
  component: TextSection,
  parameters: {
    actions: {
      handles: ["click .option", "click button"],
    },
  },
  decorators: [
    (Story) => (
      <div className="story">
        {Story()}
        <style jsx>{`
          .story {
            max-width: 500px;
            background-color: ${DefaultTheme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
            padding: 10px;
          }
          .story > :global(div) {
            margin: 10px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const TextSectionTemplate: Story<TextSectionProps> = (args) => <TextSection {...args} />;

export const Regular = TextSectionTemplate.bind({});
Regular.args = {
  description:
    '[{"insert":"Hello!\\nThis is a board description. In this description we have:\\nRule 1."},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Rule 2, which is very "},{"attributes":{"bold":true},"insert":"important"},{"insert":"."},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Rule 3, which has "},{"attributes":{"link":"https://www.youtube.com/watch?v=oHg5SJYRHA0"},"insert":"a link"},{"insert":"!"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Have fun and love each other.\\n"},{"insert":{"block-image":{"src":"https://media.tenor.com/images/fad319336910209546dc6ee1fe6cab5a/tenor.gif","spoilers":false,"width":300,"height":224}}},{"insert":"\\n"}]',
};

export const Editable = TextSectionTemplate.bind({});
Editable.args = { ...Regular.args, editable: true };

export const EmptyEditable = TextSectionTemplate.bind({});
EmptyEditable.args = { ...Editable.args, description: undefined };
