import MenuBar, { MenuBarProps } from "layout/MenuBar";
import { faInbox, faSearch, faTh } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import mamoru from "stories/images/mamoru.png";

export default {
  title: "Layout / MenuBar",
  component: MenuBar,
  argTypes: {
    accentColor: { control: "color" },
  },
};

const MenuBarTemplate: Story<MenuBarProps> = (args: MenuBarProps) => (
  <div style={{ margin: "25px", backgroundColor: "purple", height: "70px" }}>
    <MenuBar {...args} />
  </div>
);

export const MenuBarSimple = MenuBarTemplate.bind({});
MenuBarSimple.args = {
  menuOptions: [
    {
      id: "boards",
      icon: { icon: faTh },
      link: {
        href: "https://www.google.com",
        onClick: action("boards!"),
      },
    },
    {
      id: "inbox",
      icon: { icon: faInbox },
      link: { href: "https://www.google.com", onClick: action("inbox!") },
    },
    {
      id: "search",
      icon: { icon: faSearch },
      link: {
        href: "https://www.google.com",
        onClick: action("search!"),
      },
    },
  ],
  accentColor: "orange",
  selectedOption: "inbox",
  user: {
    name: "SexyDaddy69",
    avatar: mamoru,
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
  },
  onLoggedOutUserClick: {
    onClick: action("LoggedOutUserClick"),
  },
};

export const MenuBarLockedIdentity = MenuBarTemplate.bind({});
MenuBarLockedIdentity.args = {
  ...MenuBarSimple.args,
  forceHideIdentity: true,
};

export const MenuBarLoading = MenuBarTemplate.bind({});
MenuBarLoading.args = {
  menuOptions: [
    {
      id: "boards",
      icon: { icon: faTh },
      link: {
        href: "https://www.google.com",
        onClick: action("boards!"),
      },
    },
    {
      id: "inbox",
      icon: { icon: faInbox },
      link: { href: "https://www.google.com", onClick: action("inbox!") },
    },
    {
      id: "search",
      icon: { icon: faSearch },
      link: {
        href: "https://www.google.com",
        onClick: action("search!"),
      },
    },
  ],
  accentColor: "orange",
  selectedOption: "inbox",
  user: {
    loading: true,
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
  },
  onLoggedOutUserClick: {
    onClick: action("LoggedOutUserClick"),
  },
};

export const MenuBarLoggedOut = MenuBarTemplate.bind({});
MenuBarLoggedOut.args = {
  menuOptions: [
    {
      id: "boards",
      icon: { icon: faTh },
      link: {
        href: "https://www.google.com",
        onClick: action("boards!"),
      },
    },
    {
      id: "inbox",
      icon: { icon: faInbox },
      link: { href: "https://www.google.com", onClick: action("inbox!") },
    },
    {
      id: "search",
      icon: { icon: faSearch },
      link: {
        href: "https://www.google.com",
        onClick: action("search!"),
      },
    },
  ],
  accentColor: "orange",
  selectedOption: "inbox",
  onLoggedOutUserClick: {
    onClick: action("LoggedOutUserClick"),
  },
};
