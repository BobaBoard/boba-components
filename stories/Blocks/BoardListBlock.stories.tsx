import type { Meta, StoryObj } from "@storybook/react";

import BoardListBlock, { BoardListBlockProps } from "blocks/BoardListBlock";
import React, { Fragment } from "react";
import { action } from "@storybook/addon-actions";
import anime from "stories/images/anime.png";
import book from "stories/images/book.png";
import crack from "stories/images/crack.png";
import goreBackground from "stories/images/gore.png";
import villains from "stories/images/villains.png";

const meta: Meta<typeof BoardListBlock> = {
  component: BoardListBlock,
};

export default meta;

type Story = StoryObj<typeof BoardListBlock>;

const boards = [
  {
    slug: "gore",
    avatar: `/${goreBackground}`,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
    link: {
      href: "#href",
      onClick: action("hrefClick"),
    },
  },
  {
    slug: "anime",
    avatar: `/${anime}`,
    description: "We put the weeb in dweeb.",
    color: "#24d282",
    link: {
      href: "#href",
      onClick: action("hrefClick"),
    },
  },
  {
    slug: "crack",
    avatar: `/${crack}`,
    description: "What's crackalackin",
    color: "#f9e066",
    link: {
      href: "#href",
      onClick: action("hrefClick"),
    },
  },
  {
    slug: "fic-club",
    avatar: `/${book}`,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    link: {
      href: "#href",
      onClick: action("hrefClick"),
    },
  },
  {
    slug: "villain-thirst",
    avatar: `/${villains}`,
    description: "Love to love 'em.",
    color: "#e22b4b",
    link: {
      href: "#href",
      onClick: action("hrefClick"),
    },
  },
];

export const Single: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <BoardListBlock selectedBoardSlug="" icon="" title="Boards">
        {boards.map((board) => (
          <BoardListBlock.Item slug={board.slug} key={board.slug}  />
        ))}
      </BoardListBlock>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <BoardListBlock selectedBoardSlug="" icon="" title="Boards">
        [<Fragment />]
      </BoardListBlock>
    </div>
  ),
};
