import React from "react";
import Layout, { LayoutProps } from "../../src/layout/Layout";

import { faInbox, faSearch, faTh } from "@fortawesome/free-solid-svg-icons";

import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MultipleSections } from "../20-SideMenu/01-PinnedMenu.stories";

import mamoru from "../images/mamoru.png";

export default {
  title: "Layout / Layout Preview",
  component: Layout,
  args: {
    sideMenuContent: <div>Get a load of this menu content!</div>,
    // @ts-expect-error
    pinnedMenuContent: <MultipleSections {...MultipleSections.args} />,
    mainContent: (
      <div
        style={{ backgroundColor: "darkgray", height: "2000px", width: "100%" }}
      >
        This is the main content!
      </div>
    ),
    logoLink: {
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      onClick: action("logoClick"),
    },
    titleLink: {
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      onClick: action("titleClick"),
    },
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
  },
};

const LayoutTemplate: Story<
  LayoutProps & {
    mainContent: React.ReactNode;
    sideMenuContent: React.ReactNode;
    pinnedMenuContent: React.ReactNode;
  }
> = (args) => {
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
  title: "!aReallyLongOne",
  headerAccent: "purple",
};

export const LoggedInLayout = LayoutTemplate.bind({});
LoggedInLayout.args = {
  sideMenuContent: <div>Get a load of this menu content!</div>,
  title: "!gore",
  user: {
    username: "SexyDaddy69",
    avatarUrl: mamoru,
  },
  onUserBarClick: action("userbarClick"),
  loggedInMenuOptions: [
    {
      icon: faSearch,
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
};

export const LoadingLayout = LayoutTemplate.bind({});
LoadingLayout.args = {
  ...LoggedInLayout.args,
  loading: true,
  userLoading: true,
  hasNotifications: true,
  headerAccent: "red",
};
