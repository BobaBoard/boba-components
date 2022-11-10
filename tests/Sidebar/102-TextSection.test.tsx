import "@testing-library/jest-dom/extend-expect";

import * as textStories from "stories/Sidebar/102-TextSection.stories";

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import React from "react";
import { composeStories } from "@storybook/testing-react";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

const { Regular, Editable, EmptyEditable } = composeStories(textStories);

test("Renders text", async () => {
  render(<Regular />);

  expect(screen.getByText("Hello!")).toBeInTheDocument();
});

test("Renders text in edit mode", async () => {
  render(<Editable />);

  expect(screen.getByText("Hello!")).toBeInTheDocument();
});

test("Allows updating text in edit mode", async () => {
  // Unfortunately the editor doesn't seem to accept text input unless it's empty,
  // so for this we render a story without initial description.

  render(<EmptyEditable />);

  const editorContainer = document.querySelector(".ql-editor") as HTMLElement;
  expect(editorContainer).toBeInTheDocument();

  fireEvent.click(editorContainer);
  userEvent.type(editorContainer!, "bar");

  await waitFor(
    () => {
      expect(within(editorContainer).getByText("bar")).toBeInTheDocument();
    },
    {
      timeout: 5000,
    }
  );
});
