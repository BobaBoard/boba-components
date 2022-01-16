import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/20-SideMenu/01-PinnedMenu.stories";

import {
  Screen,
  fireEvent,
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

const { Boards, Loading, Icons, Mixed, MultipleSections } = composeStories(stories);

test("Renders ", async () => {
  render(<MultipleSections />);

  //TODO: fill this
});

test("Correctly marks current board", async () => {
  render(<Boards />);

  //TODO: fill this
});

test("Correctly marks current icon", async () => {
  render(<Icons />);

  //TODO: fill this
});

test("Correctly marks boards with updates", async () => {
  render(<Boards />);

  //TODO: fill this
});

test("Correctly marks outdated boards with updates", async () => {
  render(<Boards />);

  //TODO: fill this
});

test("Correctly marks muted board", async () => {
  render(<Boards />);

  //TODO: fill this
});
