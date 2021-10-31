import "@testing-library/jest-dom/extend-expect";

import * as stories from "../../stories/21-Sidebar/00-BoardSidebar.stories";

import {
  fireEvent,
  getByLabelText,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "ts-jest/utils";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

const { RegularBoardSidebar, EditableBoardSidebar } = composeStories(stories);

describe("Regular", () => {
  test("Renders board options", async () => {
    render(<RegularBoardSidebar />);
    const actionReturn = jest.fn();
    mocked(action).mockReturnValue(actionReturn);
    fireEvent.click(screen.getByLabelText("Board options"));
    await waitFor(() => {
      expect(screen.getByText("opt2")).toBeVisible();
    });
    fireEvent.click(screen.getByText("opt2"));
    await waitFor(() => {
      expect(action).toBeCalledWith("boardOption2");
    });
  });

  test("Renders sections in order", async () => {
    render(<RegularBoardSidebar />);
    const sections = document.getElementsByTagName("section");
    expect(sections.length).toBe(2);

    expect(
      within(sections[0]).getByText(
        RegularBoardSidebar.args!.sidebarSections!.find(
          (description) => description.index == 1
        )!.title
      )
    );
    expect(
      within(sections[1]).getByText(
        RegularBoardSidebar.args!.sidebarSections!.find(
          (description) => description.index == 2
        )!.title
      )
    );
  });
});

describe("Editable", () => {
  test("Triggers stop editing on back", async () => {
    render(<EditableBoardSidebar />);
    const actionReturn = jest.fn();
    mocked(action).mockReturnValue(actionReturn);
    fireEvent.click(screen.getByText("Back"));
    await waitFor(() => {
      expect(action).toBeCalledWith("cancel");
    });
  });

  test("Saves updated tagline", async () => {
    render(<EditableBoardSidebar />);
    const taglineInput = screen.getByLabelText("Tagline") as HTMLInputElement;
    userEvent.type(taglineInput, "bar");
    const expectedTagline = EditableBoardSidebar.args!.tagline + "bar";
    await waitFor(() => {
      expect(taglineInput.value).toBe(expectedTagline);
    });

    const actionReturn = jest.fn();
    mocked(action).mockReturnValue(actionReturn);
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(action).toBeCalledWith("save");
      expect(actionReturn).toBeCalledWith([
        expect.objectContaining({
          tagline: expectedTagline,
        }),
      ]);
    });
  });

  test("Saves updated color", async () => {
    render(<EditableBoardSidebar />);

    // TODO: fill this
  });

  test("Correctly edits text section", async () => {
    render(<EditableBoardSidebar />);

    // TODO: fill this
  });

  test("Correctly edits content notices section", async () => {
    render(<EditableBoardSidebar />);

    // TODO: fill this
  });

  test("Correctly adds text section", async () => {
    render(<EditableBoardSidebar />);

    // TODO: fill this
  });

  test("Correctly adds filters section", async () => {
    render(<EditableBoardSidebar />);

    // TODO: fill this
  });

  test("Correctly deletes existing section", async () => {
    render(<EditableBoardSidebar />);

    // TODO: fill this
  });

  test("Correctly deletes newly-added section", async () => {
    render(<EditableBoardSidebar />);

    // TODO: fill this
  });

  test("Correctly undos section edits on back", async () => {
    render(<EditableBoardSidebar />);

    // TODO: fill this
  });
});
