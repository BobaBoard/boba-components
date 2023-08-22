import PinnedMenu, { PinnedMenuSectionProps } from "sidemenu/PinnedMenu";
import { Story, StoryFn } from "@storybook/react";
import {
  faHeart,
  faInbox,
  faRssSquare,
  faStar,
  faThumbtack,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { action } from "@storybook/addon-actions";
import anime from "stories/images/anime.png";
import book from "stories/images/book.png";
import crack from "stories/images/crack.png";
import goreBackground from "stories/images/gore.png";
import kinkmeme from "stories/images/kink-meme.png";
import mamoru from "stories/images/mamoru.png";
import meta from "stories/images/meta.png";
import oncelerBoard from "stories/images/onceler-board.png";

const PINNED_BOARDS = [
  {
    slug: "gore",
    muted: true,
    avatar: `/${goreBackground}`,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "anime",
    avatar: `/${anime}`,
    description: "We put the weeb in dweeb.",
    color: "#24d282",
    updates: 2,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "crack",
    avatar: `/${crack}`,
    description: "What's crackalackin",
    color: "#f9e066",
    updates: 3,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "fic-club",
    avatar: `/${book}`,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "dasdjkasdjaklsdjaklsdjaslkdjaslkjdakldjalksjaslk",
    avatar: `/${meta}`,
    description: "In My TiMeS wE CaLlEd It WaNk",
    color: "#f9e066",
    link: { href: "#slug", onClick: action("#slug") },
  },
];
const RECENT_BOARDS = [
  {
    slug: "gore",
    avatar: `/${goreBackground}`,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "oncie-den",
    avatar: `/${oncelerBoard}`,
    description: "Party like it's 2012",
    color: "#27caba",
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "a-super-long-slug-because-we-need-to-test-for-overflow",
    avatar: `/${book}`,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "kink-memes",
    avatar: `/${kinkmeme}`,
    description: "No limits. No shame.",
    color: "#000000",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "crack",
    avatar: `/${crack}`,
    description: "What's crackalackin",
    color: "#f9e066",
    updates: 3,
    outdated: true,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "anime",
    muted: true,
    avatar: `/${anime}`,
    description: "We put the weeb in dweeb.",
    color: "#24d282",
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
];

export default {
  title: "Side Menu/Pinned Menu",
  component: PinnedMenu,
};

const PinnedSectionTemplate: StoryFn = (args: PinnedMenuSectionProps) => (
  <PinnedMenu>
    <PinnedMenu.Section {...args} />
  </PinnedMenu>
);

export const Boards = PinnedSectionTemplate.bind({});
Boards.args = {
  icon: faThumbtack,
  sectionId: "pinned boards",
  items: RECENT_BOARDS,
  currentItemId: "kink-memes",
};

export const Loading = PinnedSectionTemplate.bind({});
Loading.args = {
  icon: faUpload,
  sectionId: "waiting",
  loading: true,
  loadingElementsCount: 7,
  loadingAccentColor: "green",
};

export const Icons = PinnedSectionTemplate.bind({});
Icons.args = {
  icon: faRssSquare,
  sectionId: "feeds",
  items: [
    {
      id: "star",
      icon: { icon: faStar },
      accentColor: "red",
      link: { href: "#star", onClick: action("#star") },
    },
    {
      id: "inbox",
      icon: { icon: faInbox },
      accentColor: "red",
      withNotification: {},
      link: { href: "#inbox", onClick: action("#inbox") },
    },
    {
      id: "user options",
      icon: { icon: mamoru },
      accentColor: "red",
      menuOptions: [
        {
          name: "Option 1",
          link: { onClick: action("userOption1") },
        },
        {
          name: "Option 2",
          link: { onClick: action("userOption2") },
        },
      ],
    },
    {
      id: "heart",
      icon: { icon: faHeart },
      accentColor: "red",
      link: { href: "#heart", onClick: action("#heart") },
    },
  ],
  currentItemId: "star",
};

export const Mixed = PinnedSectionTemplate.bind({});
Mixed.args = {
  icon: faRssSquare,
  sectionId: "mixed",
  items: [
    {
      id: "star",
      icon: { icon: faStar },
      accentColor: "red",
    },
    PINNED_BOARDS[0],
    {
      id: "user options",
      icon: { icon: mamoru },
      accentColor: "red",
      menuOptions: [
        {
          name: "Option 1",
          link: { href: "#opt1", onClick: action("#opt1") },
        },
        {
          name: "Option 2",
          link: { href: "#opt2", onClick: action("#opt2") },
        },
      ],
    },
    PINNED_BOARDS[2],
    { id: "heart", icon: { icon: faHeart }, accentColor: "red" },
  ],
  currentItemId: "star",
};

const MultipleSectionsTemplate: Story<{
  items: PinnedMenuSectionProps[];
  args: typeof PinnedMenu;
}> = ({ items, args }) => (
  <PinnedMenu {...args}>
    {items.map((item, index) => (
      <PinnedMenu.Section key={index} {...item} />
    ))}
  </PinnedMenu>
);
export const MultipleSections = MultipleSectionsTemplate.bind({});
MultipleSections.args = {
  // @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747)
  items: [Mixed.args, Loading.args, Boards.args],
};
