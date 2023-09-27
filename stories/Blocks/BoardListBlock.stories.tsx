import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import BoardListBlock from "blocks/BoardListBlock";
import React from "react";
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

export const Simple: Story = {
  render: function Render() {
    const [selectedBoard, setSelectedBoard] = React.useState("");

    return (
      <div style={{ width: "500px" }}>
        <BoardListBlock
          icon=""
          title="Boards"
          selectedBoardSlug={selectedBoard}
          onSelectBoard={(slug) => {
            action("select-board")(slug);
            if (slug === selectedBoard) {
              setSelectedBoard("")
            } else {
              setSelectedBoard(slug);
            }
            
          }}
        >
          <BoardListBlock.Empty>
            <div>No boards here</div>
          </BoardListBlock.Empty>
          {boards.map((board) => (
            <BoardListBlock.Item
              slug={board.slug}
              key={board.slug}
              description={board.description}
            />
          ))}
        </BoardListBlock>
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <BoardListBlock
        onSelectBoard={() => {
          throw new Error("Function not implemented.");
        }}
      >
        <BoardListBlock.Empty>There are no boards to display.</BoardListBlock.Empty>
      </BoardListBlock>
    </div>
  ),
};
