import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/20-SideMenu/20-SideMenu.stories";

import {
  BasePinnedSectionProps,
  WithPinnedSectionProps,
} from "sidemenu/PinnedMenu";
import { Boards, Icons } from "stories/20-SideMenu/01-PinnedMenu.stories";
import {
  BoardsSectionProps,
  EmptySectionProps,
  LoadingSectionProps,
} from "sidemenu/BoardsMenuSection";
import {
  Empty,
  Loading,
  Regular,
} from "stories/20-SideMenu/00-BoardsMenuSection.stories";
import { render, screen, waitFor, within } from "@testing-library/react";

import { CircleButtonProps } from "buttons/CircleButton";
import { DropdownProps } from "common/DropdownListMenu";
import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "jest-mock";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

const { SideMenuPreview } = composeStories(stories);

test("Renders pinned menu", async () => {
  render(<SideMenuPreview />);

  const sections = document.getElementsByTagName("section");
  expect(sections).toHaveLength(7);

  const argsItems = (Icons.args as WithPinnedSectionProps)
    .items as (CircleButtonProps & {
    id: string;
    menuOptions?: DropdownProps["options"];
  })[];
  const linkArgs = argsItems.filter((item) => !item.menuOptions);
  const buttonArgs = argsItems.filter((item) => item.menuOptions);

  expect(
    within(sections[0]).getByLabelText(
      (Icons!.args! as BasePinnedSectionProps).sectionId!
    )
  ).toBeVisible();
  expect(within(sections[0]).getAllByRole("link")).toHaveLength(
    linkArgs.length
  );
  expect(within(sections[0]).getAllByRole("button")).toHaveLength(
    buttonArgs.length
  );

  expect(
    within(sections[1]).getByLabelText(
      (Boards!.args! as BasePinnedSectionProps).sectionId!
    )
  ).toBeVisible();
  expect(within(sections[1]).getAllByRole("link")).toHaveLength(
    (Boards.args as WithPinnedSectionProps).items.length
  );
});

test("Pinned Menu doesn't render when turned off", async () => {
  render(<SideMenuPreview showPinned={false} />);

  expect(
    screen.getByLabelText((Icons!.args! as BasePinnedSectionProps).sectionId!)
  ).not.toBeVisible();
  expect(
    screen.getByLabelText((Boards!.args! as BasePinnedSectionProps).sectionId!)
  ).not.toBeVisible();
});

test("Renders boards menu", async () => {
  render(<SideMenuPreview />);

  const sections = document.getElementsByTagName("section");
  expect(sections).toHaveLength(7);

  expect(within(sections[2]).getByText("Recent boards")).toBeVisible();
  expect(within(sections[2]).getAllByRole("link")).toHaveLength(4);

  expect(within(sections[3]).getByText("Fandom boards")).toBeVisible();
  expect(within(sections[3]).getAllByRole("link")).toHaveLength(3);

  expect(within(sections[4]).getByText(Regular!.args!.title!)).toBeVisible();
  expect(within(sections[4]).getAllByRole("link")).toHaveLength(
    (Regular.args as BoardsSectionProps).boards!.length
  );

  expect(within(sections[5]).getByText(Loading!.args!.title!)).toBeVisible();
  expect(
    within(sections[5]).getAllByLabelText("board is loading")
  ).toHaveLength((Loading.args as LoadingSectionProps).placeholdersCount);

  expect(within(sections[6]).getByText(Empty!.args!.title!)).toBeVisible();
  expect(within(sections[6]).queryAllByRole("link")).toHaveLength(0);
  expect(
    within(sections[6]).getByText((Empty.args as EmptySectionProps).emptyTitle)
  ).toBeVisible();
  expect(
    within(sections[6]).getByText(
      (Empty.args as EmptySectionProps).emptyDescription
    )
  ).toBeVisible();
});

test("Renders boards dropdown", async () => {
  render(<SideMenuPreview />);

  const actionReturn = jest.fn();
  mocked(action).mockReturnValue(actionReturn);

  userEvent.click(screen.getByLabelText("board menu options"));
  await waitFor(() => {
    expect(screen.getByText("Dismiss notifications")).toBeVisible();
  });
  userEvent.click(screen.getByText("Dismiss notifications"));
  await waitFor(() => {
    expect(action).toBeCalledWith("dismissNotifications");
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

  const actionReturn = jest.fn();
  mocked(action).mockReturnValue(actionReturn);

  const boardFilter = screen.getByRole("searchbox");
  userEvent.type(boardFilter, "meta");
  await waitFor(() => {
    expect(action).toBeCalledWith("filterBoards");
    expect(actionReturn).toBeCalledWith("meta");
  });
  expect(boardFilter).toHaveValue("meta");

  userEvent.type(boardFilter, "{backspace}{backspace}");
  await waitFor(() => {
    expect(action).toBeCalledWith("filterBoards");
    expect(actionReturn).toBeCalledWith("me");
  });
  expect(boardFilter).toHaveValue("me");
});

test("Board filter returns empty string on deletion of contents", async () => {
  render(<SideMenuPreview />);

  const actionReturn = jest.fn();
  mocked(action).mockReturnValue(actionReturn);

  const boardFilter = screen.getByRole("searchbox");
  userEvent.type(boardFilter, "meta");
  await waitFor(() => {
    expect(action).toBeCalledWith("filterBoards");
    expect(actionReturn).toBeCalledWith("meta");
  });
  expect(boardFilter).toHaveValue("meta");

  userEvent.type(boardFilter, "{backspace}{backspace}{backspace}{backspace}");
  await waitFor(() => {
    expect(action).toBeCalledWith("filterBoards");
    expect(actionReturn).toBeCalledWith("");
  });
  expect(boardFilter).toHaveValue("");

  userEvent.type(boardFilter, "meta");
  await waitFor(() => {
    expect(action).toBeCalledWith("filterBoards");
    expect(actionReturn).toBeCalledWith("meta");
  });
  expect(boardFilter).toHaveValue("meta");

  userEvent.type(boardFilter, "{selectall}{del}");
  await waitFor(() => {
    expect(action).toBeCalledWith("filterBoards");
    expect(actionReturn).toBeCalledWith("");
  });
  expect(boardFilter).toHaveValue("");
});
