import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/20-SideMenu/00-BoardsMenuSection.stories";

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

const { Regular, Empty, Loading, Long } = composeStories(stories);


test("Correctly marks boards with updates", async () => {
  render(<Regular />);

  //TODO: fill this
});

test("Correctly marks outdated boards with updates", async () => {
  render(<Regular />);

  //TODO: fill this
});

test("Long board slug text doesn't overflow", async () => {
  render(<Long />);

  //TODO: fill this
});

test("Correctly marks current board", async () => {
  render(<Long />);

  //TODO: fill this
});

test("Correctly marks muted board", async () => {
  render(<Long />);

  //TODO: fill this
});
