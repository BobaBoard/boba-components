import React from "react";

import MenuBar from "../src/layout/MenuBar";
import mamoru from "./images/mamoru.png";

import { faInbox, faSearch, faTh } from "@fortawesome/free-solid-svg-icons";

import { action } from "@storybook/addon-actions";

export default {
  title: "MenuBar",
  component: MenuBar,
  argTypes: {
    accentColor: { control: "color" },
  },
};

const MenuBarTemplate = (args: any) => (
  <div style={{ margin: "25px", backgroundColor: "purple", height: "70px" }}>
    <MenuBar {...args} />
  </div>
);

export const MenuBarSimple = MenuBarTemplate.bind({});
MenuBarSimple.args = {
  menuOptions: [
    {
      id: "boards",
      icon: faTh,
      link: {
        href: "https://www.google.com",
        onClick: action("boards!"),
      },
    },
    {
      id: "inbox",
      icon: faInbox,
      link: { href: "https://www.google.com", onClick: action("inbox!") },
    },
    {
      id: "search",
      icon: faSearch,
      link: {
        href: "https://www.google.com",
        onClick: action("search!"),
      },
    },
  ],
  accentColor: "orange",
  selectedOption: "inbox",
  user: {
    username: "SexyDaddy69",
    avatarUrl: mamoru,
  },
  userMenuOptions: [
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
  onLoggedOutUserClick: action("userClick!"),
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
      icon: faTh,
      link: {
        href: "https://www.google.com",
        onClick: action("boards!"),
      },
    },
    {
      id: "inbox",
      icon: faInbox,
      link: { href: "https://www.google.com", onClick: action("inbox!") },
    },
    {
      id: "search",
      icon: faSearch,
      link: {
        href: "https://www.google.com",
        onClick: action("search!"),
      },
    },
  ],
  accentColor: "orange",
  selectedOption: "inbox",
  loading: true,
  userMenuOptions: [
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
  onLoggedOutUserClick: action("userClick!"),
};

export const MenuBarLoggedOut = MenuBarTemplate.bind({});
MenuBarLoggedOut.args = {
  menuOptions: [
    {
      id: "boards",
      icon: faTh,
      link: {
        href: "https://www.google.com",
        onClick: action("boards!"),
      },
    },
    {
      id: "inbox",
      icon: faInbox,
      link: { href: "https://www.google.com", onClick: action("inbox!") },
    },
    {
      id: "search",
      icon: faSearch,
      link: {
        href: "https://www.google.com",
        onClick: action("search!"),
      },
    },
  ],
  accentColor: "orange",
  selectedOption: "inbox",
  userMenuOptions: [
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
  onLoggedOutUserClick: {
    onClick: action("userClick!"),
  },
};
