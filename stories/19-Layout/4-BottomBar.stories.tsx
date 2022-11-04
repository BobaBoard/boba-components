import BottomBar, { BottomBarProps } from "layout/BottomBar";
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
    link: {
      onClick: action("context-menu"),
    },
  },
} as BottomBarProps;

export default {
  title: "Layout / BottomBar",
  component: BottomBar,
};
