import React from "react";
import Layout from "../src/layout/Layout";

import { faInbox, faSearch, faTh } from "@fortawesome/free-solid-svg-icons";

import { action } from "@storybook/addon-actions";

import mamoru from "./images/mamoru.png";

export default {
  title: "Layout Preview",
  component: Layout,
};

const menuOptions = {
  menuOptions: [
    {
      id: "boards",
      name: "boards",
      icon: faTh,
      link: {
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        onClick: action("boards"),
      },
    },
    {
      id: "inbox",
      name: "inbox",
      icon: faInbox,
      link: {
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        onClick: action("inbox"),
      },
    },
    {
      id: "search",
      name: "search",
      icon: faSearch,
      link: {
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        onClick: action("search"),
      },
    },
  ],
  selectedMenuOption: "inbox",
};

const LayoutTemplate = (args: any) => {
  const { mainContent, sideMenuContent, pinnedMenuContent, ...rest } = args;
  return (
    <>
      <Layout {...rest}>
        <Layout.MainContent>{mainContent}</Layout.MainContent>
        <Layout.SideMenuContent>{sideMenuContent}</Layout.SideMenuContent>
        <Layout.PinnedMenuContent>{pinnedMenuContent}</Layout.PinnedMenuContent>
        <Layout.ActionButton></Layout.ActionButton>
      </Layout>
      <style jsx>
        {`
          :global(body) {
            padding: 0 !important;
          }
        `}
      </style>
    </>
  );
};

export const SimpleLayout = LayoutTemplate.bind({});
SimpleLayout.args = {
  mainContent: <div>This is the main content!</div>,
  sideMenuContent: <div>Get a load of this menu content!</div>,
  title: "!aReallyLongOne",
  headerAccent: "purple",
  logoLink: {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    onClick: action("logoClick"),
  },
  titleLink: {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    onClick: action("titleClick"),
  },
  ...menuOptions,
};

export const LoggedInLayout = LayoutTemplate.bind({});
LoggedInLayout.args = {
  mainContent: (
    <div
      style={{ backgroundColor: "darkgray", height: "2000px", width: "100%" }}
    >
      This is the main content!
    </div>
  ),
  sideMenuContent: <div>Get a load of this menu content!</div>,
  title: "!gore",
  user: {
    username: "SexyDaddy69",
    avatarUrl: mamoru,
  },
  logoLink: {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    onClick: action("logoClick"),
  },
  titleLink: {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    onClick: action("titleClick"),
  },
  onUserbarClick: {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    onClick: action("userbarClick"),
  },
  loggedInMenuOptions: [
    {
      name: "opt1",
      link: {
        onClick: action("opt1"),
      },
    },
    {
      icon: faInbox,
      name:
        "opt2askldjaskdjaskdjaskldjaskldjaskldjaskldjaskldjaskldjaskldjaskldjaklsj",
      link: {
        onClick: action("opt2"),
      },
    },
  ],
  ...menuOptions,
};

export const LoadingLayout = LayoutTemplate.bind({});
LoadingLayout.args = {
  mainContent: <div>This is the main content!</div>,
  sideMenuContent: <div>Get a load of this menu content!</div>,
  title: "!gore",
  user: {
    username: "SexyDaddy69",
    avatarUrl: mamoru,
  },
  logoLink: {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    onClick: action("logoClick"),
  },
  titleLink: {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    onClick: action("titleClick"),
  },
  onUserbarClick: {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    onClick: action("userbarClick"),
  },
  loggedInMenuOptions: [
    {
      name: "opt1",
      link: {
        onClick: action("opt1"),
      },
    },
    {
      name: "opt2",
      link: {
        onClick: action("opt2"),
      },
    },
  ],
  loading: true,
  userLoading: true,
  updates: true,
  headerAccent: "red",
  ...menuOptions,
};
