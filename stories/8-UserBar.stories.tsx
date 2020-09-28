import React from "react";

import UserBar from "../src/layout/UserBar";
import mamoru from "./images/mamoru.png";

import { action } from "@storybook/addon-actions";

export default {
  title: "UserBar",
  component: UserBar,
  argTypes: {
    color: { control: "color" },
  },
};

const UserBarTemplate = (args: any) => (
  <div style={{ margin: "25px" }}>
    <UserBar {...args} />
  </div>
);

export const LoggedOut = UserBarTemplate.bind({});
LoggedOut.args = {
  onClick: action("onClick"),
  color: "orange",
};

export const LoggedIn = UserBarTemplate.bind({});
LoggedIn.args = {
  onClick: action("onClick"),
  color: "orange",
  user: {
    username: "SexyDaddy69",
    avatarUrl: mamoru,
  },
};

export const Loading = UserBarTemplate.bind({});
Loading.args = {
  onClick: action("onClick"),
  color: "orange",
  user: {
    username: "SexyDaddy69",
    avatarUrl: mamoru,
  },
  loading: true,
};

export const MenuOptions = UserBarTemplate.bind({});
MenuOptions.args = {
  onClick: action("onClick"),
  color: "orange",
  user: {
    username: "SexyDaddy69",
    avatarUrl: mamoru,
  },
  menuOptions: [
    {
      name: "no href",
      link: {
        onClick: action("noHrefClick"),
      },
    },
    {
      name: "with href",
      link: {
        onClick: action("withHref"),
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
    },
  ],
};
