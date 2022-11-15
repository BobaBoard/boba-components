import Layout, { LayoutProps } from "layout/Layout";
import {
  faInbox,
  faSearch,
  faStar,
  faTh,
} from "@fortawesome/free-solid-svg-icons";

import { MultipleSections } from "stories/SideMenu/200-PinnedMenu.stories";
import React from "react";
import { Regular } from "stories/Experimental/Layout/101-BottomBar.stories";
import { RequiredStoryArgs } from "stories/utils/story-utils";
import { SideMenuPreview } from "stories/SideMenu/100-SideMenu.stories";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import mamoru from "stories/images/mamoru.png";

const defaultLayoutArgs: Partial<LayoutTemplate> = {
  sideMenuContent: <div>Get a load of this menu content!</div>,
  pinnedMenuContent: (
    <MultipleSections
      {...(MultipleSections.args as RequiredStoryArgs<typeof MultipleSections>)}
    />
  ),
  mainContent: (
    <div
      style={{ backgroundColor: "#29d3ff", height: "2000px", width: "100%" }}
    >
      This is the main content!
    </div>
  ),
  logoLink: {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    onClick: action("logoClick"),
  },
  title: "a board",
  accentColor: "purple",
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
  bottomBarContent?: React.ReactNode;
}

const LayoutTemplate: Story<LayoutTemplate> = (args) => {
  const {
    mainContent,
    sideMenuContent,
    pinnedMenuContent,
    bottomBarContent,
    ...rest
  } = args;
  return (
    <>
      <Layout {...rest}>
        <Layout.MainContent>{mainContent}</Layout.MainContent>
        <Layout.SideMenuContent>{sideMenuContent}</Layout.SideMenuContent>
        <Layout.PinnedMenuContent>{pinnedMenuContent}</Layout.PinnedMenuContent>
        <Layout.ActionButton></Layout.ActionButton>
        {bottomBarContent && (
          <Layout.BottomBar>{bottomBarContent}</Layout.BottomBar>
        )}
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
  accentColor: "purple",
};

export const LoggedInLayout = LayoutTemplate.bind({});
LoggedInLayout.args = {
  sideMenuContent: <div>Get a load of this menu content!</div>,
  title: "!gore",
  user: {
    name: "SexyDaddy69",
    avatar: mamoru,
    menuOptions: [
      {
        icon: faSearch,
        name: "opt1",
        link: {
          onClick: action("opt1"),
        },
      },
      {
        icon: faInbox,
        name: "opt2askldjaskdjaskdjaskldjaskldjaskldjaskldjaskldjaskldjaskldjaskldjaklsj",
        link: {
          onClick: action("opt2"),
        },
      },
    ],
  },
  onUserBarClick: {
    onClick: action("userbarClick"),
  },
  notificationIcon: {
    icon: faStar,
    color: "#f4cb2e",
  },
};

export const LoadingLayout = LayoutTemplate.bind({});
LoadingLayout.args = {
  ...LoggedInLayout.args,
  loading: true,
  user: {
    avatar: mamoru,
    name: "SexyDaddy69",
    menuOptions: LoggedInLayout.args.user?.menuOptions,
    loading: true,
  },
  accentColor: "red",
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
  ...LoggedInLayout.args,
  sideMenuContent: (
    <SideMenuPreview
      {...(SideMenuPreview.args as Required<
        NonNullable<typeof SideMenuPreview.args>
      >)}
    />
  ),
  bottomBarContent: (
    <Regular {...(Regular.args as RequiredStoryArgs<typeof Regular>)} />
  ),
};

export const ShortContent = LayoutTemplate.bind({});
ShortContent.args = {
  ...LoggedInLayout.args,
  sideMenuContent: (
    <SideMenuPreview
      {...(SideMenuPreview.args as RequiredStoryArgs<typeof SideMenuPreview>)}
    />
  ),
  mainContent: (
    <div style={{ backgroundColor: "#29d3ff", height: "100px", width: "100%" }}>
      This is a short main content!
    </div>
  ),
};
