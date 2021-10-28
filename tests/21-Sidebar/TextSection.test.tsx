import "@testing-library/jest-dom/extend-expect";

import * as textStories from "../../stories/21-Sidebar/02-TextSection.stories";

import {
  fireEvent,
  prettyDOM,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "ts-jest/utils";
import { suppressConsoleErrors } from "../utils/testUtils";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

const { Regular, Editable, EmptyEditable } = composeStories(textStories);

// TODO: remove this once we have time to figure out why there is an error
// on act that makes our console logs terrible.
suppressConsoleErrors(["Warning: It looks like you're using the wrong act()"]);

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

// test("Triggers tag status change", async () => {
//   render(<Regular />);

//   const actionReturn = jest.fn();
//   mocked(action).mockReturnValue(actionReturn);
//   fireEvent.click(screen.getByText(TagMatcher(`cn:test4`)));
//   await waitFor(() => {
//     expect(action).toBeCalledWith("tagChange");
//     expect(actionReturn).toBeCalledWith(["test4"]);
//   });
// });

// test("Triggers uncategorized click", async () => {
//   render(<Regular />);

//   const disableActionReturn = jest.fn();
//   mocked(action).mockReturnValue(disableActionReturn);
//   fireEvent.click(screen.getByText(TagMatcher(`cn:uncategorized`)));
//   await waitFor(() => {
//     expect(action).toHaveBeenCalledWith("tagChange");
//     expect(disableActionReturn).toBeCalledWith([false]);
//   });
// });

// test("Shows clear filter", async () => {
//   render(<Regular />);

//   const disableActionReturn = jest.fn();
//   mocked(action).mockReturnValue(disableActionReturn);
//   fireEvent.click(screen.getByText(TagMatcher(`cn:uncategorized`)));
//   await waitFor(() => {
//     expect(action).toHaveBeenCalledWith("tagChange");
//     expect(disableActionReturn).toBeCalledWith([false]);
//   });
// });

// test("Does not display delete button in non-editable mode", async () => {
//   render(<Regular />);

//   const tag = screen.getByText(TagMatcher(`cn:test4`));
//   const deleteButton = within(tag).queryByLabelText("delete tag");

//   expect(deleteButton).not.toBeInTheDocument();
// });

// test("Editable shows tags", async () => {
//   render(<Editable />);

//   const tagsDisplayText = Editable.args.tags.map((tag) => `cn:${tag}`);

//   // TODO: maybe add a checkbox for this
//   tagsDisplayText.forEach((tagText) => {
//     expect(screen.getByText(TagMatcher(tagText))).toBeInTheDocument();
//   });
// });

// test("Editable remove tag", async () => {
//   render(<Editable />);

//   const tag = screen.getByText(TagMatcher(`cn:test4`));
//   const deleteButton = within(tag).getByLabelText("delete tag");

//   const removeTagMethod = jest.fn();
//   mocked(action).mockReturnValue(removeTagMethod);
//   fireEvent.click(deleteButton);

//   await waitFor(() => {
//     expect(action).toHaveBeenCalledWith("tagChange");
//     expect(removeTagMethod).toBeCalledWith([
//       Editable.args.tags
//         .filter((tag) => tag != "test4")
//         .map((tag) => ({ name: tag, state: 0 })),
//     ]);
//   });
// });

// test("Editable add new tag", async () => {
//   render(<Editable />);

//   const addNewTag = screen.getByLabelText("Add new tag");

//   userEvent.type(addNewTag!, "bar");
//   const addTagMethod = jest.fn();
//   mocked(action).mockReturnValue(addTagMethod);
//   fireEvent.click(screen.getByLabelText("Add tag button"));

//   await waitFor(() => {
//     const existingTags = Editable.args.tags.map((tag) => ({
//       name: tag,
//       state: 0,
//     }));
//     existingTags.push({ name: "bar" });
//     expect(action).toHaveBeenCalledWith("tagChange");
//     expect(addTagMethod).toBeCalledWith([existingTags]);
//   });
// });
