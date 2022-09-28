import { Meta, Story } from "@storybook/react";
import TagInput, { TagInputProps } from "tags/TagInput";

import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Tags/Tag Input",
  component: TagInput,
  parameters: {
    actions: {
      handles: ["click .option", "click button"],
    },
  },
  decorators: [
    (Story) => (
      <div className="story">
        <div className="tag-container">{Story()}</div>
        <style jsx>{`
          .tag-container {
            background-color: white;
            margin-top: 55px;
            padding: 10px;
            max-width: 150px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const TagTemplate: Story<TagInputProps> = (args) => {
  return <TagInput {...args} />;
};

export const Editable = TagTemplate.bind({});
Editable.args = {
  onTagChange: action("onTagChange"),
  onTagSubmit: action("onTagSubmit"),
  onDeletePrevious: action("onDeletePrevious"),
  onFocusChange: action("onFocusChange"),
};
