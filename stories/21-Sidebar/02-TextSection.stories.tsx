import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import SegmentedButton, {
  SegmentedButtonProps,
} from "../../src/buttons/SegmentedButton";
import TagsFilterSection, {
  TagsFilterSectionProps,
} from "../../src/board/TagsFilterSection";
import TextSection, { TextSectionProps } from "../../src/board/TextSection";

import DefaultTheme from "../../src/theme/default";
import { TagType } from "../../src/types";
import { action } from "@storybook/addon-actions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import mamoru from "../images/mamoru.png";

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

const TextSectionTemplate: Story<TextSectionProps> = (args) => {
  return <TextSection {...args} />;
};

export const Regular = TextSectionTemplate.bind({});
Regular.args = {
  id: 2,
  index: 2,
  title: "A test",
  description:
    '[{"insert":"Hello!\\nThis is a board description. In this description we have:\\nRule 1."},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Rule 2, which is very "},{"attributes":{"bold":true},"insert":"important"},{"insert":"."},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Rule 3, which has "},{"attributes":{"link":"https://www.youtube.com/watch?v=oHg5SJYRHA0"},"insert":"a link"},{"insert":"!"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Have fun and love each other.\\n"},{"insert":{"block-image":{"src":"https://media.tenor.com/images/fad319336910209546dc6ee1fe6cab5a/tenor.gif","spoilers":false,"width":300,"height":224}}},{"insert":"\\n"}]',
  type: "text",
};

export const Editable = TextSectionTemplate.bind({});
Editable.args = { editable: true };
