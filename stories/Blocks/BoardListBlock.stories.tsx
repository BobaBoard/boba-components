import type { Meta, StoryObj } from "@storybook/react";
import { faAngleRight, faThList } from "@fortawesome/free-solid-svg-icons";
import { userEvent, waitFor, within } from "@storybook/testing-library";

import BoardListBlock from "blocks/BoardListBlock";
import { DropdownProps } from "common/DropdownListMenu";
import { GetProps } from "utils/compound-utils";
import React from "react";
import { action } from "@storybook/addon-actions";
import anime from "stories/images/anime.png";
import book from "stories/images/book.png";
import crack from "stories/images/crack.png";
import { expect } from "@storybook/jest";
import goreBackground from "stories/images/gore.png";
import kinkmeme from "stories/images/kink-meme.png";
import oncelerBoard from "stories/images/onceler-board.png";
import villains from "stories/images/villains.png";

const meta: Meta<typeof BoardListBlock> = {
  component: BoardListBlock,
};

export default meta;

const BOARDS = [
  {
    slug: "gore",
    avatar: `/${goreBackground}`,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
    link: { href: "#slug", onClick: action("#slug") },
    updates: true,
    pinned: true,
  },
  {
    slug: "oncie-den",
    avatar: `/${oncelerBoard}`,
    description: "Party like it's 2012",
    color: "#27caba",
    link: { href: "#slug", onClick: action("#slug") },
    pinned: false,
    muted: true,
  },
  {
    slug: "a-super-long-slug-because-we-need-to-test-for-overflow",
    avatar: `/${book}`,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    link: { href: "#slug", onClick: action("#slug") },
    updates: true,
  },
  {
    slug: "kink-memes",
    avatar: `/${kinkmeme}`,
    description: "No limits. No shame.",
    color: "#000000",
    link: { href: "#slug", onClick: action("#slug") },
    updates: true,
    pinned: true,
  },
  {
    slug: "crack",
    avatar: `/${crack}`,
    description: "What's crackalackin",
    color: "#f9e066",
    link: { href: "#slug", onClick: action("#slug") },
    updates: true,
    outdated: true,
  },
  {
    slug: "anime",
    avatar: `/${anime}`,
    description: "We put the weeb in dweeb.",
    color: "#24d282",
    link: { href: "#slug", onClick: action("#slug") },
    muted: true,
  },
  {
    slug: "villain-thirst",
    avatar: `/${villains}`,
    description: "Love to love 'em.",
    color: "#e22b4b",
    link: { href: "#slug", onClick: action("#slug") },
    updates: true,
    outdated: true,
  },
];

type StoryArgs = { boards: typeof BOARDS } & GetProps<typeof BoardListBlock> & {
    options: DropdownProps["options"];
  };
type Story = StoryObj<StoryArgs>;

const StoryTemplate: Story = {
  render: function Render({ title, boards, options }) {
    const [selectedBoard, setSelectedBoard] = React.useState<string | null>(
      null
    );

    return (
      <div>
        <BoardListBlock
          icon={faAngleRight}
          title={title}
          selectedBoardSlug={selectedBoard}
          onSelectBoard={(slug) => {
            action("select-board")(slug);
            setSelectedBoard(slug === selectedBoard ? null : slug);
          }}
          onPinBoard={(slug) => {
            action("pin-board")(slug);
          }}
          onMuteBoard={(slug) => {
            action("mute-board")(slug);
          }}
        >
          <BoardListBlock.Empty>
            <div>No boards here</div>
          </BoardListBlock.Empty>
          {boards.map((board) => (
            <BoardListBlock.Item
              {...board}
              key={board.slug}
              options={options}
            />
          ))}
        </BoardListBlock>
      </div>
    );
  },
};

export const Simple: Story = {
  ...StoryTemplate,
};
Simple.args = {
  boards: BOARDS,
  title: "Boards test",
  options: [],
};

export const Empty: Story = { ...StoryTemplate };
Empty.args = {
  title: "This is empty",
  boards: [],
};

export const WithOptions = { ...StoryTemplate };
WithOptions.args = {
  ...Simple.args,
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
