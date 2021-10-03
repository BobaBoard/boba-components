import React from "react";
import PinnedBoardsMenu, {
  PinnedBoardsMenuProps,
} from "../../src/sidemenu/PinnedBoardsMenu";

import {
  faBatteryEmpty,
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
  title: "Side Menu/PinnedBoardsMenu",
  component: PinnedBoardsMenu,
};

const BoardsMenuSectionTemplate = (args: PinnedBoardsMenuProps) => {
  return <PinnedBoardsMenu {...args} />;
};

export const Regular = BoardsMenuSectionTemplate.bind({});
Regular.args = {
  boards: RECENT_BOARDS,
  currentBoardSlug: "kink-memes",
};

export const Long = BoardsMenuSectionTemplate.bind({});
Long.args = {
  boards: [...RECENT_BOARDS, ...PINNED_BOARDS, ...PINNED_BOARDS],
  currentBoardSlug: "kink-memes",
};

export const Loading = BoardsMenuSectionTemplate.bind({});
Loading.args = {
  loading: true,
  loadingElementsCount: 7,
  loadingAccentColor: "green",
};
