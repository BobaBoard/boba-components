import Icon, { IconProps, isIcon } from "../../src/common/Icon";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import TagsInput, { TagsInputProps } from "../../src/tags/Tags";

import { TagsFactory } from "../../src/tags/TagsFactory";
import { action } from "@storybook/addon-actions";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

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

// export const WithSymbol = TagTemplate.bind({});
// WithSymbol.args = {
//   ...NameOnly.args,
//   symbol: "🐷",
// };

// export const WithNodeSymbol = TagTemplate.bind({});
// WithNodeSymbol.args = {
//   ...NameOnly.args,
//   symbol: <Icon icon={faCalendar} />,
// };

// export const Deletable = TagTemplate.bind({});
// Deletable.args = {
//   ...WithSymbol.args,
//   deletable: true,
//   onDelete: action("onDelete"),
// };

// export const CanonicalTagTypes = TagTemplate.bind({});
// CanonicalTagTypes.args = {
//   tags: [
//     TagsFactory.createProps(TagsFactory.getTagDataFromString("#search tag")),
//     TagsFactory.createProps(TagsFactory.getTagDataFromString("+category tag")),
//     TagsFactory.createProps(
//       TagsFactory.getTagDataFromString("cn: content notice")
//     ),
//     TagsFactory.createProps(TagsFactory.getTagDataFromString("a whisper tag")),
//   ],
// };

// export const CnVariants = TagTemplate.bind({});
// CnVariants.args = {
//   tags: [
//     TagsFactory.createProps(
//       TagsFactory.getTagDataFromString("cn: a bad thing (cn)")
//     ),
//     TagsFactory.createProps(
//       TagsFactory.getTagDataFromString("cw: a bad thing (cw)")
//     ),
//     TagsFactory.createProps(
//       TagsFactory.getTagDataFromString("sq: a bad thing (sq)")
//     ),
//     TagsFactory.createProps(
//       TagsFactory.getTagDataFromString("squick: a bad thing (squick)")
//     ),
//   ],
// };

// export const Long = TagTemplate.bind({});
// Long.args = {
//   ...TagsFactory.createProps(
//     TagsFactory.getTagDataFromString(
//       "cn: What the fuck did you just fucking say about me, you little b*tch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills."
//     )
//   ),
// };
// Long.decorators = [
//   (Story) => {
//     return (
//       <div className="story">
//         {Story()}
//         <style jsx>{`
//           .story {
//             display: flex;
//             justify-content: space-evenly;
//             flex-wrap: wrap;
//             background-color: white;
//             max-width: 300px;
//             padding: 20px;
//           }
//         `}</style>
//       </div>
//     );
//   },
// ];
