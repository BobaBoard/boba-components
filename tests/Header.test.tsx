import "@testing-library/jest-dom/extend-expect";

import * as stories from "../stories/05-Posts/02-PostHeader.stories";

import {
  getByLabelText,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";

import React from "react";
import { composeStories } from "@storybook/testing-react";

const { RegularHeader, WithUserIdentity } = composeStories(stories);

const getContainer = () => screen.getByTestId("large-container");

test("Renders header with avatar and secret identity", () => {
  render(<RegularHeader />);
  const secretIdentityElement = getByText(
    getContainer(),
    RegularHeader.args!.secretIdentity!.name
  );
  const secretIdentityAvatar = getByLabelText(
    getContainer(),
    "The avatar of the secret identity"
  );

  expect(secretIdentityElement).not.toBeNull();
  expect(secretIdentityAvatar).toHaveStyle(
    `background-image: url(${RegularHeader.args!.secretIdentity!.avatar})`
  );
});

test("Renders header with user identity", () => {
  render(<WithUserIdentity />);
  const secretIdentityElement = getByText(
    getContainer(),
    WithUserIdentity.args!.secretIdentity!.name
  );
  const secretIdentityAvatar = getByLabelText(
    getContainer(),
    "The avatar of the secret identity"
  );
  const userIdentityElement = getByText(
    getContainer(),
    "@" + WithUserIdentity.args!.userIdentity!.name
  );
  const userIdentityAvatar = getByLabelText(
    getContainer(),
    "The avatar of the user identity"
  );

  expect(secretIdentityElement).not.toBeNull();
  expect(secretIdentityAvatar).toHaveStyle(
    `background-image: url(${WithUserIdentity.args!.secretIdentity!.avatar})`
  );
  expect(userIdentityElement).not.toBeNull();
  expect(userIdentityAvatar).toHaveStyle(
    `background-image: url(${WithUserIdentity.args!.userIdentity!.avatar})`
  );
});
