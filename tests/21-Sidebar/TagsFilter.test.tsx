import "@testing-library/jest-dom/extend-expect";

import * as tagStories from "stories/21-Sidebar/01-TagsSection.stories";

import {
  fireEvent,
  prettyDOM,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import { FilteredTagsState } from "tags/TagsFilter";
import React from "react";
import { TagMatcher } from "../utils/matchers";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "jest-mock";
import { suppressConsoleErrors } from "../utils/testUtils";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

// TODO: get rid of this error.
suppressConsoleErrors(["Warning: validateDOMNesting(...)"]);

const { Regular, Editable, Inactive } = composeStories(tagStories);

describe("Regular", () => {
  test("Renders content notices", () => {
    render(<Regular />);

    const tagsDisplayText = Regular.args!.tags!.map((tag) => `cn:${tag.name}`);
    tagsDisplayText.forEach((tagText) => {
      expect(screen.getByText(TagMatcher(tagText))).toBeInTheDocument();
    });
  });

  test("Renders uncategorized", () => {
    render(<Regular />);

    expect(
      screen.getByText(TagMatcher(`cn:uncategorized`))
    ).toBeInTheDocument();
  });

  test("Triggers tag status change", async () => {
    render(<Regular />);

    const actionReturn = jest.fn();
    mocked(action).mockReturnValue(actionReturn);
    fireEvent.click(screen.getByText(TagMatcher(`cn:test4`)));
    await waitFor(() => {
      expect(action).toBeCalledWith("tagChange");
      expect(actionReturn).toBeCalledWith(["test4"]);
    });
  });

  test("Triggers uncategorized click", async () => {
    render(<Regular />);

    const disableActionReturn = jest.fn();
    mocked(action).mockReturnValue(disableActionReturn);
    fireEvent.click(screen.getByText(TagMatcher(`cn:uncategorized`)));
    await waitFor(() => {
      expect(action).toHaveBeenCalledWith("tagChange");
      expect(disableActionReturn).toBeCalledWith([FilteredTagsState.DISABLED]);
    });
  });

  test("Does not display delete button in non-editable mode", async () => {
    render(<Regular />);

    const tag = screen.getByText(TagMatcher(`cn:test4`));
    const deleteButton = within(tag).queryByLabelText("delete tag");

    expect(deleteButton).not.toBeInTheDocument();
  });
});

describe("Inactive", () => {
  test("Renders active tag", () => {
    render(<Inactive />);

    const activeTag = screen.getByText(TagMatcher(`cn:active8`));
    expect(activeTag.getAttribute("aria-checked")).toBe("true");
    expect(activeTag).not.toHaveStyle(`opacity: 0.7`);
  });

  test("Renders inactive tag", () => {
    render(<Inactive />);

    const inactiveTag = screen.getByText(TagMatcher(`cn:disabled6`));
    expect(inactiveTag.getAttribute("aria-checked")).toBe("false");
    expect(inactiveTag).toHaveStyle(`opacity: 0.7`);
  });

  test("Renders inactive uncategorized", () => {
    render(<Inactive />);

    const uncategorizedTag = screen.getByText(TagMatcher(`cn:uncategorized`));
    expect(uncategorizedTag.getAttribute("aria-checked")).toBe("false");
    expect(uncategorizedTag).toHaveStyle(`opacity: 0.7`);
  });

  test("Triggers uncategorized click", async () => {
    render(<Inactive />);

    const disableActionReturn = jest.fn();
    mocked(action).mockReturnValue(disableActionReturn);
    fireEvent.click(screen.getByText(TagMatcher(`cn:uncategorized`)));
    await waitFor(() => {
      expect(action).toHaveBeenCalledWith("tagChange");
      expect(disableActionReturn).toBeCalledWith([FilteredTagsState.ACTIVE]);
    });
  });
});

describe("Editable", () => {
  test("Displays tags", async () => {
    render(<Editable />);

    const tagsDisplayText = Editable.args?.tags?.map((tag) => `cn:${tag.name}`);

    // TODO: maybe add a checkbox for this
    tagsDisplayText?.forEach((tagText) => {
      expect(screen.getByText(TagMatcher(tagText))).toBeInTheDocument();
    });
  });

  test("Triggers remove tag", async () => {
    render(<Editable />);

    const tag = screen.getByText(TagMatcher(`cn:test4`));
    const deleteButton = within(tag).getByLabelText("delete tag");

    const removeTagMethod = jest.fn();
    mocked(action).mockReturnValue(removeTagMethod);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(action).toHaveBeenCalledWith("tagChange");
      expect(removeTagMethod).toBeCalledWith([
        Editable.args?.tags
          ?.filter((tag) => tag.name != "test4")
          .map((tag) => ({ name: tag.name })),
      ]);
    });
  });

  test("Triggers add new tag", async () => {
    render(<Editable />);

    const addNewTag = screen.getByLabelText("Add new tag");

    userEvent.type(addNewTag!, "bar");
    const addTagMethod = jest.fn();
    mocked(action).mockReturnValue(addTagMethod);
    fireEvent.click(screen.getByLabelText("Add tag button"));

    await waitFor(() => {
      expect(action).toHaveBeenCalledWith("tagChange");
      expect(addTagMethod).toBeCalledWith([
        [
          ...Editable.args!.tags!.map((tag) => ({ name: tag.name })),
          { name: "bar" },
        ],
      ]);
    });
  });

  test("Does not trigger add new tag on empty input", async () => {
    render(<Editable />);

    // TODO: fill this
  });

  test("Removes prefix if added before tag", async () => {
    render(<Editable />);

    // TODO: fill this
  });
});
