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
