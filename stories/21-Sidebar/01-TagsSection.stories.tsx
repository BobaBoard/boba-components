import { Meta, Story } from "@storybook/react";
import TagsFilterSection, {
  TagsFilterSectionProps,
} from "sidebar/TagsFilterSection";

import { FilteredTagsState } from "tags/TagsFilter";
import React from "react";
import { TagType } from "types";
import { action } from "@storybook/addon-actions";

export default {
  title: "Sidebar/Tags Filter",
  component: TagsFilterSection,
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
    { name: "test1", state: FilteredTagsState.ACTIVE },
    { name: "test2", state: FilteredTagsState.ACTIVE },
    { name: "test3", state: FilteredTagsState.ACTIVE },
    { name: "test4", state: FilteredTagsState.ACTIVE },
    { name: "test5", state: FilteredTagsState.ACTIVE },
    { name: "test6", state: FilteredTagsState.ACTIVE },
    { name: "test7", state: FilteredTagsState.ACTIVE },
    { name: "test8", state: FilteredTagsState.ACTIVE },
    { name: "test9", state: FilteredTagsState.ACTIVE },
    { name: "test10", state: FilteredTagsState.ACTIVE },
    { name: "test11", state: FilteredTagsState.ACTIVE },
  ],
  type: TagType.CONTENT_WARNING,
  onTagsStateChangeRequest: (...args) => action("tagChange")(args),
  uncategorized: FilteredTagsState.ACTIVE,
  onUncategorizedStateChangeRequest: (...args) => action("uncategorized")(args),
};

export const Inactive = TagsFilterSectionTemplate.bind({});
Inactive.args = {
  ...Regular.args,
  tags: [
    { name: "active1", state: FilteredTagsState.ACTIVE },
    { name: "disabled2", state: FilteredTagsState.DISABLED },
    { name: "active3", state: FilteredTagsState.ACTIVE },
    { name: "active4", state: FilteredTagsState.ACTIVE },
    { name: "active5", state: FilteredTagsState.ACTIVE },
    { name: "disabled6", state: FilteredTagsState.DISABLED },
    { name: "active7", state: FilteredTagsState.ACTIVE },
    { name: "active8", state: FilteredTagsState.ACTIVE },
    { name: "active9", state: FilteredTagsState.ACTIVE },
    { name: "disabled10", state: FilteredTagsState.DISABLED },
    { name: "active11", state: FilteredTagsState.ACTIVE },
  ],
  uncategorized: FilteredTagsState.DISABLED,
};

export const Editable = TagsFilterSectionTemplate.bind({});
Editable.args = {
  ...Regular.args,
  editable: true,
  onTagsChange: (...args) => action("tagChange")(args),
};
