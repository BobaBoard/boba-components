import { DisplayStyle } from "board/BoardPreview";

import BoardsDisplay from "board/BoardsDisplay";
import React from "react";
import { action } from "@storybook/addon-actions";
import anime from "stories/images/anime.png";
import book from "stories/images/book.png";
import crack from "stories/images/crack.png";
import goreBackground from "stories/images/gore.png";
import meta from "stories/images/meta.png";
import villains from "stories/images/villains.png";

export default {
  title: "Board Display/ Boards Display",
  component: BoardsDisplay,
};

export const BoardsDisplayStory = () => (
  <div style={{ width: "500px" }}>
    <BoardsDisplay
      title="Boards"
      boards={[
        {
          slug: "gore",
          avatar: "/" + goreBackground,
          description: "Love me some bruised bois (and more).",
          color: "#f96680",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
        },
        {
          slug: "anime",
          avatar: "/" + anime,
          description: "We put the weeb in dweeb.",
          color: "#24d282",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
          updates: 2,
        },
        {
          slug: "crack",
          avatar: "/" + crack,
          description: "What's crackalackin",
          color: "#f9e066",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
          updates: 3,
        },
        {
          slug: "fic-club",
          avatar: "/" + book,
          description: "Come enjoy all the fics!",
          color: "#7724d2",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
          updates: 5,
          outdated: true,
        },
        {
          slug: "meta",
          avatar: "/" + meta,
          description: "In My TiMeS wE CaLlEd It WaNk",
          color: "#f9e066",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
        },
        {
          slug: "villain-thirst",
          avatar: "/" + villains,
          description: "Love to love 'em.",
          color: "#e22b4b",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
        },
      ]}
      boardsDisplayStyle={DisplayStyle.MINI}
    />
  </div>
);
BoardsDisplayStory.story = {
  name: "boards display",
};
