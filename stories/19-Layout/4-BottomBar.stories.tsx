import BottomBar, { BottomBarProps } from "layout/BottomBar";
import { Story } from "@storybook/react";
import React from "react";
import {
  faPlus,
  faStar,
  faEyeSlash,
  faThumbTack,
  faVolumeMute,
  faCompass,
  faAnglesDown,
  faAnglesUp,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";

const ButtonTemplate: Story = (args: BottomBarProps) => {
  return <BottomBar {...args} />;
};

export const BottomBarExample = ButtonTemplate.bind({});
BottomBarExample.args = {
  centerButtonColor: "red",
  centerButtonIcon: faPlus,
  circleButtons: [
    { icon: { icon: faCompass }, link: { href: "" } },
    {
      icon: { icon: faAnglesUp },
      link: { href: "" },
      withNotification: { icon: faCertificate, color: "white" },
    },
    {
      icon: { icon: faAnglesDown },
      link: { href: "" },
      withNotification: { icon: faCertificate, color: "white" },
    },
  ],
  contextMenuIcons: [
    { icon: faEyeSlash, color: "red" },
    { icon: faVolumeMute, color: "red" },
    { icon: faStar, color: "gray" },
    { icon: faThumbTack, color: "white" },
  ],
};

export default {
  title: "Layout / BottomBar",
  component: BottomBar,
};
