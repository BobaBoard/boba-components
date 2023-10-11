import type { Meta, StoryObj } from "@storybook/react";
import { faAngleRight, faThList } from "@fortawesome/free-solid-svg-icons";

import BoardListBlock from "blocks/BoardListBlock";
import React from "react";
import { action } from "@storybook/addon-actions";
import anime from "stories/images/anime.png";
import book from "stories/images/book.png";
import crack from "stories/images/crack.png";
import goreBackground from "stories/images/gore.png";
import kinkmeme from "stories/images/kink-meme.png";
import oncelerBoard from "stories/images/onceler-board.png";
import villains from "stories/images/villains.png";

const meta: Meta<typeof BoardListBlock> = {
  component: BoardListBlock,
};

export default meta;

type Story = StoryObj<typeof BoardListBlock>;

const BOARDS = [
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
    const [selectedBoard, setSelectedBoard] = React.useState<string | null>(
      null
    );

    return (
      <div>
        <BoardListBlock
          icon={faAngleRight}
          title="Boards"
          selectedBoardSlug={selectedBoard}
          onSelectBoard={(slug) => {
            action("select-board")(slug);
            setSelectedBoard(slug === selectedBoard ? null : slug);
          }}
          options={[]}
        >
          <BoardListBlock.Empty>
            <div>No boards here</div>
          </BoardListBlock.Empty>
          {BOARDS.map((board) => (
            <BoardListBlock.Item
              avatar={board.avatar}
              link={board.link}
              color={board.color}
              slug={board.slug}
              key={board.slug}
              description={board.description}
              options={[]}
              updates={board.updates}
              muted={board.muted}
              outdated={board.outdated}
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
        icon=""
        onSelectBoard={() => {
          throw new Error("Function not implemented.");
        }}
        options={[]}
      >
        <BoardListBlock.Empty>
          There are no boards to display.
        </BoardListBlock.Empty>
      </BoardListBlock>
    </div>
  ),
};

export const WithOptions: Story = {
  render: function Render({ options }) {
    const [selectedBoard, setSelectedBoard] = React.useState<string | null>(
      null
    );

    return (
      <div>
        <BoardListBlock
          icon={faThList}
          title="Boards with Options"
          selectedBoardSlug={selectedBoard}
          onSelectBoard={(slug) => {
            action("select-board")(slug);
            setSelectedBoard(slug === selectedBoard ? null : slug);
          }}
          options={options}
        >
          {BOARDS.map((board) => (
            <BoardListBlock.Item
              slug={board.slug}
              avatar={board.avatar}
              link={board.link}
              color={board.color}
              key={board.slug}
              description={board.description}
              options={options}
              updates={board.updates}
              muted={board.muted}
              outdated={board.outdated}
            />
          ))}
        </BoardListBlock>
      </div>
    );
  },
};

WithOptions.args = {
  options: [
    {
      name: "Pin board",
      link: {
        onClick: action("noHrefClick"),
      },
    },
    {
      name: "Mute board",
      link: {
        onClick: action("noHrefClick"),
      },
    },
    {
      name: "Dismiss notifications",
      link: {
        onClick: action("noHrefClick"),
      },
    },
  ],
};
