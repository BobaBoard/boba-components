import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/06-Comments/02-ChainComment.stories";

import { render, screen, waitFor } from "@testing-library/react";

import { DeltaMatcher } from "../utils/matchers";
import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "jest-mock";

jest.mock("@storybook/addon-actions");

const {
  CompactChainComment,
  CompactChainCommentWithAction,
  CompactChainCommentWithAccessories,
  CompactChainCommentWithBadges,
  CompactChainCommentWithHiddenIdentity,
  CompactChainCommentWithOptions,
  CompactChainCommentWithHighlight,
} = composeStories(stories);

describe("Chain Comment", () => {
  test("Renders comments, identities and time", async () => {
    render(<CompactChainComment />);

    expect(
      screen.getByLabelText("The avatar of the secret identity")
    ).toHaveStyle(
      `background-image: url(${
        CompactChainComment.args!.secretIdentity!.avatar
      })`
    );

    expect(
      screen.getByLabelText("The avatar of the user identity")
    ).toHaveStyle(
      `background-image: url(${CompactChainComment.args!.userIdentity!.avatar})`
    );

    CompactChainComment.args!.comments?.forEach((comment) => {
      expect(screen.getByText(DeltaMatcher(comment.text))).toBeVisible();
    });

    screen.getByLabelText("The avatar of the secret identity").click();

    await waitFor(() =>
      expect(
        screen.getByText(CompactChainComment.args!.createdTime!)
      ).toBeVisible()
    );
  });
  test("Renders extra action", async () => {
    const actionReturn = jest.fn();
    mocked(action).mockReturnValue(actionReturn);
    render(<CompactChainCommentWithAction />);

    screen
      .getByLabelText(CompactChainCommentWithAction.args!.onExtraAction!.label!)
      .click();

    expect(actionReturn).toBeCalledTimes(1);
  });

  test("Renders accessories", async () => {
    render(<CompactChainCommentWithAccessories />);

    // TODO: write test
  });

  test("Renders badges", async () => {
    render(<CompactChainCommentWithBadges />);

    // TODO: write test
  });

  test("Forces identity hidden", async () => {
    render(<CompactChainCommentWithHiddenIdentity />);

    expect(
      screen.getByLabelText("The avatar of the user identity")
    ).not.toBeVisible();
  });

  test("Renders options", async () => {
    render(<CompactChainCommentWithOptions />);

    // TODO: write test
  });

  test("Renders highlight", async () => {
    render(<CompactChainCommentWithHighlight />);

    // TODO: write test
  });
});
