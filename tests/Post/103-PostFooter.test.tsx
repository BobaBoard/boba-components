import "@testing-library/jest-dom/extend-expect";

import * as postFooterStories from "stories/Post/103-PostFooter.stories";

import { render, screen, within } from "@testing-library/react";

import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { userEvent } from "@storybook/testing-library";

jest.mock("@storybook/addon-actions");

const {
  Answerable,
  WithNotes,
  WithUpdates,
  CommentOnly,
  ContributeOnly,
  NotesWithHref,
} = composeStories(postFooterStories);

describe("when an answerable footer is displayed", () => {
  let largeContainer: HTMLElement;
  beforeEach(() => {
    render(<Answerable />);
    largeContainer = screen.getByTestId("large-container");

    expect(Answerable.args!.allowsContribution).toBeTrue();
    expect(Answerable.args!.allowsComment).toBeTrue();
  });

  it("displays the contribute button", () => {
    expect(within(largeContainer).getByText("Contribute")).toBeInTheDocument();
  });
  it("emits callback when the contribute button is clicked", () => {
    userEvent.click(within(largeContainer).getByText("Contribute"));
    expect(action).toHaveBeenCalledWith("onContribution");
  });
  it("displays the comment button", () => {
    expect(within(largeContainer).getByText("Comment")).toBeInTheDocument();
  });
  it("emits callback when the comment button is clicked", () => {
    userEvent.click(within(largeContainer).getByText("Comment"));
    expect(action).toHaveBeenCalledWith("onComment");
  });
});

describe("when a footer allows contributions only", () => {
  let largeContainer: HTMLElement;
  beforeEach(() => {
    render(<ContributeOnly />);
    largeContainer = screen.getByTestId("large-container");

    expect(ContributeOnly.args!.allowsContribution).toBeTrue();
    expect(ContributeOnly.args!.allowsComment).toBeFalse();
  });
  it("the contribute button is active", () => {
    expect(
      within(largeContainer).getByLabelText("contribute")
    ).not.toBeDisabled();
  });
  it("the comment button is disabled", () => {
    expect(within(largeContainer).getByLabelText("comment")).toBeDisabled();
  });
});

describe("when a footer allows comments only", () => {
  let largeContainer: HTMLElement;
  beforeEach(() => {
    render(<CommentOnly />);
    largeContainer = screen.getByTestId("large-container");

    expect(CommentOnly.args!.allowsContribution).toBeFalse();
    expect(CommentOnly.args!.allowsComment).toBeTrue();
  });
  it("the contribute button is disabled", () => {
    expect(within(largeContainer).getByLabelText("contribute")).toBeDisabled();
  });
  it("the comment button is active", () => {
    expect(within(largeContainer).getByLabelText("comment")).not.toBeDisabled();
  });
});

describe("when a footer has reply counts", () => {
  let largeContainer: HTMLElement;
  beforeEach(() => {
    render(<WithNotes />);
    largeContainer = screen.getByTestId("large-container");

    expect(WithNotes.args!.totalContributions).not.toBeNil();
    expect(WithNotes.args!.totalComments).not.toBeNil();
    expect(WithNotes.args!.directContributions).not.toBeNil();
  });
  it("displays the amount of contributions", () => {
    const contributionsLabel = within(largeContainer).getByLabelText(
      `${WithNotes.args!.totalContributions} total contributions`
    );

    expect(contributionsLabel).toBeInTheDocument();
    expect(
      within(contributionsLabel).getByText(WithNotes.args!.totalContributions!)
    ).toBeInTheDocument();
  });
  it("displays the amount of comments", () => {
    const commentsLabel = within(largeContainer).getByLabelText(
      `${WithNotes.args!.totalComments} total comments`
    );

    expect(commentsLabel).toBeInTheDocument();
    expect(
      within(commentsLabel).getByText(WithNotes.args!.totalComments!)
    ).toBeInTheDocument();
  });
  it("displays the amount of direct threads", () => {
    const threadsLabel = within(largeContainer).getByLabelText(
      `${WithNotes.args!.directContributions} direct threads`
    );

    expect(threadsLabel).toBeInTheDocument();
    expect(
      within(threadsLabel).getByText(WithNotes.args!.directContributions!)
    ).toBeInTheDocument();
  });
});

describe("when a footer has no updates", () => {
  let largeContainer: HTMLElement;
  beforeEach(() => {
    render(<WithNotes />);
    largeContainer = screen.getByTestId("large-container");

    expect(WithNotes.args!.newComments).toBeNil();
    expect(WithNotes.args!.newContributions).toBeNil();
  });

  it("does not display new indicators", () => {
    expect(
      within(largeContainer).queryByLabelText(`post updates indicator`)
    ).toBeNull();
  });
});

describe("when a footer has updates", () => {
  let largeContainer: HTMLElement;
  beforeEach(() => {
    render(<WithUpdates />);
    largeContainer = screen.getByTestId("large-container");

    expect(WithUpdates.args!.newContributions).not.toBeNil();
    expect(WithUpdates.args!.newComments).not.toBeNil();
  });
  it("displays the amount of new contributions", () => {
    const contributionsLabel = within(largeContainer).getByLabelText(
      `${WithUpdates.args!.newContributions} new contributions`
    );

    expect(contributionsLabel).toBeInTheDocument();
    expect(
      within(contributionsLabel).getByText(
        `+${WithUpdates.args!.newContributions!}`
      )
    ).toBeInTheDocument();
  });
  it("displays the amount of new comments", () => {
    const commentsLabel = within(largeContainer).getByLabelText(
      `${WithUpdates.args!.newComments} new comments`
    );

    expect(commentsLabel).toBeInTheDocument();
    expect(
      within(commentsLabel).getByText(`+${WithUpdates.args!.newComments!}`)
    ).toBeInTheDocument();
  });
});

describe("when notes have a href link", () => {
  let largeContainer: HTMLElement;
  beforeEach(() => {
    render(<NotesWithHref />);
    largeContainer = screen.getByTestId("large-container");

    expect(NotesWithHref.args!.notesLink!.onClick).not.toBeNil();
    expect(NotesWithHref.args!.notesLink!.href).not.toBeNil();
  });
  it("triggers the onClick handler when clicked", () => {
    userEvent.click(within(largeContainer).getByLabelText("post notes"));
    expect(action).toHaveBeenCalledWith("withHref");
  });
  it("has the correct href", () => {
    expect(within(largeContainer).getByLabelText("post notes")).toHaveAttribute(
      "href",
      NotesWithHref.args!.notesLink!.href
    );
  });
});
