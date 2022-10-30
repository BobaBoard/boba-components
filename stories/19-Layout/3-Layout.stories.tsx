import Layout, { LayoutProps } from "layout/Layout";
import {
  faInbox,
  faSearch,
  faStar,
  faTh,
} from "@fortawesome/free-solid-svg-icons";

import { MultipleSections } from "stories/20-SideMenu/01-PinnedMenu.stories";
import React from "react";
import { SideMenuPreview } from "stories/20-SideMenu/20-SideMenu.stories";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import mamoru from "stories/images/mamoru.png";

const defaultLayoutArgs: Partial<LayoutTemplate> = {
  sideMenuContent: <div>Get a load of this menu content!</div>,
  // @ts-ignore-error
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
      icon: { icon: faTh },
      link: {
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        onClick: action("boards"),
      },
    },
    {
      id: "inbox",
      icon: { icon: faInbox },
      link: {
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        onClick: action("inbox"),
      },
    },
    {
      id: "search",
      icon: { icon: faSearch },
      link: {
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        onClick: action("search"),
      },
    },
  ],
  selectedMenuOption: "inbox",
};

export default {
  title: "Layout / Layout Preview",
  component: Layout,
  args: defaultLayoutArgs,
};

interface LayoutTemplate extends LayoutProps {
  mainContent: React.ReactNode;
  sideMenuContent: React.ReactNode;
  pinnedMenuContent: React.ReactNode;
}

const LayoutTemplate: Story<LayoutTemplate> = (args) => {
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
  onUserBarClick: {
    onClick: action("userbarClick"),
  },
  loggedInMenuOptions: [
    {
      icon: { icon: faSearch },
      name: "opt1",
      link: {
        onClick: action("opt1"),
      },
    },
    {
      icon: { icon: faInbox },
      name: "opt2askldjaskdjaskdjaskldjaskldjaskldjaskldjaskldjaskldjaskldjaskldjaklsj",
      link: {
        onClick: action("opt2"),
      },
    },
  ],
  hasNotifications: true,
  notificationIcon: faStar,
  notificationColor: "#f4cb2e",
};

export const LoadingLayout = LayoutTemplate.bind({});
LoadingLayout.args = {
  ...LoggedInLayout.args,
  loading: true,
  userLoading: true,
  hasNotifications: true,
  headerAccent: "red",
};
LoadingLayout.decorators = [
  (Story, storyArgs) => {
    const [loading, setLoading] = React.useState(storyArgs.args.loading);
    const newStoryContenxt: typeof storyArgs = {
      ...storyArgs,
      args: {
        ...storyArgs.args,
        loading: loading,
      },
    };

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Story {...newStoryContenxt} />
        <button
          style={{
            position: "absolute",
            top: "300px",
            left: "50%",
            padding: "10px",
            zIndex: 1000,
          }}
          onClick={() => setLoading(!loading)}
        >
          {loading ? "Stop loading bar" : "Start loading bar"}
        </button>
      </div>
    );
  },
];
export const WithSideMenu = LayoutTemplate.bind({});
WithSideMenu.args = {
  ...LoggedInLayout,
  sideMenuContent: <SideMenuPreview {...SideMenuPreview.args} />,
};
