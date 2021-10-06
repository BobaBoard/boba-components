import React from "react";
import Header, { HeaderStyle, PostHeaderProps } from "../../src/post/Header";

import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";

import oncelerAvatar from "../images/oncie.jpg";
import tuxedoAvatar from "../images/tuxedo-mask.jpg";
import mamoruAvatar from "../images/mamoru.png";
import crown from "../images/crown.png";

export default {
  title: "Posts/Header",
  component: Header,
  decorators: [
    (Story) => (
      <div className="story">
        <h2>Large container</h2>
        <div
          style={{ width: "100%", maxWidth: "500px", backgroundColor: "white" }}
        >
          {Story()}
        </div>
        <h2>Small container</h2>
        <div
          style={{ width: "100%", maxWidth: "200px", backgroundColor: "white" }}
        >
          {Story()}
        </div>
        <style jsx>{`
          .story {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 25px;
            background-color: lightgray;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const HeaderTemplate: Story<PostHeaderProps> = (args) => <Header {...args} />;

export const RegularHeader = HeaderTemplate.bind({});
RegularHeader.args = {
  secretIdentity: {
    name: "Good Onceler",
    avatar: `/${oncelerAvatar}`,
  },
  createdMessage: "posted on: 2019/06/19 at 4:20pm",
  createdMessageLink: {
    onClick: action("withHref"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  size: HeaderStyle.REGULAR,
};

export const WithUserIdentity = HeaderTemplate.bind({});
WithUserIdentity.args = {
  ...RegularHeader.args,
  secretIdentity: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
};

export const WithForceHideUserIdentity = HeaderTemplate.bind({});
WithForceHideUserIdentity.args = {
  ...WithUserIdentity.args,
  forceHide: true,
};

export const WithColorAndAccessory = HeaderTemplate.bind({});
WithColorAndAccessory.args = {
  ...WithUserIdentity.args,
  secretIdentity: {
    ...WithUserIdentity.args.secretIdentity,
    color: "#f30cb5",
    accessory: crown,
  },
};

export const WithIdentitySelector = HeaderTemplate.bind({});
WithIdentitySelector.args = {
  ...WithUserIdentity.args,
  secretIdentity: {
    name: "Tuxedo Mask, the one and only",
    avatar: `/${tuxedoAvatar}`,
  },
  additionalIdentities: [
    {
      id: "id1",
      name: "Tuxedo Mask, the one and only",
      avatar: `/${tuxedoAvatar}`,
    },
    {
      id: "id2",
      name: "Mega Mod",
      avatar: `/${oncelerAvatar}`,
      color: "#f30cb5",
      accessory: crown,
    },
  ],
};

export const CompactHeader = HeaderTemplate.bind({});
CompactHeader.args = {
  ...RegularHeader.args,
  size: HeaderStyle.COMPACT,
};

export const CompactWithUserIdentity = HeaderTemplate.bind({});
CompactWithUserIdentity.args = {
  ...WithUserIdentity.args,
  size: HeaderStyle.COMPACT,
};
export const CompactWithForceHideUserIdentity = HeaderTemplate.bind({});
CompactWithForceHideUserIdentity.args = {
  ...WithForceHideUserIdentity.args,
  size: HeaderStyle.COMPACT,
};

export const CompactWithColorAndAccessory = HeaderTemplate.bind({});
CompactWithColorAndAccessory.args = {
  ...WithColorAndAccessory.args,
  size: HeaderStyle.COMPACT,
};

export const CompactWithIdentitySelector = HeaderTemplate.bind({});
CompactWithIdentitySelector.args = {
  ...WithIdentitySelector.args,
  size: HeaderStyle.COMPACT,
};
