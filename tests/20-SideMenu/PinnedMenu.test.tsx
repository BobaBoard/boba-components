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

import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "ts-jest/utils";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

const { Boards, Loading, Icons, MultipleSections } = composeStories(stories);

describe("Boards", () => {
  test("Renders section with boards", async () => {
    render(<Boards />);
  
    //TODO: fill this
  });

  test("Board menu items link to boards", async () => {
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

  //TODO: Need to implement DropdownListMenu in PinnedMenu.tsx before testing this
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





