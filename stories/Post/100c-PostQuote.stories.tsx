import {
  EDITOR_TEXT_VALUES,
  getInitialTextString,
} from "../utils/editor-controls";
import { Meta, Story } from "@storybook/react";
import PostQuote, { PostQuoteProps } from "post/PostQuote";

import React from "react";
import { action } from "@storybook/addon-actions";
import crown from "stories/images/crown.png";
import mamoruAvatar from "stories/images/mamoru.png";
import tuxedoAvatar from "stories/images/tuxedo-mask.jpg";

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
