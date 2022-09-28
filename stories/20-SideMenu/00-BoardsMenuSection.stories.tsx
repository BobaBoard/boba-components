import BoardsMenuSection, {
  BoardsMenuSectionProps,
} from "sidemenu/BoardsMenuSection";
import { Meta, Story } from "@storybook/react";
import {
  faBatteryEmpty,
  faClock,
  faSpinner,
  faTh,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { action } from "@storybook/addon-actions";
import anime from "stories/images/anime.png";
import art from "stories/images/art-crit.png";
import book from "stories/images/book.png";
import crack from "stories/images/crack.png";
import goreBackground from "stories/images/gore.png";
import kinkmeme from "stories/images/kink-meme.png";
import meta from "stories/images/meta.png";
import oncelerBoard from "stories/images/onceler-board.png";
import villains from "stories/images/villains.png";

// Extra boards not currently being used
// const PINNED_BOARDS = [
//   {
//     slug: "gore",
//     muted: true,
//     avatar: "/" + goreBackground,
//     description: "Love me some bruised bois (and more).",
//     color: "#f96680",
//     link: { href: "#slug", onClick: action("#slug") },
//   },
//   {
//     slug: "anime",
//     avatar: "/" + anime,
//     description: "We put the weeb in dweeb.",
//     color: "#24d282",
//     updates: 2,
//     backgroundColor: "#131518",
//     link: { href: "#slug", onClick: action("#slug") },
//   },
//   {
//     slug: "crack",
//     avatar: "/" + crack,
//     description: "What's crackalackin",
//     color: "#f9e066",
//     updates: 3,
//     backgroundColor: "#131518",
//     link: { href: "#slug", onClick: action("#slug") },
//   },
//   {
//     slug: "fic-club",
//     avatar: "/" + book,
//     description: "Come enjoy all the fics!",
//     color: "#7724d2",
//     updates: 5,
//     backgroundColor: "#131518",
//     link: { href: "#slug", onClick: action("#slug") },
//   },
//   {
//     slug: "dasdjkasdjaklsdjaklsdjaslkdjaslkjdakldjalksjaslk",
//     avatar: "/" + meta,
//     description: "In My TiMeS wE CaLlEd It WaNk",
//     color: "#f9e066",
//     link: { href: "#slug", onClick: action("#slug") },
//   },
// ];
// const SEARCH_BOARDS = [
//   {
//     slug: "villain-thirst",
//     avatar: "/" + villains,
//     description: "Love to love 'em.",
//     color: "#e22b4b",
//     link: { href: "#slug", onClick: action("#slug") },
//   },
//   {
//     slug: "art-crit",
//     avatar: "/" + art,
//     description: "Let's learn together!",
//     color: "#27caba",
//     link: { href: "#slug", onClick: action("#slug") },
//   },
// ];
const GENERAL_BOARDS = [
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
  {
    slug: "anime",
    muted: true,
    avatar: "/" + anime,
    description: "We put the weeb in dweeb.",
    color: "#24d282",
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
];

export default {
  title: "Side Menu/BoardsMenuSection",
  component: BoardsMenuSection,
  decorators: [
    (Story) => (
      <div className="story">
        {Story()}
        <style jsx>{`
          .story {
            background-color: black;
            max-width: 500px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const BoardsMenuSectionTemplate: Story<BoardsMenuSectionProps> = (
  args: BoardsMenuSectionProps
) => {
  return <BoardsMenuSection {...args} />;
};

export const Regular = BoardsMenuSectionTemplate.bind({});
Regular.args = {
  boards: GENERAL_BOARDS,
  icon: faTh,
  title: "General boards",
  currentBoardSlug: "kink-memes",
};

export const Empty = BoardsMenuSectionTemplate.bind({});
Empty.args = {
  icon: faBatteryEmpty,
  title: "An empty section",
  emptyTitle: "There is nothing here!",
  emptyDescription:
    "This is as expected. Please continue along your journey, and may the odds be ever in your favor.",
};

export const Loading = BoardsMenuSectionTemplate.bind({});
Loading.args = {
  ...Empty.args,
  title: "A loading section",
  icon: faSpinner,
  loading: true,
  accentColor: "red",
  placeholdersCount: 4,
};
