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
import {
  render,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { v4 } from "uuid";

jest.mock("@storybook/addon-actions");
jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

const { Boards, Loading, Icons, MultipleSections } = composeStories(stories);

describe("Boards", () => {
  test("Renders section with boards", async () => {
    render(<Boards />);
  
    //TODO: fill this
  });
  
  test("Correctly marks current board", async () => {
    render(<Boards />);
  
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
  
  test("Pinning board adds it to Pinned menu", async () => {
    render(<Boards />);
  
    //TODO: fill this
  });
  
  test("Uninning board removes it from Pinned menu", async () => {
    render(<Boards />);
  
    //TODO: fill this
  });
});

describe("Loading", () => {
  test("Renders loading section", async () => {
    render(<Loading />);
  
    //TODO: fill this
  });
});

describe("Icons", () => {
  test("Renders section with icons", async () => {
    render(<Icons />);
  
    //TODO: fill this
  });
  
  test("Correctly marks current icon", async () => {
    render(<Icons />);
  
    //TODO: fill this
  });

  //Is this implemented? In Storybook icon has chevron, but doesn't actually open menu
  test("Renders icon options dropdown", async () => {
    render(<Icons />);
  
    //TODO: fill this
  });
});

describe("Multiple Sections", () => {
  test("Renders sections in order", async () => {
    render(<MultipleSections />);
  
    //TODO: fill this
  });

  test("Doesn't render empty section", async () => {
    render(<MultipleSections />);
  
    //TODO: fill this
  });
});





