import { Meta, Story } from "@storybook/react";
import TagsInput, { TagsInputProps } from "tags/Tags";

import React from "react";
import { TagsFactory } from "tags/TagsFactory";

export default {
  title: "Tags/Tags Input",
  component: TagsInput,
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
            background-color: white;
            padding: 20px;
            padding-top: 55px;
            height: 100vh;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const TagTemplate: Story<TagsInputProps> = (args) => {
  return (
    <div>
      <TagsInput {...args} />
    </div>
  );
};

export const Editable = TagTemplate.bind({});
Editable.args = {
  tags: [],
  editable: true,
};

export const WithInitialTags = TagTemplate.bind({});
WithInitialTags.args = {
  ...Editable.args,
  tags: [
    TagsFactory.getTagDataFromString("#search tag 1"),
    TagsFactory.getTagDataFromString("+category tag"),
    TagsFactory.getTagDataFromString("#search tag 2"),
    TagsFactory.getTagDataFromString("cn: content notice 1"),
    TagsFactory.getTagDataFromString("#search tag 3"),
    TagsFactory.getTagDataFromString("a whisper tag"),
    TagsFactory.getTagDataFromString("another whisper tag"),
    TagsFactory.getTagDataFromString("+category tag2"),
    TagsFactory.getTagDataFromString("cn: content notice 2"),
    TagsFactory.getTagDataFromString(
      "(note that the ordering of tags needs to be fixed)"
    ),
  ],
};

export const WithSuggestedCategories = TagTemplate.bind({});
WithSuggestedCategories.args = {
  ...Editable.args,
  suggestedCategories: ["category1", "category2", "category3"],
};
