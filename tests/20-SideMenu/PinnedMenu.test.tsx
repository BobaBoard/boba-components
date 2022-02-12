import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/20-SideMenu/01-PinnedMenu.stories";

import { BasePinnedSectionProps, LoadingPinnedSectionProps, PinnedMenuSectionProps, WithPinnedSectionProps } from "sidemenu/PinnedMenu";
import {
  Screen,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import { BoardType } from "types";
import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "ts-jest/utils";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

const { Boards, Loading, Icons, MultipleSections } = composeStories(stories);

describe("Boards", () => {
  test("Renders section with boards", async () => {
    render(<Boards />);
  
    expect(screen.getByLabelText((Boards!.args! as BasePinnedSectionProps).sectionId!)).toBeVisible();

    const boards = screen.getAllByRole("link");
    expect(boards).toHaveLength((Boards.args as WithPinnedSectionProps).items.length);
    boards.forEach((board, i) => {
        expect(board).toHaveAccessibleName(expect.stringContaining(((Boards.args as WithPinnedSectionProps).items as BoardType[])[i].slug));
    });
  });

  test("Board menu items link to boards", async () => {
    render(<Boards />);
    const actionReturn = jest.fn();
    mocked(action).mockReturnValue(actionReturn);
    
    const boardLinks = screen.getAllByRole("link");
    for (const boardLink of boardLinks) {
      userEvent.click(boardLink);
      await waitFor(() => {
        expect(action).toBeCalledWith("#slug");
        expect(boardLink).toHaveAttribute("href", "#slug");
      });
    };
  });
  
  test("Correctly marks current board", async () => {
    render(<Boards />);
  
    const currentBoard = screen.getByRole("link", { current: "page" });
    expect(currentBoard).toHaveAccessibleName(expect.stringContaining("kink-memes"));
    const svgs = currentBoard.getElementsByTagName("svg");
    // In the real world it is possible to have the current board be muted, and if we changed the Story to have an example with both at once these length tests would break, but all these tests will break if we change the details of the story boards so I figure it's fine?
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveClass("fa-map-marker-alt");
    expect(svgs[0]).toBeVisible();
  });
  
  test("Correctly renders board without updates", async () => {
    render(<Boards />);
  
    const oncieBoard = screen.getByRole("link", { name: "oncie-den"}); 
    expect(within(oncieBoard).queryByRole("presentation", {hidden: true})).not.toBeInTheDocument();
    const svgs = oncieBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(0);
  });
  
  test("Correctly marks boards with updates", async () => {
    render(<Boards />);
  
    const goreBoard = screen.getByLabelText("gore has new updates");
    expect(within(goreBoard).getByRole("presentation", {hidden: true})).toBeVisible();
    expect(within(goreBoard).getByRole("presentation", {hidden: true})).toHaveClass("board-icon__update");
    const svgs = goreBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(0);
  });
  
  test("Correctly marks outdated boards with updates", async () => {
    render(<Boards />);
  
    const crackBoard = screen.getByLabelText("crack has updates");
    expect(within(crackBoard).getByRole("presentation", {hidden: true})).toBeVisible();
    expect(within(crackBoard).getByRole("presentation", {hidden: true})).toHaveClass("board-icon__update");
    const svgs = crackBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(0);
  });
  
  test("Correctly marks muted board", async () => {
    render(<Boards />);
  
    const mutedBoard = screen.getByLabelText("anime muted");
    expect(screen.queryByLabelText("anime has updates")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("anime has new updates")).not.toBeInTheDocument();
    expect(within(mutedBoard).queryByRole("presentation", {hidden: true})).not.toBeInTheDocument();
    const svgs = mutedBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveClass("fa-volume-mute");
    expect(svgs[0]).toBeVisible();
  });
});

describe("Loading", () => {
  test("Renders loading section", async () => {
    render(<Loading />);
  
    //TODO: fill this
  });
});

describe("Icons", () => {
  test("Renders section with icons", async () => {
    render(<Icons />);
  
    //TODO: fill this
  });
  
  test("Correctly marks icon with notification", async () => {
    render(<Icons />);
  
    //TODO: fill this
  });

  test("Correctly marks current icon", async () => {
    render(<Icons />);
  
    //TODO: fill this
  });

  test("Renders icon options dropdown", async () => {
    render(<Icons />);
  
    //TODO: fill this
  });
});

describe("Multiple Sections", () => {
  test("Renders sections in order", async () => {
    render(<MultipleSections />);
  
    //TODO: fill this
  });

  test("Doesn't render empty section", async () => {
    render(<MultipleSections />);
  
    //TODO: fill this
  });
});





