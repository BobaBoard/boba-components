import Icon, { IconProps, isIcon } from "common/Icon";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import Tag, { DeletableTagProps, TagProps } from "tags/Tag";

import { TagsFactory } from "tags/TagsFactory";
import { action } from "@storybook/addon-actions";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "Tags/Tag",
  component: Tag,
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
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            background-color: white;
            padding: 20px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const TagTemplate: Story<
  TagProps | DeletableTagProps | { tags: TagProps[] | DeletableTagProps[] }
> = (args) => {
  return (
    <>
      {(Array.isArray(args["tags"]) ? args["tags"] : [args]).map((tag) => (
        <Tag key={tag.name} {...tag} />
      ))}
    </>
  );
};

export const NameOnly = TagTemplate.bind({});
NameOnly.args = {
  name: "A tag",
  color: "#4a16cb",
  accentColor: "#00ff2d",
  compact: true,
};

export const WithSymbol = TagTemplate.bind({});
WithSymbol.args = {
  ...NameOnly.args,
  symbol: "🐷",
};

export const WithNodeSymbol = TagTemplate.bind({});
WithNodeSymbol.args = {
  ...NameOnly.args,
  symbol: <Icon icon={faCalendar} />,
};

export const Deletable = TagTemplate.bind({});
Deletable.args = {
  ...WithSymbol.args,
  deletable: true,
  onDeleteTag: action("onDeleteTag"),
};

export const CanonicalTagTypes = TagTemplate.bind({});
CanonicalTagTypes.args = {
  tags: [
    TagsFactory.createProps(TagsFactory.getTagDataFromString("#search tag")),
    TagsFactory.createProps(TagsFactory.getTagDataFromString("+category tag")),
    TagsFactory.createProps(
      TagsFactory.getTagDataFromString("cn: content notice")
    ),
    TagsFactory.createProps(TagsFactory.getTagDataFromString("a whisper tag")),
  ],
};

export const CnVariants = TagTemplate.bind({});
CnVariants.args = {
  tags: [
    TagsFactory.createProps(
      TagsFactory.getTagDataFromString("cn: a bad thing (cn)")
    ),
    TagsFactory.createProps(
      TagsFactory.getTagDataFromString("cw: a bad thing (cw)")
    ),
    TagsFactory.createProps(
      TagsFactory.getTagDataFromString("sq: a bad thing (sq)")
    ),
    TagsFactory.createProps(
      TagsFactory.getTagDataFromString("squick: a bad thing (squick)")
    ),
  ],
};

export const Long = TagTemplate.bind({});
Long.args = {
  ...TagsFactory.createProps(
    TagsFactory.getTagDataFromString(
      "cn: What the fuck did you just fucking say about me, you little b*tch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills."
    )
  ),
};
Long.decorators = [
  (Story) => {
    return (
      <div className="story">
        {Story()}
        <style jsx>{`
          .story {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            background-color: white;
            max-width: 300px;
            padding: 20px;
          }
        `}</style>
      </div>
    );
  },
];
