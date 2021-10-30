import { Meta, Story } from "@storybook/react";
import TagsFilterSection, {
  TagsFilterSectionProps,
} from "../../src/sidebar/TagsFilterSection";

import React from "react";
import { TagType } from "../../src/types";
import { action } from "@storybook/addon-actions";

export default {
  title: "Sidebar/Tags Filter",
  component: TagsFilterSection,
  parameters: {
    actions: {
      handles: ["click .tag", "click button"],
    },
  },
  decorators: [
    (Story) => (
      <div className="story">
        {Story()}
        <style jsx>{`
          .story {
            max-width: 500px;
          }
          .story > :global(div) {
            margin: 10px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const TagsFilterSectionTemplate: Story<TagsFilterSectionProps> = (args) => {
  return <TagsFilterSection {...args} />;
};

export const Regular = TagsFilterSectionTemplate.bind({});
Regular.args = {
  tags: [
    { name: "test1", active: true },
    { name: "test2", active: true },
    { name: "test3", active: true },
    { name: "test4", active: true },
    { name: "test5", active: true },
    { name: "test6", active: true },
    { name: "test7", active: true },
    { name: "test8", active: true },
    { name: "test9", active: true },
    { name: "test10", active: true },
    { name: "test11", active: true },
  ],
  type: TagType.CONTENT_WARNING,
  onTagsStateChangeRequest: (...args) => action("tagChange")(args),
  uncategorized: true,
  onUncategorizedStateChangeRequest: (...args) => action("uncategorized")(args),
};

export const Editable = TagsFilterSectionTemplate.bind({});
Editable.args = {
  ...Regular.args,
  editable: true,
  onTagsChange: (...args) => action("tagChange")(args),
};
