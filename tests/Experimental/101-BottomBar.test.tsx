import "@testing-library/jest-dom/extend-expect";

import * as bottomBarStories from "stories/Experimental/Layout/101-BottomBar.stories";

import { render, screen } from "@testing-library/react";

import { IconProps } from "common/Icon";
import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { userEvent } from "@storybook/testing-library";

jest.mock("@storybook/addon-actions");

const { Regular } = composeStories(bottomBarStories);

const getIconName = (icon: IconProps["icon"]) => {
  if (typeof icon === "string") {
    throw new Error("Expected icon to be a FontAwesomeIcon");
  }
  return "iconName" in icon ? icon.iconName : null;
};

describe("when the center button is displayed", () => {
  beforeEach(() => {
    render(<Regular />);

    expect(Regular.args!.centerButton).not.toBeNil();
  });

  it("displays the contribute button", () => {
    const centerButton = screen.getByLabelText("center-button");
    expect(centerButton).toBeInTheDocument();
    expect(centerButton).toHaveClass(
      `fa-${getIconName(Regular.args!.centerButton!.icon)}`
    );
    expect(centerButton).toHaveAttribute(
      "color",
      Regular.args!.centerButton!.color
    );
  });

  it("emits the center button action when clicked", async () => {
    await userEvent.click(screen.getByLabelText("center-button"));
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
      `fa-${getIconName(Regular.args!.contextMenu!.icons[0].icon)}`
    );
  });

  it("displays the faVolumeMute icon", () => {
    const unmuteButton = screen.getByLabelText("unmute-button");
    expect(unmuteButton).toHaveClass(
      `fa-${getIconName(Regular.args!.contextMenu!.icons[1].icon)}`
    );
  });

  it("displays the faStar icon", () => {
    const starButton = screen.getByLabelText("star-button");
    expect(starButton).toHaveClass(
      `fa-${getIconName(Regular.args!.contextMenu!.icons[2].icon)}`
    );
  });

  it("displays the faThumbTack icon", () => {
    const unpinButton = screen.getByLabelText("unpin-button");
    expect(unpinButton).toHaveClass(
      `fa-${getIconName(Regular.args!.contextMenu!.icons[3].icon)}`
    );
  });

  describe("when context menu is clicked", () => {
    beforeEach(async () => {
      await userEvent.click(screen.getByLabelText("context menu"));
    });
    it("displays the infobox", () => {
      expect(screen.getByText("Last updated: 20 days ago")).toBeInTheDocument();
    });

    describe("when unhide button is clicked", () => {
      beforeEach(async () => {
        await userEvent.click(screen.getByText("Unhide"));
      });
      it("calls the unhide action", () => {
        expect(action).toHaveBeenCalledWith("unhide");
      });
    });
  });
});
