import BottomBar, { BottomBarProps } from "layout/BottomBar";
import { Meta, Story } from "@storybook/react";
import {
  faAnglesDown,
  faAnglesUp,
  faCertificate,
  faCompass,
  faEyeSlash,
  faPlusSquare,
  faStar,
  faThumbTack,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import Theme from "theme/default";
import { action } from "@storybook/addon-actions";

const ButtonTemplate: Story = (args: BottomBarProps) => {
  return <BottomBar {...args} />;
};

const LEFT_BUTTON = (
  <BottomBar.Button
    key="compass"
    icon={{ icon: faCompass }}
    link={{ onClick: action("button1") }}
    position="left"
    desktopOnly
  />
);
const RIGHT_BUTTONS = [
  <BottomBar.Button
    key="jump up"
    icon={{ icon: faAnglesUp }}
    withNotification={{
      icon: faCertificate,
      color: Theme.DEFAULT_ACCENT_COLOR,
    }}
    link={{ onClick: action("button1") }}
    position="right"
  />,
  <BottomBar.Button
    key="jump down"
    icon={{ icon: faAnglesDown }}
    withNotification={{
      icon: faCertificate,
      color: Theme.DEFAULT_ACCENT_COLOR,
    }}
    link={{ onClick: action("button2") }}
    position="right"
  />,
];

export const Regular = ButtonTemplate.bind({});
Regular.args = {
  accentColor: Theme.DEFAULT_ACCENT_COLOR,
  centerButton: {
    icon: faPlusSquare,
    color: "white",
    link: { onClick: action("center-button") },
  },
  children: [LEFT_BUTTON, ...RIGHT_BUTTONS],
  contextMenu: {
    icons: [
      { id: "faEyeSlash", icon: faEyeSlash, color: Theme.DEFAULT_ACCENT_COLOR },
      {
        id: "faVolumeMute",
        icon: faVolumeMute,
        color: Theme.DEFAULT_ACCENT_COLOR,
      },
      { id: "faStar", icon: faStar, color: "gray" },
      { id: "faThumbTack", icon: faThumbTack, color: "white" },
    ],
    info: <div style={{ padding: "20px" }}>Last updated: 20 days ago</div>,
    options: [
      {
        name: "Unmute",
        icon: faVolumeMute,
        link: {
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          onClick: action("unmute"),
        },
      },
      {
        name: "Unhide",
        icon: faEyeSlash,
        link: {
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          onClick: action("unmute"),
        },
      },
      {
        name: "Unpin",
        icon: faThumbTack,
        link: {
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          onClick: action("unpin"),
        },
      },
      {
        name: "Star",
        icon: faStar,
        link: {
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          onClick: action("search"),
        },
      },
    ],
  },
};

export const NoCenterButton = ButtonTemplate.bind({});
NoCenterButton.args = {
  ...Regular.args,
  centerButton: null,
};

export const NoLeftButton = ButtonTemplate.bind({});
NoLeftButton.args = {
  ...Regular.args,
  children: RIGHT_BUTTONS,
};

export const EmptyContextMenu = ButtonTemplate.bind({});
EmptyContextMenu.args = {
  ...Regular.args,
  contextMenu: {
    icons: [],
  },
};

export default {
  title: "Experimental / BottomBar",
  component: BottomBar,
  decorators: [
    (Story) => (
      <div
        style={{
          height: Theme.BOTTOM_BAR_HEIGHT_PX + "px",
          position: "relative",
          marginTop: "20px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;
