import "@testing-library/jest-dom/extend-expect";

import * as stories from "../stories/06-Editors/02-CommentEditor.stories";

import {
  fireEvent,
  getByLabelText,
  queryByLabelText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import React from "react";
import { composeStories } from "@storybook/testing-react";

jest.mock("@storybook/addon-actions");

const {
  Base,
  WithDefaultSecretIdentity,
  WithIdentitySelector,
  WithAccessorySelector,
} = composeStories(stories);

const getContainer = () => screen.getByTestId("large-container");

test("Renders user identity", () => {
  render(<Base />);
  const userIdentityAvatar = getByLabelText(
    getContainer(),
    "The avatar of the user identity"
  );
  expect(userIdentityAvatar).toHaveStyle(
    `background-image: url(${Base.args!.userIdentity!.avatar})`
  );
});

test("Renders default secret identity", () => {
  render(<WithDefaultSecretIdentity />);
  const secretIdentityAvatar = getByLabelText(
    getContainer(),
    "The avatar of the secret identity"
  );
  expect(secretIdentityAvatar).toHaveStyle(
    `background-image: url(${
      WithDefaultSecretIdentity.args!.secretIdentity!.avatar
    })`
  );
});

test("Renders alternative identities and allows their selection", async () => {
  render(<WithIdentitySelector />);
  const identitySelector = getByLabelText(
    getContainer(),
    "Select visible identity"
  );
  fireEvent.click(identitySelector);

  await waitFor(() => {
    // Note: the dropdown is not rendered within the element itself. We can simply
    // query the whole screen because we're guaranteed to only have one.
    expect(screen.getByText("Random Identity")).toBeInTheDocument();
    expect(
      screen.getByText(WithIdentitySelector.args!.additionalIdentities![0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(WithIdentitySelector.args!.additionalIdentities![1].name)
    ).toBeInTheDocument();
  });

  fireEvent.click(
    screen.getByText(WithIdentitySelector.args!.additionalIdentities![1].name)
  );

  await waitFor(() => {
    const secretIdentityAvatar = getByLabelText(
      getContainer(),
      "The avatar of the secret identity"
    );
    expect(secretIdentityAvatar).toHaveStyle(
      `background-image: url(${
        WithIdentitySelector.args!.additionalIdentities![1].avatar
      })`
    );
    expect(
      getByLabelText(getContainer(), "The secret identity accessory")
    ).toHaveAttribute(
      "src",
      WithIdentitySelector.args!.additionalIdentities![1].accessory
    );
  });
});

test("Doesn't render accessory selector when no accessory is given", async () => {
  render(<Base />);
  expect(
    queryByLabelText(getContainer(), "Select accessory")
  ).not.toBeInTheDocument();
});

test("Renders accessory selector and allows selecting an accessory", async () => {
  render(<WithAccessorySelector />);

  const accessorySelector = getByLabelText(getContainer(), "Select accessory");
  fireEvent.click(accessorySelector);

  await waitFor(() => {
    // Note: the dropdown is not rendered within the element itself. We can simply
    // query the whole screen because we're guaranteed to only have one.
    expect(screen.getByText("None")).toBeInTheDocument();
    expect(
      screen.getByText(WithAccessorySelector.args!.accessories![0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(WithAccessorySelector.args!.accessories![1].name)
    ).toBeInTheDocument();
  });

  fireEvent.click(
    screen.getByText(WithAccessorySelector.args!.accessories![0].name)
  );

  await waitFor(() => {
    expect(
      getByLabelText(getContainer(), "The secret identity accessory")
    ).toHaveAttribute(
      "src",
      WithAccessorySelector.args!.accessories![0].accessory
    );
  });
});
