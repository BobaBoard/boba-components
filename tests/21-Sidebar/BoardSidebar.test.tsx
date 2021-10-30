import "@testing-library/jest-dom/extend-expect";

import * as stories from "../../stories/21-Sidebar/00-BoardSidebar.stories";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "ts-jest/utils";

jest.mock("@storybook/addon-actions");

const { RegularBoardSidebar } = composeStories(stories);

test("Renders board options", async () => {
  render(<RegularBoardSidebar />);
  const actionReturn = jest.fn();
  mocked(action).mockReturnValue(actionReturn);
  fireEvent.click(screen.getByLabelText("Board options"));
  await waitFor(() => {
    expect(screen.getByText("opt2")).toBeVisible();
  });
  fireEvent.click(screen.getByText("opt2"));
  await waitFor(() => {
    expect(action).toBeCalledWith("boardOption2");
  });
});
