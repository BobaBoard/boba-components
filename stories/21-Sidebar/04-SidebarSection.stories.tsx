import { Meta, Story } from "@storybook/react";
import SidebarSection, {
  SidebarSectionProps,
} from "../../src/sidebar/SidebarSection";

import DefaultTheme from "../../src/theme/default";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Sidebar/Sidebar Section",
  component: SidebarSection,
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

const SidebarSectionTemplate: Story<SidebarSectionProps> = (args) => {
  return <SidebarSection {...args} />;
};

export const Regular = SidebarSectionTemplate.bind({});
Regular.args = {
  sections: [
    {
      id: "test1",
      title: "test1",
      type: "category_filter",
    },
    {
      id: "test2",
      title: "test2",
      type: "text",
    },
  ],
  onSelectSection: (...args) => action("select")(args),
  onAddSection: (...args) => action("add")(args),
};
Regular.storyName = "Sections List";
