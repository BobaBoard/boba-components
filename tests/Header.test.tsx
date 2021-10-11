import "@testing-library/jest-dom/extend-expect";

import * as stories from "../stories/05-Posts/02-PostHeader.stories";

import {
  RenderResult,
  fireEvent,
  getByLabelText,
  getByText,
  queryByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";

jest.mock("@storybook/addon-actions");

const {
  RegularHeader,
  WithUserIdentity,
  WithForceHideUserIdentity,
  WithColorAndAccessory,
} = composeStories(stories);

const getContainer = () => screen.getByTestId("large-container");

const verifySecretIdentity = (render: RenderResult, story: Story) => {
  const secretIdentityElement = getByText(
    getContainer(),
    story.args!.secretIdentity!.name
  );
  const secretIdentityAvatar = getByLabelText(
    getContainer(),
    "The avatar of the secret identity"
  );

  expect(secretIdentityElement).not.toBeNull();
  expect(secretIdentityAvatar).toHaveStyle(
    `background-image: url(${story.args!.secretIdentity!.avatar})`
  );

  return { secretIdentityElement, secretIdentityAvatar };
};

const verifyUserIdentity = (render: RenderResult, story: Story) => {
  const userIdentityElement = getByText(
    getContainer(),
    "@" + story.args!.userIdentity!.name
  );
  const userIdentityAvatar = getByLabelText(
    getContainer(),
    "The avatar of the user identity"
  );
  expect(userIdentityElement).not.toBeNull();
  expect(userIdentityAvatar).toHaveStyle(
    `background-image: url(${story.args!.userIdentity!.avatar})`
  );
  return { userIdentityElement, userIdentityAvatar };
};

test("Renders header with avatar and secret identity", () => {
  const result = render(<RegularHeader />);
  verifySecretIdentity(result, RegularHeader);
});

test("Renders header with user identity", () => {
  const result = render(<WithUserIdentity />);
  verifySecretIdentity(result, WithUserIdentity);
  verifyUserIdentity(result, WithUserIdentity);
});

test("Renders header with date", () => {
  render(<WithUserIdentity />);
  const timestamp = getByLabelText(getContainer(), "The timestamp of the post");
  expect(timestamp).toHaveTextContent(WithUserIdentity.args!.createdMessage!);
  expect(timestamp).toHaveAttribute(
    "href",
    WithUserIdentity.args!.createdMessageLink!.href!
  );
  fireEvent.click(timestamp);
  waitFor(() => {
    expect(action).toBeCalledWith("withHref");
  });
});

test("Tests for force hide", () => {
  const result = render(<WithForceHideUserIdentity />);
  verifySecretIdentity(result, WithForceHideUserIdentity);

  const userIdentityElement = queryByText(
    getContainer(),
    "@" + WithForceHideUserIdentity.args!.userIdentity!.name
  );
  const userIdentityAvatar = getByLabelText(
    getContainer(),
    "The avatar of the user identity"
  );
  expect(userIdentityElement).toBeNull();
  expect(userIdentityAvatar).not.toBeVisible();
});

test("Renders color and accessory", () => {
  const result = render(<WithColorAndAccessory />);
  const { secretIdentityElement, secretIdentityAvatar } = verifySecretIdentity(
    result,
    WithColorAndAccessory
  );
  verifyUserIdentity(result, WithUserIdentity);
  const accessory = getByLabelText(
    getContainer(),
    "The secret identity accessory"
  );

  expect(secretIdentityElement).toHaveStyle(
    `color: ${WithColorAndAccessory.args!.secretIdentity!.color}`
  );
  expect(secretIdentityAvatar).toHaveStyle(
    `border-color: ${WithColorAndAccessory.args!.secretIdentity!.color}`
  );
  expect(accessory).toHaveAttribute(
    "src",
    WithColorAndAccessory.args!.secretIdentity!.accessory
  );
});
