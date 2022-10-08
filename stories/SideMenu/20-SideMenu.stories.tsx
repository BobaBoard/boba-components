import { Boards, Icons } from "./01-PinnedMenu.stories";
import { Empty, Loading, Regular } from "./00-BoardsMenuSection.stories";
import SideMenu, { SideMenuHandler, SideMenuProps } from "sidemenu/SideMenu";
import { faClock, faLemon } from "@fortawesome/free-solid-svg-icons";

import BoardsMenuSection from "sidemenu/BoardsMenuSection";
import PinnedMenu from "sidemenu/PinnedMenu";
import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import book from "stories/images/book.png";
import goreBackground from "stories/images/gore.png";
import kinkmeme from "stories/images/kink-meme.png";
import meta from "stories/images/meta.png";
import villains from "stories/images/villains.png";

export default {
  title: "Side Menu/Side Menu",
  component: SideMenu,
};

const RECENT_BOARDS = [
  {
    slug: "gore",
    avatar: "/" + goreBackground,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "a-super-long-slug-because-we-need-to-test-for-overflow",
    avatar: "/" + book,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "kink-memes",
    avatar: "/" + kinkmeme,
    description: "No limits. No shame.",
    color: "#000000",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "fic-club",
    avatar: "/" + book,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
];

const FANDOM_BOARDS = [
  {
    slug: "fic-club",
    avatar: "/" + book,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "meta",
    avatar: "/" + meta,
    description: "In My TiMeS wE CaLlEd It WaNk",
    color: "#f9e066",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "villain-thirst",
    avatar: "/" + villains,
    description: "Love to love 'em.",
    color: "#e22b4b",
    link: { href: "#slug", onClick: action("#slug") },
  },
];

const SideMenuPreviewTemplate: Story<
  SideMenuProps & {
    loading: boolean;
  }
> = (args, context) => {
  return (
    <SideMenu
      showPinned={args.showPinned}
      onFilterChange={args.onFilterChange}
      menuOptions={args.menuOptions}
      currentBoardSlug={args.currentBoardSlug}
      ref={context?.menuRef}
    >
      <PinnedMenu>
        {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
        <PinnedMenu.Section {...Icons.args} />
        {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
        <PinnedMenu.Section {...Boards.args} />
      </PinnedMenu>
      <BoardsMenuSection
        boards={RECENT_BOARDS}
        icon={faClock}
        title="Recent boards"
        currentBoardSlug={args.currentBoardSlug}
      />
      <BoardsMenuSection
        boards={FANDOM_BOARDS}
        icon={faLemon}
        title="Fandom boards"
        currentBoardSlug={args.currentBoardSlug}
      />
      {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
      <BoardsMenuSection {...Regular.args} />
      {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
      <BoardsMenuSection {...Loading.args} loading={args.loading} />
      {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
      <BoardsMenuSection {...Empty.args} />
      {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747)
      <BoardsMenuSection {...Long.args} /> */}
    </SideMenu>
  );
};

export const SideMenuPreview = SideMenuPreviewTemplate.bind({});
SideMenuPreview.args = {
  showPinned: true,
  loading: true,
  currentBoardSlug: "kink-memes",
  onFilterChange: (text) => action("filterBoards")(text),
  menuOptions: [
    {
      name: "Dismiss notifications",
      link: { onClick: action("dismissNotifications") },
    },
  ],
};
SideMenuPreview.decorators = [
  (Story) => {
    const menuRef = React.useRef<SideMenuHandler>(null);
    return (
      <div>
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button onClick={() => menuRef.current?.focusBoardFilter()}>
            Focus filter
          </button>
        </div>
        <div
          style={{
            minHeight: "500px",
          }}
        >
          {/* @ts-ignore */}
          <Story menuRef={menuRef} />
        </div>
      </div>
    );
  },
];
