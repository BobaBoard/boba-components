import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/20-SideMenu/00-BoardsMenuSection.stories";

import {
  BoardsSectionProps,
  EmptySectionProps,
  LoadingSectionProps,
} from "sidemenu/BoardsMenuSection";
import { render, screen, waitFor, within } from "@testing-library/react";

import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "jest-mock";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

const { Regular, Empty, Loading } = composeStories(stories);

describe("Regular", () => {
  test("Renders section with board menu items", async () => {
    render(<Regular />);

    expect(screen.getByText(Regular!.args!.title!)).toBeVisible();

    const boards = screen.getAllByRole("link");
    expect(boards).toHaveLength(
      (Regular.args as BoardsSectionProps).boards!.length
    );
    boards.forEach((board, i) => {
      expect(board).toHaveTextContent(
        `!${(Regular.args as BoardsSectionProps).boards[i].slug}`
      );
    });
  });

  test("Board menu items link to boards", async () => {
    render(<Regular />);
    const actionReturn = jest.fn();
    mocked(action).mockReturnValue(actionReturn);

    const boardLinks = screen.getAllByRole("link");
    for (const boardLink of boardLinks) {
      userEvent.click(boardLink);
      await waitFor(() => {
        expect(action).toBeCalledWith("#slug");
        expect(boardLink).toHaveAttribute("href", "#slug");
      });
    }
  });

  test("Correctly renders board without updates", async () => {
    render(<Regular />);

    const oncieBoard = screen.getByRole("link", { name: "oncie-den" });
    expect(oncieBoard).toHaveTextContent("!oncie-den");
    expect(
      within(oncieBoard).queryByRole("presentation", { hidden: true })
    ).not.toBeInTheDocument();
    const svgs = oncieBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveClass("fa-map-marker-alt");
    expect(svgs[0]).not.toBeVisible();
  });

  test("Correctly marks boards with updates", async () => {
    render(<Regular />);

    const goreBoard = screen.getByLabelText("gore has new updates");
    expect(goreBoard).toHaveTextContent("!gore");
    expect(
      within(goreBoard).getByRole("presentation", { hidden: true })
    ).toBeVisible();
    expect(
      within(goreBoard).getByRole("presentation", { hidden: true })
    ).toHaveClass("board-icon__update");
    const svgs = goreBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveClass("fa-map-marker-alt");
    expect(svgs[0]).not.toBeVisible();
  });

  test("Correctly marks outdated boards with updates", async () => {
    render(<Regular />);

    const crackBoard = screen.getByLabelText("crack has updates");
    expect(crackBoard).toHaveTextContent("!crack");
    expect(
      within(crackBoard).getByRole("presentation", { hidden: true })
    ).toBeVisible();
    expect(
      within(crackBoard).getByRole("presentation", { hidden: true })
    ).toHaveClass("board-icon__update");
    const svgs = crackBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveClass("fa-map-marker-alt");
    expect(svgs[0]).not.toBeVisible();
  });

  test("Correctly marks current board", async () => {
    render(<Regular />);

    const currentBoard = screen.getByRole("link", { current: "page" });
    expect(currentBoard).toHaveTextContent("!kink-memes");
    const svgs = currentBoard.getElementsByTagName("svg");
    //In the real world it is possible to have the current board be muted, and if we changed the Story to have an example with both at once these length tests would break, but all these tests will break if we change the details of the story boards so I figure it's fine?
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveClass("fa-map-marker-alt");
    expect(svgs[0]).toBeVisible();
  });

  test("Correctly marks muted board", async () => {
    render(<Regular />);

    const mutedBoard = screen.getByLabelText("anime muted");
    expect(mutedBoard).toHaveTextContent("!anime");
    expect(
      screen.queryByLabelText("anime has updates")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("anime has new updates")
    ).not.toBeInTheDocument();
    expect(
      within(mutedBoard).queryByRole("presentation", { hidden: true })
    ).not.toBeInTheDocument();
    const svgs = mutedBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(2);
    expect(svgs[0]).toHaveClass("fa-volume-mute");
    expect(svgs[0]).toBeVisible();
    expect(svgs[1]).toHaveClass("fa-map-marker-alt");
    expect(svgs[1]).not.toBeVisible();
  });
});

describe("Empty", () => {
  test("Renders empty section", async () => {
    render(<Empty />);

    expect(
      screen.getByText((Empty.args as EmptySectionProps).title)
    ).toBeVisible();
    expect(
      screen.getByText((Empty.args as EmptySectionProps).emptyTitle)
    ).toBeVisible();
    expect(
      screen.getByText((Empty.args as EmptySectionProps).emptyDescription)
    ).toBeVisible();
  });
});

describe("Loading", () => {
  test("Renders loading section", async () => {
    render(<Loading />);

    expect(
      screen.getByText((Loading.args as LoadingSectionProps).title)
    ).toBeVisible();
    expect(screen.getAllByLabelText("board is loading")).toHaveLength(
      (Loading.args as LoadingSectionProps).placeholdersCount
    );
  });
});
