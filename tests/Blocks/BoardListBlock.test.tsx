import "@testing-library/jest-dom/extend-expect";

import * as boardListBlockStories from "stories/Blocks/BoardListBlock.stories";

import { render, screen } from "@testing-library/react";
import React from "react";

import { action } from "@storybook/addon-actions";
import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";

jest.mock("@storybook/addon-actions");

const { Simple } = composeStories(boardListBlockStories);

// 1) clicking the board icon takes you to the board

describe("When a board icon is clicked", () => {
  render(<Simple />);
  const boardToClick = Simple.args!.boards![2];
  const boardIcon = screen.getByRole("link", {
    name: `${boardToClick.slug} icon`,
  });

  it("takes you to the board", async () => {
    await userEvent.click(boardIcon);
    expect(boardIcon).toHaveAttribute("href", "#slug");
    expect(action).toHaveBeenCalledWith("#slug");
  });
});

describe("when a board name is clicked", () => {
  beforeEach(() => {
    render(<Simple />);
  });

  // clicking the board item opens a drawer
  it("shows a detailed description of it", async () => {
    const boardToClick = Simple.args!.boards![2];
    const boardLink = screen.getByRole("button", {
      name: `!${boardToClick.slug}`,
    });
    expect(
      screen.queryByText(boardToClick.description)
    ).not.toBeInTheDocument();
    await userEvent.click(boardLink);
    expect(screen.getByText(boardToClick.description)).toBeInTheDocument();
  });

  // 3) clicking on the "go to board" button triggers the right action
  it("displays a link that takes you to the board", async () => {
    const boardToClick = Simple.args!.boards![2];
    const boardLink = screen.getByRole("button", {
      name: `!${boardToClick.slug}`,
    });

    await userEvent.click(boardLink);
    const goToBoardLink = screen.getByText("Go to Board", {
      selector: "a",
    });
    await userEvent.click(goToBoardLink);
    expect(goToBoardLink).toHaveAttribute("href", "#slug");
    expect(action).toHaveBeenCalledWith("#slug");
  });

  // 4) clicking on the "mute/unmute button" triggers the right action

  it("displays a toggle that mutes/unmutes the board", async () => {
    const boardToClick = Simple.args!.boards![1];
    const boardLink = screen.getByRole("button", {
      name: `!${boardToClick.slug}`,
    });

    await userEvent.click(boardLink);

    const muteButton = screen.getByRole("button", {
      name: /mute board/i,
    });
    await userEvent.click(muteButton);
    expect(action("mute-board")).toHaveBeenCalledWith(boardToClick.slug);
  });

  // 5) clicking on the "pin/unpin button" triggers the right action

  it("displays a toggle that pins/unpins the board", async () => {
    const boardToClick = Simple.args!.boards![1];
    const boardLink = screen.getByRole("button", {
      name: `!${boardToClick.slug}`,
    });

    await userEvent.click(boardLink);

    const pinButton = screen.getByRole("button", {
      name: /pin board/i,
    });
    await userEvent.click(pinButton);
    expect(action("pin-board")).toHaveBeenCalledWith(boardToClick.slug);
  });
});
