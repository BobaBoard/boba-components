import "@testing-library/jest-dom/extend-expect";

import * as bottomBarStories from "stories/Experimental/Layout/101-BottomBar.stories";

import { render, screen, within } from "@testing-library/react";

import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { userEvent } from "@storybook/testing-library";

jest.mock("@storybook/addon-actions");

const { Regular, NoCenterButton, NoLeftButton, EmptyContextMenu } =
  composeStories(bottomBarStories);

describe("when the center button is displayed", () => {
  beforeEach(() => {
    render(<Regular />);

    expect(Regular.args!.centerButton).not.toBeNil();
  });

  it("displays the contribute button", () => {
    const centerButton = screen.getByLabelText("center-button");
    expect(centerButton).toBeInTheDocument();
    expect(centerButton).toHaveClass(
      `fa-${Regular.args!.centerButton!.icon["iconName"]}`
    );
    expect(centerButton).toHaveAttribute(
      "color",
      Regular.args!.centerButton!.color
    );
  });

  it("emits the center button action when clicked", () => {
    userEvent.click(screen.getByLabelText("center-button"));
    expect(action).toHaveBeenCalledWith("center-button");
  });
});

describe("when context menu is present", () => {
  beforeEach(() => {
    render(<Regular />);

    expect(Regular.args!.contextMenu?.icons).not.toBeArrayOfSize(0);
  });

  it("displays the faEyeSlash icon", () => {
    const unhideButton = screen.getByLabelText("unhide-button");
    expect(unhideButton).toHaveClass(
      `fa-${Regular.args!.contextMenu?.icons[0].icon["iconName"]}`
    );
  });

  it("displays the faVolumeMute icon", () => {
    const unmuteButton = screen.getByLabelText("unmute-button");
    expect(unmuteButton).toHaveClass(
      `fa-${Regular.args!.contextMenu?.icons[1].icon["iconName"]}`
    );
  });

  it("displays the faStar icon", () => {
    const starButton = screen.getByLabelText("star-button");
    expect(starButton).toHaveClass(
      `fa-${Regular.args!.contextMenu?.icons[2].icon["iconName"]}`
    );
  });

  it("displays the faThumbTack icon", () => {
    const unpinButton = screen.getByLabelText("unpin-button");
    expect(unpinButton).toHaveClass(
      `fa-${Regular.args!.contextMenu?.icons[3].icon["iconName"]}`
    );
  });

  describe("when context menu is clicked", () => {
    beforeEach(() => {
      userEvent.click(screen.getByLabelText("context menu"));
    });
    it("displays the infobox", () => {
      expect(screen.getByText("Last updated: 20 days ago")).toBeInTheDocument();
    });
    describe("when unhide button is clicked", () => {
      beforeEach(() => {
        userEvent.click(screen.getByText("Unhide"));
      });
      it("calls the unhide action", () => {
        expect(action).toHaveBeenCalledWith("unhide");
      });
    });
  });
});
