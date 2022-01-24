import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/20-SideMenu/20-SideMenu.stories";

import {
  Screen,
  fireEvent,
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

const { SideMenuPreview } = composeStories(stories);

test("Renders pinned menu", async () => {
  render(<SideMenuPreview />);

  //TODO: fill this
});

test("Pinned Menu doesn't render when turned off", async () => {
  render(<SideMenuPreview />);

  //TODO: fill this
});

test("Renders boards menu", async () => {
  render(<SideMenuPreview />);

  //TODO: fill this
});

//Currently not rendered in Storybook. Need to add menuOptions arg in SideMenu story before testing
test("Renders boards dropdown", async () => {
  render(<SideMenuPreview />);

  //TODO: fill this
});

test("Renders board filter", async () => {
  render(<SideMenuPreview />);

  //TODO: fill this
});

test("Correctly propagates filter change on text entry", async () => {
  render(<SideMenuPreview />);

  //TODO: fill this
});

