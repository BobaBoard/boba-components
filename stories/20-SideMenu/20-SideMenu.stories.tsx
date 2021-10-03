import React from "react";
import SideMenu, { SideMenuHandler } from "../../src/sidemenu/SideMenu";

import {
  faClock,
  faTh,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import { action } from "@storybook/addon-actions";

import goreBackground from "../images/gore.png";

import anime from "../images/anime.png";
import crack from "../images/crack.png";
import oncelerBoard from "../images/onceler-board.png";
import meta from "../images/meta.png";
import book from "../images/book.png";
import villains from "../images/villains.png";
import kinkmeme from "../images/kink-meme.png";
import art from "../images/art-crit.png";

const PINNED_BOARDS = [
  {
    slug: "gore",
    muted: true,
    avatar: "/" + goreBackground,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "anime",
    avatar: "/" + anime,
    description: "We put the weeb in dweeb.",
    color: "#24d282",
    updates: 2,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "crack",
    avatar: "/" + crack,
    description: "What's crackalackin",
    color: "#f9e066",
    updates: 3,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
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
  {
    slug: "dasdjkasdjaklsdjaklsdjaslkdjaslkjdakldjalksjaslk",
    avatar: "/" + meta,
    description: "In My TiMeS wE CaLlEd It WaNk",
    color: "#f9e066",
    link: { href: "#slug", onClick: action("#slug") },
  },
];
const SEARCH_BOARDS = [
  {
    slug: "villain-thirst",
    avatar: "/" + villains,
    description: "Love to love 'em.",
    color: "#e22b4b",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "art-crit",
    avatar: "/" + art,
    description: "Let's learn together!",
    color: "#27caba",
    link: { href: "#slug", onClick: action("#slug") },
  },
];
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
    slug: "oncie-den",
    avatar: "/" + oncelerBoard,
    description: "Party like it's 2012",
    color: "#27caba",
    updates: 10,
    outdated: true,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
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
  {
    slug: "kink-memes",
    avatar: "/" + kinkmeme,
    description: "No limits. No shame.",
    color: "#000000",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "crack",
    avatar: "/" + crack,
    description: "What's crackalackin",
    color: "#f9e066",
    updates: 3,
    outdated: true,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
];

export default {
  title: "Side Menu/SideMenu Preview",
  component: SideMenu,
};

export const SideMenuPreview = () => {
  const [showPinned, setShowPinned] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const menuRef = React.useRef<SideMenuHandler>(null);
  return (
    <div>
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: "0",
          zIndex: 2000,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button onClick={() => setShowPinned(!showPinned)}>
          Toggle Pinned
        </button>
        <button onClick={() => setLoading(!loading)}>Toggle Loading</button>
        <button onClick={() => menuRef.current?.focusBoardFilter()}>
          Focus
        </button>
      </div>
      <div style={{ maxWidth: "500px", backgroundColor: "red" }}>
        <SideMenu
          pinnedBoards={[
            ...PINNED_BOARDS,
            { ...PINNED_BOARDS[1], updates: 0 },
            ...PINNED_BOARDS,
          ]}
          currentBoardSlug="anime"
          showPinned={showPinned}
          ref={menuRef}
        >
          <SideMenu.BoardsMenuSection
            title="recent unreads"
            icon={faClock}
            boards={RECENT_BOARDS}
            emptyTitle="Congratulations!"
            emptyDescription="You read 'em all."
          />
          <SideMenu.BoardsMenuSection
            title="loading section"
            icon={faUpload}
            emptyTitle="Congratulations!"
            emptyDescription="You read 'em all."
            loading={loading}
            placeholdersHeight={5}
            accentColor="red"
          />
          <SideMenu.BoardsMenuSection
            title="empty section"
            icon={faTrash}
            emptyTitle="Congratulations!"
            emptyDescription="You read 'em all."
          />
          <SideMenu.BoardsMenuSection
            title="all boards"
            icon={faTh}
            boards={[...PINNED_BOARDS, ...RECENT_BOARDS, ...SEARCH_BOARDS]}
            emptyTitle="There's no board here."
            emptyDescription="Somehow, that feels wrong."
          />
        </SideMenu>
      </div>
    </div>
  );
};

SideMenuPreview.story = {
  name: "SideMenu",
};
