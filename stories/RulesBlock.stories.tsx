import React from "react";
import RulesBlock from "../src/blocks/RulesBlock";
import { action } from "@storybook/addon-actions";

export default {
  title: "Blocks/Rules Block",
  component: RulesBlock,
};

const Template = (args) => (
  <>
    <RulesBlock {...args} />
  </>
);

export const Single = Template.bind({});
Single.args = {
  title: "One Rule to Rule them All",
  seeAllLink: {
    onClick: action("withHref"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  rules: [
    {
      title: "No Harassment",
      description: "The mods will tell your mom if you don't behave",
      index: 1,
    },
  ],
};

export const Multiple = Template.bind({});

Multiple.args = {
  ...Single.args, 
  title: "📌 Pinned Rules",
  rules: [
    ...Single.args.rules,
    { title: "No Memes", description: "No fun allowed!", index: 2 },
    {
      title: "Use Required CN tags",
      description:
        "NSFW content posted to any board not in the explicit NSFW category requires a 'cn: NSFW' tag",
      index: 0,
    },
  ],
}
