import "@testing-library/jest-dom/extend-expect";

import * as stories from "../stories/05-Posts/02-PostHeader.stories";

import { getByTestId, getByText, render, screen } from "@testing-library/react";

import React from "react";
import { composeStories } from "@storybook/testing-react";

const { RegularHeader } = composeStories(stories);

const getContainer = () => screen.getByTestId("large-container");

test("Renders header with avatar and secret identity", () => {
  render(<RegularHeader />);
  const secretIdentityElement = getByText(
    getContainer(),
    RegularHeader.args!.secretIdentity!.name
  );
  const avatarElement = getByTestId(getContainer(), "secret-identity-avatar");

  expect(secretIdentityElement).not.toBeNull();
  expect(avatarElement).toHaveStyle(
    `background-image: url(${RegularHeader.args!.secretIdentity!.avatar})`
  );
});
