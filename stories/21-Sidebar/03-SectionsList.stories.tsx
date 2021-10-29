import { Meta, Story } from "@storybook/react";
import SectionsList, { SectionsListProps } from "../../src/sidebar/SectionsList";

import DefaultTheme from "../../src/theme/default";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Sidebar/Sections List",
  component: SectionsList,
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

const SectionsListTemplate: Story<SectionsListProps> = (args) => {
  return <SectionsList {...args} />;
};

export const Regular = SectionsListTemplate.bind({});
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
  onDeleteSection: (...args) => action("delete")(args),
  onAddSection: (...args) => action("add")(args),
};
Regular.storyName = "Sections List";
