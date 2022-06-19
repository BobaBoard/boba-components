import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/10-Editors/02-CommentEditor.stories";

import {
  fireEvent,
  getByLabelText,
  queryByLabelText,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "jest-mock";
import userEvent from "@testing-library/user-event";

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

test("Propagates selected accessory and identity on submit", async () => {
  render(<WithAccessorySelector />);

  fireEvent.click(getByLabelText(getContainer(), "Select accessory"));
  fireEvent.click(
    screen.getByText(WithAccessorySelector.args!.accessories![0].name)
  );

  fireEvent.click(getByLabelText(getContainer(), "Select visible identity"));
  fireEvent.click(
    screen.getByText(WithAccessorySelector.args!.additionalIdentities![1].name)
  );

  const editorContainer = getContainer().querySelector(".ql-editor");
  expect(editorContainer).toBeInTheDocument();
  userEvent.type(editorContainer!, "bar");
  //fireEvent.blur(editorContainer!);

  await waitFor(
    () => {
      expect(
        within(getContainer()).getByLabelText("Submit")
      ).not.toBeDisabled();
    },
    {
      timeout: 5000,
    }
  );

  const actionReturn = jest.fn();
  mocked(action).mockReturnValue(actionReturn);
  fireEvent.click(within(getContainer()).getByLabelText("Submit"));
  await waitFor(() => {
    expect(action).toBeCalledWith("submit");
    expect(actionReturn).toBeCalledWith({
      accessoryId: WithAccessorySelector.args!.accessories![0].id,
      identityId: WithAccessorySelector.args!.additionalIdentities![1].id,
      texts: expect.any(Promise),
    });
  });
  expect(await actionReturn.mock.calls[0][0].texts).toEqual([
    '[{"insert":"bar"}]',
  ]);
});
