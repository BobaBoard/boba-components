import BottomBar, { BottomBarProps } from "layout/BottomBar";
import {
  faAnglesDown,
  faAnglesUp,
  faCertificate,
  faCompass,
  faEye,
  faEyeSlash,
  faInbox,
  faPlusSquare,
  faSearch,
  faStar,
  faTh,
  faThumbTack,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { Story } from "@storybook/react";
import Theme from "theme/default";
import { action } from "@storybook/addon-actions";

const ButtonTemplate: Story = (args: BottomBarProps) => {
  return <BottomBar {...args} />;
};

export const BottomBarExample = ButtonTemplate.bind({});
BottomBarExample.args = {
  accentColor: Theme.DEFAULT_ACCENT_COLOR,
  centerButton: {
    icon: faPlusSquare,
    color: "white",
    link: { onClick: action("center-button") },
  },
  circleButtons: [
    { icon: { icon: faCompass }, link: { onClick: action("button1") } },
    {
      icon: { icon: faAnglesUp },
      link: { onClick: action("button2") },
      withNotification: {
        icon: faCertificate,
        color: Theme.DEFAULT_ACCENT_COLOR,
      },
    },
    {
      icon: { icon: faAnglesDown },
      link: { onClick: action("button3") },
      withNotification: {
        icon: faCertificate,
        color: Theme.DEFAULT_ACCENT_COLOR,
      },
    },
  ],
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
} as BottomBarProps;

export default {
  title: "Experimental / BottomBar",
  component: BottomBar,
};
