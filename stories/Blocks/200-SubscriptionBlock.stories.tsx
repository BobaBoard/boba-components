import {
  EDITOR_TEXT_VALUES,
  getInitialTextString,
} from "../utils/editor-controls";
import SubscriptionBlock, {
  SubscriptionBlockProps,
} from "blocks/SubscriptionBlock";

import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import crown from "stories/images/crown.png";
import tuxedoAvatar from "stories/images/tuxedo-mask.jpg";

export default {
  title: "Blocks/Subscription Block",
  component: SubscriptionBlock,
};

const Template: Story<SubscriptionBlockProps> = (args) => (
  <SubscriptionBlock {...args} />
);

export const Single = Template.bind({});
Single.args = {
  title: "The latest from BoobaBoard",
  lastUpdatedTime: "4/20/69",
  lastUpdatedTimeLink: {
    onClick: action("withHref"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  showOlderLink: {
    onClick: action("withHref"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  post: getInitialTextString(EDITOR_TEXT_VALUES.WITH_IMAGE),
  secretIdentity: {
    name: "Tuxedo Mask",
    avatar: `/${tuxedoAvatar}`,
    accessory: crown,
    color: "#f30cb5",
  },
};

export const Shrinkable = Template.bind({});
Shrinkable.args = {
  ...Single.args,
  maxHeightPx: 300,
};
