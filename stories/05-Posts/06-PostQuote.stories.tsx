import React from "react";

import tuxedoAvatar from "../images/tuxedo-mask.jpg";
import mamoruAvatar from "../images/mamoru.png";

import { action } from "@storybook/addon-actions";
import {
  EDITOR_TEXT_VALUES,
  getInitialTextString,
} from "../utils/editor-controls";
import { Meta, Story } from "@storybook/react";
import PostQuote, { PostQuoteProps } from "../../src/post/PostQuote";

import crown from "../images/crown.png";

export default {
  title: "Posts / PostQuote",
  component: PostQuote,
} as Meta;

const PostQuoteStoryTemplate: Story<PostQuoteProps> = (args) => {
  return <PostQuote {...args} />;
};
export const Quote = PostQuoteStoryTemplate.bind({});
Quote.args = {
  createdTime: "yesterday",
  createdTimeLink: {
    href: "#test-link",
    onClick: action("clickity-click"),
  },
  text: getInitialTextString(EDITOR_TEXT_VALUES.WITH_IMAGE),
  secretIdentity: {
    name: "Tuxedo Mask",
    avatar: `/${tuxedoAvatar}`,
    accessory: crown,
    color: "#f30cb5",
  },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
};
Quote.decorators = [(Story) => <div style={{ width: "300px" }}>{Story()}</div>];
