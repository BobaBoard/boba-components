import React from "react";
import PinnedMenu, {
  PinnedMenuSectionProps,
} from "../../src/sidemenu/PinnedMenu";

import {
  faCoffee,
  faHeart,
  faInbox,
  faInfoCircle,
  faRssSquare,
  faStar,
  faThumbtack,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import { action } from "@storybook/addon-actions";

import goreBackground from "../images/gore.png";

import mamoru from "../images/mamoru.png";
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
  title: "Side Menu/Pinned Menu",
  component: PinnedMenu,
};

const PinnedSectionTemplate = (args: PinnedMenuSectionProps) => {
  return <PinnedMenu.Section {...args} />;
};

export const Regular = PinnedSectionTemplate.bind({});
Regular.args = {
  icon: faThumbtack,
  items: RECENT_BOARDS,
  currentItemId: "kink-memes",
};

export const Long = PinnedSectionTemplate.bind({});
Long.args = {
  icon: faTrash,
  items: [...RECENT_BOARDS, ...PINNED_BOARDS, ...PINNED_BOARDS],
  currentItemId: "kink-memes",
};

export const Loading = PinnedSectionTemplate.bind({});
Loading.args = {
  icon: faUpload,
  loading: true,
  loadingElementsCount: 7,
  loadingAccentColor: "green",
};

export const Icons = PinnedSectionTemplate.bind({});
Icons.args = {
  icon: faRssSquare,
  items: [
    {
      id: "star",
      icon: faStar,
      accentColor: "red",
    },
    {
      icon: faInbox,
      accentColor: "red",
      withNotification: true,
    },
    {
      icon: mamoru,
      accentColor: "red",
      withDropdown: true,
    },
    {
      icon: faHeart,
      accentColor: "red",
    },
  ],
  currentItemId: "star",
};

export const Mixed = PinnedSectionTemplate.bind({});
Mixed.args = {
  icon: faRssSquare,
  items: [
    {
      id: "star",
      icon: faStar,
      accentColor: "red",
    },
    PINNED_BOARDS[0],
    {
      icon: mamoru,
      accentColor: "red",
      withDropdown: true,
    },
    PINNED_BOARDS[2],
    {
      icon: faHeart,
      accentColor: "red",
    },
  ],
  currentItemId: "star",
};

export const MultipleSections = () => {
  return (
    <PinnedMenu>
      <PinnedMenu.Section {...Mixed.args} />
      <PinnedMenu.Section {...Loading.args} />
      <PinnedMenu.Section {...Regular.args} />
    </PinnedMenu>
  );
};
