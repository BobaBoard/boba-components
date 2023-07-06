import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/SideMenu/100-SideMenu.stories";

import {
  BoardsSectionProps,
  EmptySectionProps,
  LoadingSectionProps,
} from "sidemenu/BoardsMenuSection";
import {
  Empty,
  Loading,
  Regular,
} from "stories/SideMenu/101-BoardsMenuSection.stories";
import { render, screen, waitFor, within } from "@testing-library/react";

import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

const { SideMenuPreview } = composeStories(stories);

test("Renders boards menu", async () => {
  render(<SideMenuPreview />);

  // TODO: this should be done without tag name
  const sections = document.getElementsByTagName("section");
  expect(sections).toHaveLength(5);

  expect(within(sections[0]).getByText("Recent boards")).toBeVisible();
  expect(within(sections[0]).getAllByRole("link")).toHaveLength(4);

  expect(within(sections[1]).getByText("Fandom boards")).toBeVisible();
  expect(within(sections[1]).getAllByRole("link")).toHaveLength(3);

  expect(within(sections[2]).getByText(Regular!.args!.title!)).toBeVisible();
  expect(within(sections[2]).getAllByRole("link")).toHaveLength(
    (Regular.args as BoardsSectionProps).boards!.length
  );

  expect(within(sections[3]).getByText(Loading!.args!.title!)).toBeVisible();
  expect(
    within(sections[3]).getAllByLabelText("board is loading")
  ).toHaveLength((Loading.args as LoadingSectionProps).placeholdersCount);

  expect(within(sections[4]).getByText(Empty!.args!.title!)).toBeVisible();
  expect(within(sections[4]).queryAllByRole("link")).toHaveLength(0);
  expect(
    within(sections[4]).getByText((Empty.args as EmptySectionProps).emptyTitle)
  ).toBeVisible();
  expect(
    within(sections[4]).getByText(
      (Empty.args as EmptySectionProps).emptyDescription
    )
  ).toBeVisible();
});

test("Renders boards dropdown", async () => {
  render(<SideMenuPreview />);

  userEvent.click(screen.getByLabelText("board menu options"));
  await waitFor(() => {
    expect(screen.getByText("Dismiss notifications")).toBeVisible();
  });
  userEvent.click(screen.getByText("Dismiss notifications"));
  await waitFor(() => {
    expect(action("dismissNotifications")).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(screen.queryByText("Dismiss notifications")).not.toBeInTheDocument();
  });
});

test("Renders board filter", async () => {
  render(<SideMenuPreview />);

  expect(screen.getByRole("searchbox")).toHaveAccessibleName("board filter");
  expect(screen.getByRole("searchbox")).toEqual(
    screen.getByPlaceholderText("Filter boards")
  );
});

test("Correctly propagates filter change on text entry", async () => {
  render(<SideMenuPreview />);

  const boardFilter = screen.getByRole("searchbox");
  userEvent.type(boardFilter, "meta");
  await waitFor(() => {
    expect(action("filterBoards")).toBeCalledWith("meta");
  });
  expect(boardFilter).toHaveValue("meta");

  userEvent.type(boardFilter, "{backspace}{backspace}");
  await waitFor(() => {
    expect(action("filterBoards")).toBeCalledWith("me");
  });
  expect(boardFilter).toHaveValue("me");
});

test("Board filter returns empty string on deletion of contents", async () => {
  render(<SideMenuPreview />);

  const boardFilter = screen.getByRole("searchbox");
  userEvent.type(boardFilter, "meta");
  await waitFor(() => {
    expect(action("filterBoards")).toBeCalledWith("meta");
  });
  expect(boardFilter).toHaveValue("meta");

  userEvent.type(boardFilter, "{backspace}{backspace}{backspace}{backspace}");
  await waitFor(() => {
    expect(action("filterBoards")).toBeCalledWith("");
  });
  expect(boardFilter).toHaveValue("");

  userEvent.type(boardFilter, "meta");
  await waitFor(() => {
    expect(action("filterBoards")).toBeCalledWith("meta");
  });
  expect(boardFilter).toHaveValue("meta");

  userEvent.type(boardFilter, "{selectall}{del}");
  await waitFor(() => {
    expect(action("filterBoards")).toBeCalledWith("");
  });
  expect(boardFilter).toHaveValue("");
});
