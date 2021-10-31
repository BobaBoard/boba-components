import "@testing-library/jest-dom/extend-expect";

import * as stories from "../../stories/21-Sidebar/00-BoardSidebar.stories";

import {
  Screen,
  fireEvent,
  getByLabelText,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import { DescriptionType } from "types";
import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "ts-jest/utils";
import userEvent from "@testing-library/user-event";
import { v4 } from "uuid";

jest.mock("@storybook/addon-actions");
jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

const { RegularBoardSidebar, EditableBoardSidebar } = composeStories(stories);

const submitAndCheckValue = async (screen: Screen, valueMatcher: unknown) => {
  const actionReturn = jest.fn();
  mocked(action).mockReturnValue(actionReturn);
  fireEvent.click(screen.getByText("Save"));
  await waitFor(() => {
    expect(action).toBeCalledWith("save");
    expect(actionReturn).toBeCalledWith([valueMatcher]);
  });
};

const fillTextSection = async (
  screen: Screen,
  texts: { titleText: string; editorText: string }
) => {
  userEvent.type(screen.getByLabelText("Title"), texts.titleText);
  const editorContainer = document.querySelector(".ql-editor") as HTMLElement;
  userEvent.type(editorContainer, texts.editorText);
  await waitFor(() => {
    expect(screen.getByDisplayValue(texts.titleText)).toBeInTheDocument();
    expect(screen.getByText(texts.editorText)).toBeInTheDocument();
  });
};

const hasDescriptionMatcher = (
  description: Partial<DescriptionType>,
  options?: { matches: boolean }
) => {
  const matchingFunction = options?.matches ?? true ? expect : expect.not;
  return matchingFunction.objectContaining({
    descriptions: expect.arrayContaining([description]),
  });
};

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

    await submitAndCheckValue(
      screen,
      expect.objectContaining({
        tagline: expectedTagline,
      })
    );
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
    mocked(v4).mockReturnValue("this_is_a_uuid");

    // Add a text section
    fireEvent.click(screen.getByText("Add Text Section"));
    await waitFor(() => {
      expect(screen.getByLabelText("Title")).toBeInTheDocument();
    });

    // Fill the text section
    await fillTextSection(screen, {
      titleText: "A section title",
      editorText: "The editor content",
    });

    // Submits
    fireEvent.click(screen.getByText("Save"));

    // Try to submit. New section should be in the updated metadata.
    await submitAndCheckValue(
      screen,
      hasDescriptionMatcher({
        id: "this_is_a_uuid",
        index: 3,
        title: "A section title",
        type: "text",
        description: '[{"insert":"The editor content\\n"}]',
      })
    );
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

  test("Correctly undos add new section on back", async () => {
    render(<EditableBoardSidebar />);

    // Add a text section
    fireEvent.click(screen.getByText("Add Text Section"));
    await waitFor(() => {
      expect(screen.getByLabelText("Title")).toBeInTheDocument();
    });

    // Fill the text section
    await fillTextSection(screen, {
      titleText: "A section title",
      editorText: "The editor content",
    });

    // Go back
    fireEvent.click(screen.getByText("Back"));

    // Try to submit. New section should NOT be in the updated metadata.
    await submitAndCheckValue(
      screen,
      hasDescriptionMatcher(
        expect.objectContaining({
          title: "A section title",
        }),
        { matches: false }
      )
    );
  });
});
