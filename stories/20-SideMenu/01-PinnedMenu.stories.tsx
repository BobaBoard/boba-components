import React from "react";
import PinnedMenu, {
  PinnedMenuSectionProps,
} from "../../src/sidemenu/PinnedMenu";

import {
  faHeart,
  faInbox,
  faRssSquare,
  faStar,
  faThumbtack,
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
import { Story } from "@storybook/react";

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

const PinnedSectionTemplate: Story<PinnedMenuSectionProps> = (args) => {
  return (
    <PinnedMenu>
      <PinnedMenu.Section {...args} />
    </PinnedMenu>
  );
};

export const Boards = PinnedSectionTemplate.bind({});
Boards.args = {
  icon: faThumbtack,
  items: RECENT_BOARDS,
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
      id: "inbox",
      icon: faInbox,
      accentColor: "red",
      withNotification: true,
    },
    { id: "image", icon: mamoru, accentColor: "red", withDropdown: true },
    {
      id: "heart",
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
    { id: "image", icon: mamoru, accentColor: "red", withDropdown: true },
    PINNED_BOARDS[2],
    { id: "heart", icon: faHeart, accentColor: "red" },
  ],
  currentItemId: "star",
};

const MultipleSectionsTemplate: Story<{
  items: PinnedMenuSectionProps[];
  args: typeof PinnedMenu;
}> = ({ items, args }) => {
  return (
    <PinnedMenu {...args}>
      {items.map((item, index) => (
        <PinnedMenu.Section key={index} {...item} />
      ))}
    </PinnedMenu>
  );
};
export const MultipleSections = MultipleSectionsTemplate.bind({});
MultipleSections.args = {
  // @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747)
  items: [Mixed.args, Loading.args, Boards.args],
};
