import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/21-Sidebar/03-SectionsList.stories";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "jest-mock";

jest.mock("@storybook/addon-actions");

const { Regular } = composeStories(stories);

test("Displays correct section type", async () => {
  render(<Regular />);

  const tagsSection = screen.getByText("test1");
  expect(tagsSection.parentElement?.querySelector(".fa-tags")).not.toBeNull();

  const textSection = screen.getByText("test2");
  expect(textSection.parentElement?.querySelector(".fa-font")).not.toBeNull();
});

test("Displays sections in correct order", () => {
  // TODO: fill this
});

test("Selects section", async () => {
  render(<Regular />);

  const actionFunction = jest.fn();
  mocked(action).mockReturnValue(actionFunction);
  fireEvent.click(screen.getByText("test1"));

  await waitFor(() => {
    expect(action).toHaveBeenCalledWith("select");
    expect(actionFunction).toBeCalledWith(["test1"]);
  });
});

test("Adds text section", async () => {
  render(<Regular />);

  const actionFunction = jest.fn();
  mocked(action).mockReturnValue(actionFunction);
  fireEvent.click(screen.getByText("Add Text Section"));

  await waitFor(() => {
    expect(action).toHaveBeenCalledWith("add");
    expect(actionFunction).toBeCalledWith(["text"]);
  });
});

test("Adds filters section", async () => {
  render(<Regular />);

  const actionFunction = jest.fn();
  mocked(action).mockReturnValue(actionFunction);
  fireEvent.click(screen.getByText("Add Filters Section"));

  await waitFor(() => {
    expect(action).toHaveBeenCalledWith("add");
    expect(actionFunction).toBeCalledWith(["category_filter"]);
  });
});
