import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/20-SideMenu/00-BoardsMenuSection.stories";

import {
  Screen,
  fireEvent,
  getByText,
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

const { Regular, Empty, Loading, } = composeStories(stories);

describe("Regular", () => {
  test("Renders section with board menu items", async () => {
    render(<Regular />);
  
    //TODO: fill this
  });
  
  //Not sure if this should be it's own test or part of the previous test
  test("Board menu items link to boards", async () => {
    render(<Regular />);
  
    //TODO: fill this
  });
  
  test("Correctly renders board without updates", async () => {
    render(<Regular />);

    //Not sure .toBe is the right thing to expect here, but can't try it to figure it out because Testing Library can't find my aria labels
    expect(screen.getByText("!oncie-den")).toBe(screen.getByRole("link", { name: "oncie-den"}));
  });
  
  test("Correctly marks boards with updates", async () => {
    render(<Regular />);
  
    expect(screen.getByLabelText("gore has new updates", {exact:false}));
  });
  
  test("Correctly marks outdated boards with updates", async () => {
    render(<Regular />);
  
    //TODO: fill this
  });
  
  test("Correctly marks current board", async () => {
    render(<Regular />);
  
    //TODO: fill this
  });

  test("Correctly marks muted board", async () => {
    render(<Regular />);
  
    //TODO: fill this
  });
});

describe("Empty", () => {
  test("Renders empty section", async () => {
    render(<Empty />);
    
    // This gives error "Property 'emptyDescription' does not exist on type 'Partial<Partial<BoardsMenuSectionProps>>'." and I don't understand why???
    // expect(screen.getByText(Empty.args!.emptyDescription))
  });
});

describe("Loading", () => {
  test("Renders loading section", async () => {
    render(<Loading />);
  
    //TODO: fill this
  });
});





